(() => {
  "use strict";

  const OWNER_KEY = "groomBookCloudOwner";
  const CUSTOMER_KEY = "groomBookCustomers";
  const APPOINTMENT_KEY = "groomBookAppointments";
  const CAPACITY_KEY = "groomBookCapacity";

  let activeClient = null;
  let activeUserId = "";
  let saveTimer = null;
  let suppressCloudSave = false;
  let saveHookInstalled = false;
  let syncStartedForUser = "";

  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function safeObject(value) {
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  }

  function parseSaved(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
      console.warn("Unable to read saved GroomBook data:", error);
      return fallback;
    }
  }

  function readCurrentState() {
    return {
      customers:
        typeof customers !== "undefined"
          ? safeArray(customers)
          : safeArray(parseSaved(CUSTOMER_KEY, [])),

      appointments:
        typeof appointments !== "undefined"
          ? safeArray(appointments)
          : safeArray(parseSaved(APPOINTMENT_KEY, [])),

      capacitySettings:
        typeof capacitySettings !== "undefined"
          ? safeObject(capacitySettings)
          : safeObject(parseSaved(CAPACITY_KEY, {}))
    };
  }

  function applyState(appData) {
    const nextCustomers = safeArray(appData?.customers);
    const nextAppointments = safeArray(appData?.appointments);
    const nextCapacity = safeObject(appData?.capacitySettings);

    suppressCloudSave = true;

    try {
      if (typeof customers !== "undefined") {
        customers = nextCustomers;
      }

      if (typeof appointments !== "undefined") {
        appointments = nextAppointments;
      }

      if (
        typeof capacitySettings !== "undefined" &&
        Object.keys(nextCapacity).length
      ) {
        capacitySettings = nextCapacity;
      }

      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(nextCustomers));
      localStorage.setItem(APPOINTMENT_KEY, JSON.stringify(nextAppointments));

      if (Object.keys(nextCapacity).length) {
        localStorage.setItem(CAPACITY_KEY, JSON.stringify(nextCapacity));
      }

      if (typeof renderAll === "function") {
        renderAll();
      }
    } finally {
      suppressCloudSave = false;
    }
  }

  async function saveStateNow() {
    if (!activeClient || !activeUserId || suppressCloudSave) {
      return;
    }

    const { error } = await activeClient
      .from("app_state")
      .upsert(
        {
          business_id: activeUserId,
          app_data: readCurrentState()
        },
        { onConflict: "business_id" }
      );

    if (error) {
      throw error;
    }
  }

  function scheduleCloudSave() {
    if (!activeClient || !activeUserId || suppressCloudSave) {
      return;
    }

    clearTimeout(saveTimer);

    saveTimer = setTimeout(() => {
      saveStateNow().catch(error => {
        console.error("GroomBook could not save online:", error);
      });
    }, 700);
  }

  function installSaveHook() {
    if (saveHookInstalled) {
      return;
    }

    const originalSaveAllData = window.saveAllData;

    if (typeof originalSaveAllData !== "function") {
      setTimeout(installSaveHook, 100);
      return;
    }

    window.saveAllData = function (...args) {
      const result = originalSaveAllData.apply(this, args);
      scheduleCloudSave();
      return result;
    };

    saveHookInstalled = true;
  }

  async function startCloudSync(client, user) {
    if (!client || !user?.id) {
      return;
    }

    if (syncStartedForUser === user.id) {
      return;
    }

    syncStartedForUser = user.id;
    activeClient = client;
    activeUserId = user.id;

    installSaveHook();

    const priorOwner = localStorage.getItem(OWNER_KEY);

    const { data, error } = await client
      .from("app_state")
      .select("app_data,updated_at")
      .eq("business_id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data?.app_data) {
      applyState(data.app_data);
      localStorage.setItem(OWNER_KEY, user.id);
      return;
    }

    if (priorOwner && priorOwner !== user.id) {
      applyState({
        customers: [],
        appointments: [],
        capacitySettings: readCurrentState().capacitySettings
      });
    }

    localStorage.setItem(OWNER_KEY, user.id);
    await saveStateNow();
  }

  document.addEventListener("groombook:auth-ready", event => {
    const { client, user } = event.detail || {};

    startCloudSync(client, user).catch(error => {
      console.error("GroomBook online sync did not start:", error);

      if (typeof showNotice === "function") {
        showNotice(
          "Online sync is temporarily unavailable. Your information is still saved on this device."
        );
      }
    });
  });

  installSaveHook();

  setTimeout(async () => {
    const client = window.groomBookSupabase;
    const user = window.groomBookCurrentUser;

    if (client && user) {
      try {
        await startCloudSync(client, user);
      } catch (error) {
        console.error("GroomBook delayed online sync failed:", error);
      }
    }
  }, 500);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      saveStateNow().catch(() => {});
    }
  });

  window.groomBookCloudSync = {
    saveNow: saveStateNow
  };
})();

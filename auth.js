(() => {
  "use strict";

  const SUPABASE_URL = "https://eyvaldlxcyviuuhwykuw.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_oz-OUZHBBXPqhL67ezrHUg_1AtwnXNe";
  const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  const CAPACITY_KEY = "groomBookCapacity";
  const BRAND_NAME = "GroomBook";
  const PARENT_BRAND = "Cretena";
  const BRAND_APP_ICON = "groombook-app-icon.png";
  const BRAND_DARK_LOGO = "groombook-logo-dark.png";

  const authStyles = `
    .gb-auth-screen {
      position: fixed;
      inset: 0;
      z-index: 6500;
      display: none;
      overflow-y: auto;
      padding: 22px 16px max(22px, env(safe-area-inset-bottom));
      background:
        radial-gradient(circle at top right, rgba(255,255,255,.22), transparent 32%),
        linear-gradient(145deg, #4d3cc8, #7c6df1 55%, #a79cf8);
    }

    .gb-auth-screen.open { display: block; }

    .gb-auth-card {
      width: 100%;
      max-width: 520px;
      margin: 18px auto;
      padding: 24px;
      border-radius: 26px;
      background: rgba(255,255,255,.98);
      box-shadow: 0 24px 70px rgba(20, 14, 75, .28);
    }

    .gb-auth-brand { margin-bottom: 22px; text-align: center; }

    .gb-auth-logo {
      display: grid;
      place-items: center;
      width: 78px;
      height: 78px;
      margin: 0 auto 12px;
      overflow: hidden;
      border-radius: 22px;
      background: #071a35;
      box-shadow: 0 10px 24px rgba(3, 21, 48, .22);
    }

    .gb-auth-logo img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .gb-auth-brand h2 { margin: 0; color: #202236; font-size: 27px; }

    .gb-auth-brand p {
      margin: 7px 0 0;
      color: #70758c;
      font-size: 14px;
      line-height: 1.45;
    }

    .gb-auth-form { display: grid; gap: 14px; }

    .gb-auth-form label {
      display: block;
      margin: 0 0 7px;
      color: #202236;
      font-size: 13px;
      font-weight: 750;
    }

    .gb-auth-form input {
      width: 100%;
      min-height: 50px;
      padding: 12px 13px;
      border: 1px solid #dde0eb;
      border-radius: 13px;
      outline: none;
      background: #fff;
      color: #202236;
      font: inherit;
    }

    .gb-auth-form input:focus {
      border-color: #6759d9;
      box-shadow: 0 0 0 3px rgba(103,89,217,.14);
    }

    .gb-auth-primary,
    .gb-auth-secondary,
    .gb-auth-link,
    .gb-signout-btn { font: inherit; cursor: pointer; }

    .gb-auth-primary {
      width: 100%;
      min-height: 52px;
      margin-top: 3px;
      border: 0;
      border-radius: 14px;
      background: #6759d9;
      color: #fff;
      font-weight: 800;
      box-shadow: 0 10px 22px rgba(103,89,217,.25);
    }

    .gb-auth-primary:disabled { opacity: .65; cursor: wait; }

    .gb-auth-secondary {
      width: 100%;
      min-height: 48px;
      border: 1px solid #dde0eb;
      border-radius: 14px;
      background: #fff;
      color: #202236;
      font-weight: 750;
    }

    .gb-auth-switch {
      margin: 18px 0 0;
      color: #70758c;
      font-size: 13px;
      text-align: center;
    }

    .gb-auth-link {
      padding: 4px;
      border: 0;
      background: transparent;
      color: #5a4ac7;
      font-weight: 800;
    }

    .gb-auth-error {
      display: none;
      padding: 11px 12px;
      border-radius: 11px;
      background: #fdecef;
      color: #a92f3a;
      font-size: 13px;
      line-height: 1.4;
    }

    .gb-auth-error.show { display: block; }

    .gb-auth-note {
      margin: 4px 0 0;
      color: #7a8299;
      font-size: 11px;
      line-height: 1.45;
    }

    .gb-signout-btn {
      display: none;
      width: 100%;
      min-height: 38px;
      margin-top: 11px;
      border: 1px solid rgba(255,255,255,.38);
      border-radius: 11px;
      background: rgba(255,255,255,.14);
      color: #fff;
      font-size: 12px;
      font-weight: 750;
    }

    .gb-signout-btn.show { display: block; }

    .gb-splash {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 28px;
      background:
        radial-gradient(circle at 50% 35%, rgba(0, 178, 214, .22), transparent 36%),
        linear-gradient(150deg, #020b1c, #061a36 58%, #063e57);
      opacity: 1;
      visibility: visible;
      transition: opacity .55s ease, visibility .55s ease;
    }

    .gb-splash.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .gb-splash-inner {
      width: min(92vw, 620px);
      text-align: center;
    }

    .gb-splash-logo {
      display: block;
      width: 100%;
      height: auto;
      margin: 0 auto 24px;
      border-radius: 24px;
      box-shadow: 0 22px 65px rgba(0, 0, 0, .24);
    }

    .gb-splash-message {
      margin: 0;
      color: rgba(255,255,255,.93);
      font-size: clamp(16px, 4vw, 21px);
      font-weight: 700;
      letter-spacing: .01em;
    }

    .gb-paw-loader {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 22px;
    }

    .gb-paw-loader span {
      display: inline-block;
      color: #29c3df;
      font-size: 22px;
      opacity: .3;
      transform: translateY(0) rotate(-8deg);
      animation: gbPawWalk 1.15s infinite ease-in-out;
    }

    .gb-paw-loader span:nth-child(2) { animation-delay: .14s; }
    .gb-paw-loader span:nth-child(3) { animation-delay: .28s; }
    .gb-paw-loader span:nth-child(4) { animation-delay: .42s; }

    @keyframes gbPawWalk {
      0%, 70%, 100% { opacity: .28; transform: translateY(0) rotate(-8deg) scale(.94); }
      30% { opacity: 1; transform: translateY(-7px) rotate(4deg) scale(1.08); }
    }

    @media (max-width: 430px) {
      .gb-auth-screen { padding-right: 12px; padding-left: 12px; }
      .gb-auth-card { margin: 6px auto; padding: 21px 17px; border-radius: 23px; }
    }
  `;

  const authMarkup = `
    <section class="gb-auth-screen" id="gbSignupScreen" aria-hidden="true">
      <div class="gb-auth-card">
        <div class="gb-auth-brand">
          <div class="gb-auth-logo"><img src="groombook-app-icon.png" alt="GroomBook"></div>
          <h2>Create Your GroomBook Account</h2>
          <p>Set up your grooming business and begin your free trial.</p>
        </div>

        <form class="gb-auth-form" id="gbSignupForm" novalidate>
          <div>
            <label for="gbBusinessName">Business name</label>
            <input id="gbBusinessName" name="businessName" autocomplete="organization" required placeholder="Example: Bella's Pet Spa">
          </div>

          <div>
            <label for="gbOwnerName">Owner's name</label>
            <input id="gbOwnerName" name="ownerName" autocomplete="name" required placeholder="Your full name">
          </div>

          <div>
            <label for="gbSignupEmail">Email address</label>
            <input id="gbSignupEmail" name="email" type="email" inputmode="email" autocomplete="email" required placeholder="you@example.com">
          </div>

          <div>
            <label for="gbPhone">Phone number</label>
            <input id="gbPhone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="(555) 555-5555">
          </div>

          <div>
            <label for="gbDailyCapacity">Daily appointment capacity</label>
            <input id="gbDailyCapacity" name="dailyCapacity" type="number" min="1" max="100" value="10" required>
          </div>

          <div>
            <label for="gbSignupPassword">Password</label>
            <input id="gbSignupPassword" name="password" type="password" minlength="6" autocomplete="new-password" required placeholder="At least 6 characters">
          </div>

          <div>
            <label for="gbConfirmPassword">Confirm password</label>
            <input id="gbConfirmPassword" name="confirmPassword" type="password" minlength="6" autocomplete="new-password" required placeholder="Enter the password again">
          </div>

          <div class="gb-auth-error" id="gbSignupError" role="alert"></div>

          <button class="gb-auth-primary" id="gbSignupSubmit" type="submit">Start My Free Trial</button>
          <button class="gb-auth-secondary" id="gbSignupBack" type="button">Back</button>

          <p class="gb-auth-note">Your GroomBook account and business profile are saved securely online and can be used on another device.</p>
        </form>

        <p class="gb-auth-switch">
          Already have an account?
          <button class="gb-auth-link" id="gbGoToLogin" type="button">Sign In</button>
        </p>
      </div>
    </section>

    <section class="gb-auth-screen" id="gbLoginScreen" aria-hidden="true">
      <div class="gb-auth-card">
        <div class="gb-auth-brand">
          <div class="gb-auth-logo"><img src="groombook-app-icon.png" alt="GroomBook"></div>
          <h2>Welcome Back</h2>
          <p>Sign in to open your GroomBook dashboard.</p>
        </div>

        <form class="gb-auth-form" id="gbLoginForm" novalidate>
          <div>
            <label for="gbLoginEmail">Email address</label>
            <input id="gbLoginEmail" name="email" type="email" inputmode="email" autocomplete="email" required placeholder="you@example.com">
          </div>

          <div>
            <label for="gbLoginPassword">Password</label>
            <input id="gbLoginPassword" name="password" type="password" autocomplete="current-password" required placeholder="Enter your password">
          </div>

          <div class="gb-auth-error" id="gbLoginError" role="alert"></div>

          <button class="gb-auth-primary" id="gbLoginSubmit" type="submit">Sign In</button>
          <button class="gb-auth-secondary" id="gbLoginBack" type="button">Back</button>
        </form>

        <p class="gb-auth-switch">
          Need an account?
          <button class="gb-auth-link" id="gbGoToSignup" type="button">Start Free Trial</button>
        </p>
      </div>
    </section>
  `;

  function loadSupabaseLibrary() {
    if (window.supabase?.createClient) {
      return Promise.resolve(window.supabase);
    }

    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-groombook-supabase="true"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.supabase), { once: true });
        existing.addEventListener("error", () => reject(new Error("Supabase library could not load.")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = SUPABASE_CDN;
      script.async = true;
      script.dataset.groombookSupabase = "true";
      script.onload = () => {
        if (window.supabase?.createClient) {
          resolve(window.supabase);
        } else {
          reject(new Error("Supabase library loaded incorrectly."));
        }
      };
      script.onerror = () => reject(new Error("Supabase library could not load."));
      document.head.appendChild(script);
    });
  }

  function createSplash() {
    let splash = document.getElementById("gbSplash");
    if (splash) return splash;

    splash = document.createElement("div");
    splash.id = "gbSplash";
    splash.className = "gb-splash";
    splash.setAttribute("role", "status");
    splash.setAttribute("aria-live", "polite");
    splash.innerHTML = `
      <div class="gb-splash-inner">
        <img class="gb-splash-logo" src="${BRAND_DARK_LOGO}" alt="GroomBook by Cretena">
        <p class="gb-splash-message">Syncing today's appointments...</p>
        <div class="gb-paw-loader" aria-hidden="true">
          <span>🐾</span><span>🐾</span><span>🐾</span><span>🐾</span>
        </div>
      </div>
    `;
    splash.dataset.startedAt = String(Date.now());
    document.body.appendChild(splash);
    return splash;
  }

  async function hideSplash() {
    const splash = document.getElementById("gbSplash");
    if (!splash) return;

    const startedAt = Number(splash.dataset.startedAt || Date.now());
    const remaining = Math.max(0, 4000 - (Date.now() - startedAt));
    if (remaining) {
      await new Promise(resolve => setTimeout(resolve, remaining));
    }

    splash.classList.add("hidden");
    setTimeout(() => splash.remove(), 650);
  }

  function decorateBranding(landingPage) {
    document.title = `${BRAND_NAME} by ${PARENT_BRAND}`;

    const logoCircle = landingPage?.querySelector(".logo-circle");
    if (logoCircle) {
      logoCircle.innerHTML = `<img src="${BRAND_APP_ICON}" alt="GroomBook">`;
      logoCircle.style.overflow = "hidden";
      logoCircle.style.padding = "0";
      const image = logoCircle.querySelector("img");
      if (image) {
        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "cover";
      }
    }

    const heroContent = landingPage?.querySelector(".hero-content");
    const heroTitle = heroContent?.querySelector("h1");
    if (heroTitle && !heroContent.querySelector(".gb-byline")) {
      const byline = document.createElement("div");
      byline.className = "gb-byline";
      byline.textContent = `by ${PARENT_BRAND}`;
      byline.style.marginTop = "-8px";
      byline.style.marginBottom = "18px";
      byline.style.color = "rgba(255,255,255,.9)";
      byline.style.fontSize = "16px";
      byline.style.fontWeight = "700";
      byline.style.letterSpacing = ".08em";
      heroTitle.insertAdjacentElement("afterend", byline);
    }
  }

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function createCapacitySettings(dailyCapacity) {
    const capacity = Math.max(1, Math.min(100, Number(dailyCapacity) || 10));
    return {
      mode: "pets",
      weekdays: {
        0: { limit: 0, closed: true },
        1: { limit: capacity, closed: false },
        2: { limit: capacity, closed: false },
        3: { limit: capacity, closed: false },
        4: { limit: capacity, closed: false },
        5: { limit: capacity, closed: false },
        6: { limit: capacity, closed: false }
      }
    };
  }

  function friendlyAuthError(error, fallback) {
    const message = String(error?.message || "").toLowerCase();

    if (message.includes("already registered") || message.includes("already been registered")) {
      return "An online account already exists for that email. Tap Sign In instead.";
    }
    if (message.includes("invalid login credentials")) {
      return "The email or password is incorrect.";
    }
    if (message.includes("password") && message.includes("least")) {
      return "Use a password with at least 6 characters.";
    }
    if (message.includes("rate limit")) {
      return "Too many attempts were made. Wait a moment and try again.";
    }
    if (message.includes("failed to fetch") || message.includes("network")) {
      return "GroomBook could not connect online. Check your internet connection and try again.";
    }

    return error?.message || fallback;
  }

  async function initAuth() {
    const landingPage = document.getElementById("landingPage");
    const startTrialBtn = document.getElementById("startTrialBtn");
    const landingLoginBtn = document.getElementById("landingLoginBtn");

    if (!landingPage || !startTrialBtn || !landingLoginBtn) {
      console.error("GroomBook authentication could not find the landing page buttons.");
      return;
    }

    if (!document.getElementById("gbAuthStyles")) {
      const style = document.createElement("style");
      style.id = "gbAuthStyles";
      style.textContent = authStyles;
      document.head.appendChild(style);
    }

    if (!document.getElementById("gbSignupScreen")) {
      document.body.insertAdjacentHTML("beforeend", authMarkup);
    }

    createSplash();
    decorateBranding(landingPage);

    const signupScreen = document.getElementById("gbSignupScreen");
    const loginScreen = document.getElementById("gbLoginScreen");
    const signupForm = document.getElementById("gbSignupForm");
    const loginForm = document.getElementById("gbLoginForm");
    const signupError = document.getElementById("gbSignupError");
    const loginError = document.getElementById("gbLoginError");
    const signupSubmit = document.getElementById("gbSignupSubmit");
    const loginSubmit = document.getElementById("gbLoginSubmit");

    const header = document.querySelector(".header");
    let signOutButton = document.getElementById("gbSignOutBtn");
    if (!signOutButton) {
      signOutButton = document.createElement("button");
      signOutButton.type = "button";
      signOutButton.className = "gb-signout-btn";
      signOutButton.id = "gbSignOutBtn";
      signOutButton.textContent = "Sign Out";
      header?.appendChild(signOutButton);
    }

    let supabaseClient = null;
    let activeUser = null;
    let activeProfile = null;

    const clientReady = loadSupabaseLibrary().then(library => {
      supabaseClient = library.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        }
      );

      window.groomBookSupabase = supabaseClient;
      return supabaseClient;
    });

    function showError(element, message) {
      element.textContent = message;
      element.classList.add("show");
    }

    function clearErrors() {
      signupError.textContent = "";
      loginError.textContent = "";
      signupError.classList.remove("show");
      loginError.classList.remove("show");
    }

    function closeAuthScreens() {
      signupScreen.classList.remove("open");
      loginScreen.classList.remove("open");
      signupScreen.setAttribute("aria-hidden", "true");
      loginScreen.setAttribute("aria-hidden", "true");
    }

    function openSignup() {
      clearErrors();
      closeAuthScreens();
      landingPage.style.display = "none";
      signupScreen.classList.add("open");
      signupScreen.setAttribute("aria-hidden", "false");
      window.scrollTo(0, 0);
      setTimeout(() => document.getElementById("gbBusinessName")?.focus(), 100);
    }

    function openLogin() {
      clearErrors();
      closeAuthScreens();
      landingPage.style.display = "none";
      loginScreen.classList.add("open");
      loginScreen.setAttribute("aria-hidden", "false");
      window.scrollTo(0, 0);
      setTimeout(() => document.getElementById("gbLoginEmail")?.focus(), 100);
    }

    function showLanding() {
      closeAuthScreens();
      landingPage.style.display = "flex";
      signOutButton.classList.remove("show");
      activeUser = null;
      activeProfile = null;
      window.groomBookCurrentUser = null;
      window.groomBookCurrentProfile = null;
      window.scrollTo(0, 0);
    }

    function normalizeProfile(profile, user) {
      const metadata = user?.user_metadata || {};
      return {
        id: profile?.id || user?.id || "",
        businessName: profile?.business_name || metadata.business_name || "GroomBook",
        ownerName: profile?.owner_name || metadata.owner_name || "Owner",
        email: profile?.email || user?.email || "",
        phone: profile?.phone || metadata.phone || "",
        dailyCapacity: Number(profile?.daily_capacity || metadata.daily_capacity || 10),
        subscriptionStatus: profile?.subscription_status || "trial",
        trialEndsAt: profile?.trial_ends_at || null
      };
    }

    function applyAccountToApp(account) {
      const headerTitle = document.querySelector(".header h1");
      const headerSubtitle = document.querySelector(".header p");

      if (headerTitle) {
        headerTitle.textContent = `🐾 ${account.businessName || "GroomBook"}`;
      }

      if (headerSubtitle) {
        headerSubtitle.textContent = account.ownerName
          ? `${account.ownerName}'s grooming appointments and history`
          : "Pet grooming appointments and history";
      }

      const capacity = createCapacitySettings(account.dailyCapacity);
      localStorage.setItem(CAPACITY_KEY, JSON.stringify(capacity));

      try {
        if (typeof capacitySettings !== "undefined") {
          capacitySettings = capacity;
        }
      } catch (error) {
        console.warn("Capacity settings will refresh on the next page load.", error);
      }

      if (typeof updateGreeting === "function") {
        updateGreeting();
      }

      if (typeof renderAll === "function") {
        renderAll();
      }
    }

    function showApp(account, user) {
      closeAuthScreens();
      landingPage.style.display = "none";
      signOutButton.classList.add("show");
      activeUser = user;
      activeProfile = account;
      window.groomBookCurrentUser = user;
      window.groomBookCurrentProfile = account;
      applyAccountToApp(account);
      document.dispatchEvent(new CustomEvent("groombook:auth-ready", {
        detail: { client: supabaseClient, user, profile: account }
      }));
      window.scrollTo(0, 0);
    }

    async function fetchBusinessProfile(user) {
      const client = await clientReady;
      const { data, error } = await client
        .from("businesses")
        .select("id,business_name,owner_name,email,phone,daily_capacity,subscription_status,trial_ends_at")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data;
    }

    async function ensureBusinessProfile(user, values = {}) {
      const client = await clientReady;
      const metadata = user.user_metadata || {};
      const payload = {
        id: user.id,
        business_name: values.businessName || metadata.business_name || "GroomBook",
        owner_name: values.ownerName || metadata.owner_name || "Owner",
        email: normalizeEmail(user.email || values.email),
        phone: values.phone || metadata.phone || null,
        daily_capacity: Math.max(
          1,
          Math.min(100, Number(values.dailyCapacity || metadata.daily_capacity || 10))
        )
      };

      const { data, error } = await client
        .from("businesses")
        .upsert(payload, { onConflict: "id" })
        .select("id,business_name,owner_name,email,phone,daily_capacity,subscription_status,trial_ends_at")
        .single();

      if (error) {
        throw error;
      }

      return data;
    }

    async function openOnlineSession(user, fallbackValues = {}) {
      let profile = await fetchBusinessProfile(user);
      if (!profile) {
        profile = await ensureBusinessProfile(user, fallbackValues);
      }

      const normalized = normalizeProfile(profile, user);
      showApp(normalized, user);
      return normalized;
    }

    startTrialBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openSignup();
    }, true);

    landingLoginBtn.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openLogin();
    }, true);

    document.getElementById("gbSignupBack").addEventListener("click", showLanding);
    document.getElementById("gbLoginBack").addEventListener("click", showLanding);
    document.getElementById("gbGoToLogin").addEventListener("click", openLogin);
    document.getElementById("gbGoToSignup").addEventListener("click", openSignup);

    signupForm.addEventListener("submit", async event => {
      event.preventDefault();
      clearErrors();

      const formData = new FormData(signupForm);
      const businessName = String(formData.get("businessName") || "").trim();
      const ownerName = String(formData.get("ownerName") || "").trim();
      const email = normalizeEmail(formData.get("email"));
      const phone = String(formData.get("phone") || "").trim();
      const dailyCapacity = Number(formData.get("dailyCapacity"));
      const password = String(formData.get("password") || "");
      const confirmPassword = String(formData.get("confirmPassword") || "");

      if (!businessName || !ownerName || !email || !phone) {
        showError(signupError, "Complete all required fields.");
        return;
      }
      if (!email.includes("@")) {
        showError(signupError, "Enter a valid email address.");
        return;
      }
      if (!Number.isFinite(dailyCapacity) || dailyCapacity < 1 || dailyCapacity > 100) {
        showError(signupError, "Daily capacity must be between 1 and 100.");
        return;
      }
      if (password.length < 6) {
        showError(signupError, "Password must contain at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        showError(signupError, "The two passwords do not match.");
        return;
      }

      signupSubmit.disabled = true;
      signupSubmit.textContent = "Creating Online Account...";

      try {
        const client = await clientReady;
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: {
            data: {
              business_name: businessName,
              owner_name: ownerName,
              phone,
              daily_capacity: String(dailyCapacity)
            }
          }
        });

        if (error) {
          throw error;
        }
        if (!data.user) {
          throw new Error("The online account was not created.");
        }

        await openOnlineSession(data.user, {
          businessName,
          ownerName,
          email,
          phone,
          dailyCapacity
        });

        signupForm.reset();
        document.getElementById("gbDailyCapacity").value = "10";
      } catch (error) {
        console.error("Unable to create GroomBook online account:", error);
        showError(
          signupError,
          friendlyAuthError(error, "The online account could not be created. Please try again.")
        );
      } finally {
        signupSubmit.disabled = false;
        signupSubmit.textContent = "Start My Free Trial";
      }
    });

    loginForm.addEventListener("submit", async event => {
      event.preventDefault();
      clearErrors();

      const formData = new FormData(loginForm);
      const email = normalizeEmail(formData.get("email"));
      const password = String(formData.get("password") || "");

      if (!email || !password) {
        showError(loginError, "Enter your email and password.");
        return;
      }

      loginSubmit.disabled = true;
      loginSubmit.textContent = "Signing In Online...";

      try {
        const client = await clientReady;
        const { data, error } = await client.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw error;
        }
        if (!data.user) {
          throw new Error("The online account could not be opened.");
        }

        await openOnlineSession(data.user);
        loginForm.reset();
      } catch (error) {
        console.error("Unable to sign in to GroomBook:", error);
        showError(
          loginError,
          friendlyAuthError(error, "Sign in failed. Please try again.")
        );
      } finally {
        loginSubmit.disabled = false;
        loginSubmit.textContent = "Sign In";
      }
    });

    signOutButton.addEventListener("click", async () => {
      signOutButton.disabled = true;
      signOutButton.textContent = "Signing Out...";

      try {
        const client = await clientReady;
        const { error } = await client.auth.signOut();
        if (error) {
          throw error;
        }
        showLanding();
      } catch (error) {
        console.error("Unable to sign out:", error);
        alert("GroomBook could not sign out. Check your connection and try again.");
      } finally {
        signOutButton.disabled = false;
        signOutButton.textContent = "Sign Out";
      }
    });

    window.groomBookAuth = {
      getClient: async () => clientReady,
      getUser: () => activeUser,
      getProfile: () => activeProfile
    };

    try {
      const client = await clientReady;
      const { data, error } = await client.auth.getSession();
      if (error) {
        throw error;
      }

      const user = data.session?.user || null;
      if (user) {
        try {
          await openOnlineSession(user);
        } catch (profileError) {
          console.warn("GroomBook restored the login but could not refresh the business profile yet:", profileError);
          showApp(normalizeProfile(null, user), user);
        }
      } else {
        showLanding();
      }
    } catch (error) {
      console.error("GroomBook online authentication did not initialize:", error);
      showLanding();
    } finally {
      await hideSplash();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth, { once: true });
  } else {
    initAuth();
  }
})();

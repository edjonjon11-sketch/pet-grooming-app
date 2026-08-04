(() => {
  "use strict";

  const ACCOUNT_KEY = "groomBookAccount_v1";
  const SESSION_KEY = "groomBookSession_v1";
  const CAPACITY_KEY = "groomBookCapacity";

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

    .gb-auth-screen.open {
      display: block;
    }

    .gb-auth-card {
      width: 100%;
      max-width: 520px;
      margin: 18px auto;
      padding: 24px;
      border-radius: 26px;
      background: rgba(255,255,255,.98);
      box-shadow: 0 24px 70px rgba(20, 14, 75, .28);
    }

    .gb-auth-brand {
      margin-bottom: 22px;
      text-align: center;
    }

    .gb-auth-logo {
      display: grid;
      place-items: center;
      width: 72px;
      height: 72px;
      margin: 0 auto 12px;
      border-radius: 50%;
      background: #f0edff;
      font-size: 34px;
    }

    .gb-auth-brand h2 {
      margin: 0;
      color: #202236;
      font-size: 27px;
    }

    .gb-auth-brand p {
      margin: 7px 0 0;
      color: #70758c;
      font-size: 14px;
      line-height: 1.45;
    }

    .gb-auth-form {
      display: grid;
      gap: 14px;
    }

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
    .gb-signout-btn {
      font: inherit;
      cursor: pointer;
    }

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

    .gb-auth-primary:disabled {
      opacity: .65;
      cursor: wait;
    }

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

    .gb-auth-error.show {
      display: block;
    }

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

    .gb-signout-btn.show {
      display: block;
    }

    @media (max-width: 430px) {
      .gb-auth-screen {
        padding-right: 12px;
        padding-left: 12px;
      }

      .gb-auth-card {
        margin: 6px auto;
        padding: 21px 17px;
        border-radius: 23px;
      }
    }
  `;

  const authMarkup = `
    <section class="gb-auth-screen" id="gbSignupScreen" aria-hidden="true">
      <div class="gb-auth-card">
        <div class="gb-auth-brand">
          <div class="gb-auth-logo">🐾</div>
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

          <p class="gb-auth-note">This first version saves the account on this device. Online, cross-device accounts will be connected in the next phase.</p>
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
          <div class="gb-auth-logo">🐾</div>
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

  function initAuth() {
    const landingPage = document.getElementById("landingPage");
    const startTrialBtn = document.getElementById("startTrialBtn");
    const landingLoginBtn = document.getElementById("landingLoginBtn");

    if (!landingPage || !startTrialBtn || !landingLoginBtn) {
      console.error("GroomBook authentication could not find the landing page buttons.");
      return;
    }

    const style = document.createElement("style");
    style.id = "gbAuthStyles";
    style.textContent = authStyles;
    document.head.appendChild(style);

    document.body.insertAdjacentHTML("beforeend", authMarkup);

    const signupScreen = document.getElementById("gbSignupScreen");
    const loginScreen = document.getElementById("gbLoginScreen");
    const signupForm = document.getElementById("gbSignupForm");
    const loginForm = document.getElementById("gbLoginForm");
    const signupError = document.getElementById("gbSignupError");
    const loginError = document.getElementById("gbLoginError");
    const signupSubmit = document.getElementById("gbSignupSubmit");
    const loginSubmit = document.getElementById("gbLoginSubmit");

    const header = document.querySelector(".header");
    const signOutButton = document.createElement("button");
    signOutButton.type = "button";
    signOutButton.className = "gb-signout-btn";
    signOutButton.id = "gbSignOutBtn";
    signOutButton.textContent = "Sign Out";
    header?.appendChild(signOutButton);

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
      window.scrollTo(0, 0);
    }

    function showApp(account) {
      closeAuthScreens();
      landingPage.style.display = "none";
      signOutButton.classList.add("show");
      applyAccountToApp(account);
      window.scrollTo(0, 0);
    }

    function normalizeEmail(value) {
      return String(value || "").trim().toLowerCase();
    }

    function readAccount() {
      try {
        const saved = localStorage.getItem(ACCOUNT_KEY);
        return saved ? JSON.parse(saved) : null;
      } catch (error) {
        console.error("Unable to read GroomBook account:", error);
        return null;
      }
    }

    async function hashPassword(password) {
      if (window.crypto?.subtle && window.TextEncoder) {
        const bytes = new TextEncoder().encode(password);
        const digest = await window.crypto.subtle.digest("SHA-256", bytes);
        return Array.from(new Uint8Array(digest))
          .map(byte => byte.toString(16).padStart(2, "0"))
          .join("");
      }

      return btoa(unescape(encodeURIComponent(password)));
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

      if (typeof updateGreeting === "function") {
        updateGreeting();
      }

      if (typeof renderAll === "function") {
        renderAll();
      }
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

      const existingAccount = readAccount();
      if (existingAccount) {
        showError(signupError, "An account already exists on this device. Tap Sign In below.");
        return;
      }

      signupSubmit.disabled = true;
      signupSubmit.textContent = "Creating Account...";

      try {
        const account = {
          businessName,
          ownerName,
          email,
          phone,
          dailyCapacity,
          passwordHash: await hashPassword(password),
          createdAt: new Date().toISOString()
        };

        localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
        localStorage.setItem(SESSION_KEY, email);

        const newCapacitySettings = createCapacitySettings(dailyCapacity);
        localStorage.setItem(CAPACITY_KEY, JSON.stringify(newCapacitySettings));

        if (typeof capacitySettings !== "undefined") {
          capacitySettings = newCapacitySettings;
        }

        signupForm.reset();
        document.getElementById("gbDailyCapacity").value = "10";
        showApp(account);
      } catch (error) {
        console.error("Unable to create GroomBook account:", error);
        showError(signupError, "The account could not be created. Please try again.");
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
      const account = readAccount();

      if (!account) {
        showError(loginError, "No account is saved on this device. Start a free trial first.");
        return;
      }

      loginSubmit.disabled = true;
      loginSubmit.textContent = "Signing In...";

      try {
        const passwordHash = await hashPassword(password);
        const emailMatches = email === normalizeEmail(account.email);
        const passwordMatches = passwordHash === account.passwordHash;

        if (!emailMatches || !passwordMatches) {
          showError(loginError, "The email or password is incorrect.");
          return;
        }

        localStorage.setItem(SESSION_KEY, account.email);
        loginForm.reset();
        showApp(account);
      } catch (error) {
        console.error("Unable to sign in:", error);
        showError(loginError, "Sign in failed. Please try again.");
      } finally {
        loginSubmit.disabled = false;
        loginSubmit.textContent = "Sign In";
      }
    });

    signOutButton.addEventListener("click", () => {
      localStorage.removeItem(SESSION_KEY);
      showLanding();
    });

    const account = readAccount();
    const activeSession = normalizeEmail(localStorage.getItem(SESSION_KEY));

    if (account && activeSession === normalizeEmail(account.email)) {
      showApp(account);
    } else {
      localStorage.removeItem(SESSION_KEY);
      showLanding();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth, { once: true });
  } else {
    initAuth();
  }
})();

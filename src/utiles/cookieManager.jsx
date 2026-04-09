import Cookies from "js-cookie";

// 🆔 Session ID
function getSessionId() {
  let sessionId = sessionStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("session_id", sessionId);
  }

  return sessionId;
}

// 📊 TRACK USER
function trackUser(userId) {
  const data = {
    user_id: userId || "guest",
    session_id: getSessionId(),
    page: window.location.pathname,
    time: new Date().toISOString(),
  };

  let logs = JSON.parse(localStorage.getItem("user_tracking") || "[]");
  logs.push(data);

  localStorage.setItem("user_tracking", JSON.stringify(logs));

  
}

// 🧠 AUTO DETECT COOKIE FUNCTION
function getUserPrefsFromAnyCookie() {
  const allCookies = Cookies.get();

  // user_prefs_* wali key dhundo
  const key = Object.keys(allCookies).find((k) =>
    k.startsWith("user_prefs_")
  );

  if (!key) return null;

  try {
    return {
      prefs: JSON.parse(allCookies[key]),
      userId: key.split("_")[2], // 👉 72 extract
    };
  } catch {
    return null;
  }
}

// MAIN FUNCTION
export function applyUserCookiePreferences(userId = null, prefsOverride = null) {

  let prefs = prefsOverride;
  let finalUserId = userId;

  // 👉 agar override nahi hai to cookie auto detect karo
  if (!prefs) {
    const result = getUserPrefsFromAnyCookie();

    if (!result) {
      console.log("No user_prefs cookie found");
      return;
    }

    prefs = result.prefs;
    finalUserId = result.userId;
  }

  // 🟢 Functional
  if (prefs.is_functional_cookies) {
    const lang = navigator.language.split("-")[0];
    document.cookie = `language=${lang}; path=/;`;
  } else {
    document.cookie = "language=; expires=Thu, 01 Jan 1970 UTC; path=/;";
  }

  // 🔵 Performance
  if (prefs.is_performance_cookies) {
    loadAnalytics();
    trackUser(finalUserId); // ✅ correct user id
  } else {
    removeAnalyticsCookies();
  }

  // 🔴 Marketing
  if (prefs.is_marketing_cookies) {
    loadMarketing();
  } else {
    removeMarketingCookies();
  }
}

// 🔵 Analytics
function loadAnalytics() {
  if (window.gtagLoaded) return;

  const GA_ID = "G-QCX3G9KSPC";

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    window.gtagLoaded = true;
  };

  document.head.appendChild(script);
}

// ❌ Remove Analytics
function removeAnalyticsCookies() {
  document.cookie = "_ga=; expires=Thu, 01 Jan 1970 UTC; path=/;";
  document.cookie = "_gid=; expires=Thu, 01 Jan 1970 UTC; path=/;";
}

// 🔴 Marketing
function loadMarketing() {
  console.log("Marketing scripts loaded");
}

function removeMarketingCookies() {
  document.cookie = "_fbp=; expires=Thu, 01 Jan 1970 UTC; path=/;";
}
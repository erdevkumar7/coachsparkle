import Cookies from "js-cookie";

// MAIN FUNCTION
export function applyUserCookiePreferences(userId) {
  const prefCookieName = `user_prefs_${userId}`;
  const saved = Cookies.get(prefCookieName);

  if (!saved) return;

  let prefs = {};
  try {
    prefs = JSON.parse(saved);
  } catch {
    prefs = {};
  }

  // 🟢 Functional
  if (prefs.is_functional_cookies) {
    document.cookie = "lang=en; path=/;";
  } else {
    document.cookie = "lang=; expires=Thu, 01 Jan 1970 UTC; path=/;";
  }

  // 🔵 Performance
  if (prefs.is_performance_cookies) {
    loadAnalytics();
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

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=GA_ID";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');

  window.gtagLoaded = true;
}

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
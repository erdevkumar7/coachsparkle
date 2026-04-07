"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function ClientCookieHandler() {

 useEffect(() => {

    // 🌍 Dynamic Language
    const lang = navigator.language;
    const shortLang = lang.split("-")[0];
    Cookies.set("language", shortLang, { expires: 7 });

    // 📊 Analytics
    loadGoogleAnalytics();

    // 📢 Marketing
    loadFacebookPixel();

  }, []);
  return null;
}

function loadGoogleAnalytics() {
  const GA_ID = "G-XXXXXXX"; // apna real ID

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", GA_ID);

  console.log("GA Loaded");
}

function loadFacebookPixel() {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    console.log("Pixel already loaded");
    return;
  }

  console.log("Loading Facebook Pixel...");

  (function(f,b,e,v,n,t,s){
    if(f.fbq)return;
    n=f.fbq=function(){
      n.callMethod
        ? n.callMethod.apply(n,arguments)
        : n.queue.push(arguments)
    };
    if(!f._fbq) f._fbq=n;
    n.push=n;
    n.loaded=true;
    n.version='2.0';
    n.queue=[];

    t=b.createElement(e);
    t.async=true;
    t.src=v;

    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s);

  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', 'YOUR_PIXEL_ID'); // ⚠️ yaha real ID daalo
  window.fbq('track', 'PageView');

  console.log("Facebook Pixel Loaded ✅");
}
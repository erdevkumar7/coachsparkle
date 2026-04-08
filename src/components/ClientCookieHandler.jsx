"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { applyUserCookiePreferences } from "../utiles/cookieManager"; // adjust path

export default function ClientCookieHandler({ userId }) {
 
  useEffect(() => {
    if (!userId) return;

    applyUserCookiePreferences(userId);

  }, [userId]);

  return null;
}
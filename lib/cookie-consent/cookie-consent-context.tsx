"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ConsentStatus = "unknown" | "granted" | "denied";

type CookieConsentContextValue = {
  status: ConsentStatus;
  grant: () => void;
  deny: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);
const STORAGE_KEY = "exception-by-ki-consent";

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>("unknown");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // State must start "unknown" so the client's first render matches the
    // server-rendered (window-less) HTML; syncing from localStorage only
    // after mount is what avoids a hydration mismatch here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "granted" || stored === "denied") setStatus(stored);
  }, []);

  function grant() {
    setStatus("granted");
    window.localStorage.setItem(STORAGE_KEY, "granted");
  }

  function deny() {
    setStatus("denied");
    window.localStorage.setItem(STORAGE_KEY, "denied");
  }

  return (
    <CookieConsentContext.Provider value={{ status, grant, deny }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return ctx;
}

"use client";

import { useEffect } from "react";

/**
 * Registra el service worker SOLO en producción (build/deploy).
 *
 * En desarrollo (`npm run dev`) un SW activo intercepta los chunks de
 * /_next y sirve versiones cacheadas obsoletas, rompiendo el server (500).
 * Por eso, en dev hacemos lo contrario: desregistramos cualquier SW previo
 * y limpiamos las cachés, para que un estado roto se cure solo.
 */
export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const isProd = process.env.NODE_ENV === "production";

    if (!isProd) {
      // Desarrollo: limpiar todo SW + cachés para recuperar el dev server.
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
      if ("caches" in window) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
      return;
    }

    // Producción: registrar el SW para que sea instalable y funcione offline.
    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.error("SW registration failed:", err));
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}

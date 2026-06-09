"use client";

import { useMemo } from "react";

/**
 * Campo de estrellas suave. Posiciones deterministas (sin Math.random
 * en render) para evitar desajustes de hidratación SSR/cliente.
 */
export default function Starfield() {
  const stars = useMemo(() => {
    const count = 70;
    return Array.from({ length: count }, (_, i) => {
      // PRNG simple y determinista a partir del índice
      const r = (n: number) => {
        const x = Math.sin((i + 1) * (n + 1) * 12.9898) * 43758.5453;
        return x - Math.floor(x);
      };
      return {
        id: i,
        top: r(1) * 100,
        left: r(2) * 100,
        size: 1 + r(3) * 2.2,
        delay: r(4) * 4,
        duration: 3 + r(5) * 4,
        opacity: 0.3 + r(6) * 0.7,
      };
    });
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gold-soft animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px rgba(240,216,154,0.8)",
          }}
        />
      ))}
    </div>
  );
}

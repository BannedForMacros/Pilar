"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Starfield from "@/components/Starfield";

/**
 * Fondo con parallax ligado al scroll. Las capas se mueven a distinta
 * velocidad al deslizar (con el dedo en móvil) creando sensación de
 * profundidad. Respeta prefers-reduced-motion.
 */
export default function Background() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Las capas se desplazan a distinto ritmo => profundidad
  const gradientPos = useTransform(scrollYProgress, [0, 1], ["50% 0%", "50% 100%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.6]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gradiente atardecer/noche que se "mueve" con el scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #2a1228 0%, #3b1d3a 35%, #5a2e57 60%, #8a4a5e 80%, #c97b9b 100%)",
          backgroundSize: "200% 200%",
          backgroundPosition: reduce ? "50% 50%" : gradientPos,
        }}
      />

      {/* Resplandor cálido tipo sol poniente con parallax */}
      <motion.div
        className="absolute -bottom-40 left-1/2 h-[60vh] w-[120vw] -translate-x-1/2 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(230,192,104,0.55), rgba(201,123,155,0.15), transparent)",
          y: reduce ? 0 : glowY,
          scale: reduce ? 1 : glowScale,
        }}
      />

      {/* Estrellas con parallax inverso (van más lento / hacia arriba) */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: reduce ? 0 : starsY,
          opacity: reduce ? 0.9 : starsOpacity,
        }}
      >
        <Starfield />
      </motion.div>
    </div>
  );
}

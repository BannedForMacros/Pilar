"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra fina superior que muestra el progreso del scroll.
 * Da feedback táctil-visual al deslizar en el celular.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-gold via-rosa to-gold-deep"
    />
  );
}

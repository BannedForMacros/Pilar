"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { content } from "@/config/content";

export default function FinalQuestion() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);

  const { prompt, yesLabel, noLabel, successHeading, successMessage } =
    content.finalQuestion;

  // Mueve el botón "No" a una posición aleatoria dentro de un rango seguro.
  const dodge = useCallback(() => {
    const range = 130;
    const x = (Math.random() - 0.5) * range * 2;
    const y = (Math.random() - 0.5) * range;
    setNoPos({ x, y });
    setDodges((d) => d + 1);
  }, []);

  // Mensajes burlones según cuántas veces ha intentado el "No".
  const noLabelDynamic = useMemo(() => {
    const taunts = [noLabel, "¿Segura?", "Casi…", "Inténtalo", "Jeje", "Nop"];
    return taunts[Math.min(dodges, taunts.length - 1)];
  }, [dodges, noLabel]);

  return (
    <section className="relative mx-auto flex min-h-[80svh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <Heart
              className="mb-6 h-10 w-10 text-rosa animate-float"
              aria-hidden="true"
            />
            <h2 className="mb-12 max-w-xl font-display text-3xl leading-tight text-rosa-soft sm:text-4xl">
              {prompt}
            </h2>

            <div className="relative flex min-h-[120px] w-full items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => setAccepted(true)}
                className="z-10 rounded-full bg-gradient-to-r from-gold to-rosa-dusk px-10 py-4 font-body text-lg font-semibold text-plum-deep shadow-lg shadow-rosa/20 transition-transform hover:scale-105 active:scale-95"
              >
                {yesLabel}
              </button>

              <motion.button
                type="button"
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                onMouseEnter={dodge}
                onPointerDown={(e) => {
                  // En móvil/touch: evita el toque y huye.
                  e.preventDefault();
                  dodge();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                onFocus={dodge}
                className="rounded-full border border-rosa-soft/40 bg-plum-soft/40 px-8 py-4 font-body text-lg text-rosa-soft/90 backdrop-blur-sm"
              >
                {noLabelDynamic}
              </motion.button>
            </div>

            {dodges > 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-sm italic text-gold-soft/70"
              >
                (Ese botón no quiere que digas que no…)
              </motion.p>
            )}
          </motion.div>
        ) : (
          <Success key="success" heading={successHeading} message={successMessage} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Success({ heading, message }: { heading: string; message: string }) {
  return (
    <>
      <HeartConfetti />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.7, times: [0, 0.6, 1] }}
        >
          <Heart
            className="mb-6 h-16 w-16 text-rosa"
            fill="currentColor"
            aria-hidden="true"
          />
        </motion.div>
        <h2 className="mb-4 font-display text-3xl text-gradient sm:text-4xl">
          {heading}
        </h2>
        <p className="max-w-lg font-display text-xl leading-snug text-rosa-soft sm:text-2xl">
          {message}
        </p>
      </motion.div>
    </>
  );
}

/** Lluvia de corazones (ícono Heart de lucide) al aceptar. */
function HeartConfetti() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const hearts = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 26,
      delay: Math.random() * 0.6,
      duration: 2.5 + Math.random() * 2.5,
      drift: (Math.random() - 0.5) * 120,
      rotate: (Math.random() - 0.5) * 90,
      opacity: 0.5 + Math.random() * 0.5,
    }))
  ).current;

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          initial={{ y: "110vh", x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "-15vh",
            x: h.drift,
            opacity: [0, h.opacity, h.opacity, 0],
            rotate: h.rotate,
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: "easeOut",
          }}
          style={{ position: "absolute", left: `${h.left}%`, bottom: 0 }}
        >
          <Heart
            style={{ width: h.size, height: h.size }}
            className="text-rosa"
            fill="currentColor"
          />
        </motion.span>
      ))}
    </div>
  );
}

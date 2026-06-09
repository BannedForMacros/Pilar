"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Sparkles, Smile, Star, Heart, type LucideIcon } from "lucide-react";
import { content, type ReasonIcon } from "@/config/content";

const ICONS: Record<ReasonIcon, LucideIcon> = {
  Sparkles,
  Smile,
  Star,
  Heart,
};

export default function Reasons() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="relative mx-auto max-w-5xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center font-display text-3xl text-gradient sm:text-4xl"
      >
        {content.reasonsHeading}
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {content.reasons.map((reason, i) => (
          <ReasonCard
            key={i}
            index={i}
            icon={reason.icon}
            title={reason.title}
            text={reason.text}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function ReasonCard({
  index,
  icon,
  title,
  text,
  progress,
}: {
  index: number;
  icon: ReasonIcon;
  title: string;
  text: string;
  progress: MotionValue<number>;
}) {
  const Icon = ICONS[icon];
  const reduce = useReducedMotion();

  const cardRef = useRef<HTMLDivElement>(null);
  // La tarjeta se considera "en foco" cuando está bien visible al hacer scroll
  const inView = useInView(cardRef, { amount: 0.6 });

  const [flipped, setFlipped] = useState(false);
  const [touched, setTouched] = useState(false); // el toque manual tiene prioridad

  // Auto-flip: al entrar en pantalla muestra el mensaje (para leerlo mientras
  // se desliza); al salir, vuelve al frente. El toque manual lo anula.
  useEffect(() => {
    if (touched) return;
    setFlipped(inView);
  }, [inView, touched]);

  // Parallax sutil: las columnas se desplazan en sentidos opuestos al hacer scroll
  const dir = index % 2 === 0 ? 1 : -1;
  const parallaxY = useTransform(progress, [0, 1], [40 * dir, -40 * dir]);

  return (
    <motion.div
      ref={cardRef}
      style={reduce ? undefined : { y: parallaxY }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flip-card h-56"
      data-flipped={flipped}
    >
      <button
        type="button"
        onClick={() => {
          setTouched(true);
          setFlipped((f) => !f);
        }}
        aria-pressed={flipped}
        aria-label={`Razón: ${title}. ${flipped ? "Mostrando el mensaje." : "Toca para revelar el mensaje."}`}
        className="flip-inner relative h-full w-full rounded-2xl text-left"
      >
        {/* Frente */}
        <div className="flip-face absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-gold/20 bg-plum-soft/30 p-6 backdrop-blur-sm">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-rosa/20 ring-1 ring-gold/40">
            <Icon className="h-8 w-8 text-gold-soft" aria-hidden="true" />
          </span>
          <h3 className="font-display text-2xl text-rosa-soft">{title}</h3>
        </div>

        {/* Reverso */}
        <div className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-gold/30 bg-gradient-to-br from-plum-soft/70 to-plum-deep/80 p-6 backdrop-blur-md">
          <Icon className="h-6 w-6 shrink-0 text-gold-soft/70" aria-hidden="true" />
          <p className="text-center font-display text-lg leading-snug text-rosa-soft sm:text-xl">
            {text}
          </p>
        </div>
      </button>
    </motion.div>
  );
}

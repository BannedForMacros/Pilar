"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Smile, Star, Heart, type LucideIcon } from "lucide-react";
import { content, type ReasonIcon } from "@/config/content";

const ICONS: Record<ReasonIcon, LucideIcon> = {
  Sparkles,
  Smile,
  Star,
  Heart,
};

export default function Reasons() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center font-display text-3xl text-gradient sm:text-4xl"
      >
        {content.reasonsHeading}
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {content.reasons.map((reason, i) => (
          <ReasonCard key={i} index={i} icon={reason.icon} title={reason.title} text={reason.text} />
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
}: {
  index: number;
  icon: ReasonIcon;
  title: string;
  text: string;
}) {
  const Icon = ICONS[icon];
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flip-card h-56"
      data-flipped={flipped}
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`Razón: ${title}. Toca para ${flipped ? "ocultar" : "revelar"} el mensaje.`}
        className="flip-inner relative h-full w-full rounded-2xl text-left"
      >
        {/* Frente */}
        <div className="flip-face absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-gold/20 bg-plum-soft/30 p-6 backdrop-blur-sm">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-rosa/20 ring-1 ring-gold/40">
            <Icon className="h-8 w-8 text-gold-soft" aria-hidden="true" />
          </span>
          <h3 className="font-display text-2xl text-rosa-soft">{title}</h3>
          <span className="text-xs uppercase tracking-widest text-gold-soft/60">
            Toca para leer
          </span>
        </div>

        {/* Reverso */}
        <div className="flip-face flip-back absolute inset-0 flex items-center justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-plum-soft/70 to-plum-deep/80 p-6 backdrop-blur-md">
          <p className="text-center font-display text-lg leading-snug text-rosa-soft sm:text-xl">
            {text}
          </p>
        </div>
      </button>
    </motion.div>
  );
}

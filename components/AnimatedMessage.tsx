"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { content } from "@/config/content";

export default function AnimatedMessage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.4"],
  });

  const lines = content.message;

  return (
    <section
      ref={ref}
      className="relative mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center sm:py-40"
    >
      <div className="space-y-2">
        {lines.map((line, i) => (
          <Line
            key={i}
            text={line}
            index={i}
            total={lines.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <Divider progress={scrollYProgress} />
    </section>
  );
}

/** Cada línea se revela según el progreso del scroll dentro de la sección. */
function Line({
  text,
  index,
  total,
  progress,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  // Cada línea ocupa una "ventana" del progreso, de forma escalonada
  const start = (index / total) * 0.7;
  const end = start + 0.4;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [28, 0]);
  const blurN = useTransform(progress, [start, end], [10, 0]);
  const filter = useTransform(blurN, (b) => `blur(${b}px)`);

  return (
    <motion.p
      style={reduce ? undefined : { opacity, y, filter }}
      initial={reduce ? { opacity: 1 } : false}
      className="font-display text-2xl leading-snug text-rosa-soft sm:text-3xl md:text-4xl"
    >
      {text}
    </motion.p>
  );
}

function Divider({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const scaleX = useTransform(progress, [0.6, 1], [0, 1]);
  const opacity = useTransform(progress, [0.6, 1], [0, 1]);

  return (
    <motion.span
      style={reduce ? undefined : { scaleX, opacity }}
      className="mt-12 block h-px w-32 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
    />
  );
}

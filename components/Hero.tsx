"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { content } from "@/config/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Progreso del scroll mientras el hero sale de la pantalla
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // El contenido se aleja, encoge y desvanece al deslizar
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        style={
          reduce
            ? undefined
            : { y, scale, opacity, filter }
        }
        className="flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 font-body text-sm uppercase tracking-[0.4em] text-gold-soft/80"
        >
          Para
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="text-gradient font-display text-7xl font-semibold leading-none sm:text-8xl md:text-9xl"
        >
          {content.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-6 max-w-md font-display text-xl italic text-rosa-soft/90 sm:text-2xl"
        >
          {content.tagline}
        </motion.p>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 flex flex-col items-center text-gold-soft/70"
        aria-hidden="true"
      >
        <span className="mb-1 text-xs uppercase tracking-widest">Desliza</span>
        <ChevronDown className="h-5 w-5 animate-float" />
      </motion.div>
    </section>
  );
}

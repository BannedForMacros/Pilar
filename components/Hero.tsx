"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { content } from "@/config/content";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
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

      <motion.div
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

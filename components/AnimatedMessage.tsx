"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content";

export default function AnimatedMessage() {
  return (
    <section className="relative mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center sm:py-32">
      <div className="space-y-2">
        {content.message.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.35, ease: "easeOut" }}
            className="font-display text-2xl leading-snug text-rosa-soft sm:text-3xl md:text-4xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: content.message.length * 0.35 }}
        className="mt-10 block h-px w-32 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
      />
    </section>
  );
}

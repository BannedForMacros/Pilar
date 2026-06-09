"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { content } from "@/config/content";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  // Mantiene el ícono del botón sincronizado con el estado real del audio.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  /**
   * Reproducción automática:
   *  1) Intenta sonar al cargar (algunos navegadores de escritorio lo permiten).
   *  2) Si el navegador lo bloquea (política de autoplay en móvil/iOS), arranca
   *     en la PRIMERA interacción de la usuaria (toque/scroll/clic) en cualquier
   *     parte de la página.
   */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.5;

    let started = false;
    const events = ["pointerdown", "touchstart", "keydown", "click", "scroll"];

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, onFirstGesture));
    };

    const tryPlay = () => {
      if (started) return;
      el
        .play()
        .then(() => {
          started = true;
          cleanup();
        })
        .catch(() => {
          /* bloqueado: esperamos el primer gesto del usuario */
        });
    };

    const onFirstGesture = (e: Event) => {
      // Si tocó el propio botón de música, deja que el botón lo maneje.
      const target = e.target as Element | null;
      if (target?.closest?.("[data-music-button]")) {
        cleanup();
        return;
      }
      tryPlay();
    };

    // 1) intento inmediato
    tryPlay();
    // 2) escuchar el primer gesto
    events.forEach((e) =>
      window.addEventListener(e, onFirstGesture, { passive: true })
    );

    return cleanup;
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (el.paused) {
        await el.play();
      } else {
        el.pause();
      }
    } catch (err) {
      console.error("No se pudo reproducir la música:", err);
    }
  };

  if (!available) return null;

  return (
    <>
      {/* Elemento <audio> real: más fiable en móvil/iOS que new Audio() */}
      <audio
        ref={audioRef}
        src={content.music.src}
        loop
        preload="auto"
        onError={() => setAvailable(false)}
      />

      <button
        type="button"
        data-music-button
        onClick={toggle}
        aria-label={playing ? content.music.pauseLabel : content.music.playLabel}
        aria-pressed={playing}
        className="fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-plum-soft/40 text-gold-soft backdrop-blur-md transition-colors hover:bg-plum-soft/70"
      >
        {playing ? (
          <Music className="h-5 w-5 animate-pulse" aria-hidden="true" />
        ) : (
          <VolumeX className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

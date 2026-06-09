"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { content } from "@/config/content";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  // Si la pestaña se oculta, sincronizamos el estado del botón.
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

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (el.paused) {
        await el.play(); // debe llamarse dentro del gesto del usuario (móvil/iOS)
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

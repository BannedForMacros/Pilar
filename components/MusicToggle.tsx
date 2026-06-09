"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { content } from "@/config/content";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(content.music.src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const el = audioRef.current;
    const onError = () => setAvailable(false);
    el.addEventListener("error", onError);

    return () => {
      el.removeEventListener("error", onError);
      el.pause();
    };
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  if (!available) return null;

  return (
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
  );
}

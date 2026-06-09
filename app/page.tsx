import Hero from "@/components/Hero";
import AnimatedMessage from "@/components/AnimatedMessage";
import Reasons from "@/components/Reasons";
import FinalQuestion from "@/components/FinalQuestion";
import MusicToggle from "@/components/MusicToggle";
import Background from "@/components/Background";
import ScrollProgress from "@/components/ScrollProgress";

export default function Page() {
  return (
    <main className="relative isolate overflow-hidden">
      {/* Fondo con parallax ligado al scroll */}
      <Background />

      <ScrollProgress />
      <MusicToggle />

      <Hero />
      <AnimatedMessage />
      <Reasons />
      <FinalQuestion />

      <footer className="pb-10 pt-6 text-center text-xs text-rosa-soft/40">
        Hecho con cuidado, solo para ti.
      </footer>
    </main>
  );
}

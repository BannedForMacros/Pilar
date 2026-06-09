import Hero from "@/components/Hero";
import AnimatedMessage from "@/components/AnimatedMessage";
import Reasons from "@/components/Reasons";
import FinalQuestion from "@/components/FinalQuestion";
import MusicToggle from "@/components/MusicToggle";
import Starfield from "@/components/Starfield";

export default function Page() {
  return (
    <main className="relative isolate overflow-hidden">
      {/* Fondo: gradiente atardecer/noche + partículas */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background:
              "linear-gradient(160deg, #2a1228 0%, #3b1d3a 35%, #5a2e57 60%, #8a4a5e 80%, #c97b9b 100%)",
            backgroundSize: "200% 200%",
          }}
        />
        {/* Resplandor cálido tipo sol poniente */}
        <div
          className="absolute -bottom-40 left-1/2 h-[60vh] w-[120vw] -translate-x-1/2 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(230,192,104,0.55), rgba(201,123,155,0.15), transparent)",
          }}
        />
        <Starfield />
      </div>

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

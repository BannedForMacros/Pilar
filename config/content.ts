/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENIDO EDITABLE
 *  Todo el texto personalizable vive aquí. Cambia lo que quieras
 *  sin tocar los componentes.
 * ─────────────────────────────────────────────────────────────
 */

// Íconos permitidos (solo lucide-react). Agrega aquí si necesitas más.
export type ReasonIcon = "Sparkles" | "Smile" | "Star" | "Heart";

export interface Reason {
  icon: ReasonIcon;
  title: string;
  text: string;
}

export const content = {
  /** Nombre que aparece en grande en el hero. */
  name: "Arely",

  /** Frase corta bajo el nombre. */
  tagline: "Para ti, que lo vuelves todo mejor",

  /** Mensaje principal con efecto de aparición secuencial. */
  message: [
    "Hay personas que llegan",
    "y, sin avisar,",
    "se vuelven el lugar al que uno quiere regresar.",
    "Tú eres ese lugar.",
  ],

  /** Sección "Razones": tarjetas interactivas con flip al hover/tap. */
  reasonsHeading: "Algunas razones, entre miles",
  reasons: [
    {
      icon: "Sparkles",
      title: "Tu rostro",
      text:
        "Tu rostro es mi lugar favorito del mundo. Han pasado los años y te sigo mirando con el mismo asombro del primer día.",
    },
    {
      icon: "Smile",
      title: "Tu sonrisa",
      text:
        "Tu sonrisa me desordena el día entero y lo vuelve mejor. Podría perseguirla toda la vida.",
    },
    {
      icon: "Star",
      title: "Tus lunares",
      text:
        "Amo cada uno de tus lunares, como si fueran un mapa hecho solo para que yo me pierda en ti.",
    },
    {
      icon: "Heart",
      title: "Tu tiempo",
      text:
        "A tu lado el tiempo se porta raro: las horas vuelan y aun así no me alcanzan. Contigo todo es mejor.",
    },
  ] as Reason[],

  /** Momento interactivo final. */
  finalQuestion: {
    prompt: "¿Me das la oportunidad de secuestrarte por 4 horas, solo para mí?",
    yesLabel: "Sí",
    noLabel: "No",
    /** Mensaje dulce que aparece tras decir "Sí". */
    successHeading: "Lo sabía. 4 horas no me alcanzan,",
    successMessage:
      "pero las quiero todas: tu risa, tus historias, tus silencios y esa forma tuya de hacer que el mundo se porte bien. Prepárate, porque pienso convertir cada minuto en un buen recuerdo.",
  },

  /** Música de fondo (toggle). Coloca tu archivo en /public/music/song.mp3 */
  music: {
    src: "/music/song.mp3",
    playLabel: "Reproducir música",
    pauseLabel: "Pausar música",
  },
} as const;

export type SiteContent = typeof content;

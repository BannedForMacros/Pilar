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
        "Tu rostro es mi lugar favorito del mundo. Pasan los años y te sigo mirando con el mismo asombro del primer día, como si cada vez te conociera de nuevo.",
    },
    {
      icon: "Smile",
      title: "Tu sonrisa",
      text:
        "Tu sonrisa lo ilumina todo y me alegra el día sin que te des cuenta. Es eso tan bonito que querría ver cada mañana por el resto de mi vida.",
    },
    {
      icon: "Star",
      title: "Tus lunares",
      text:
        "Amo cada uno de tus lunares. Son pequeñas estrellas en tu piel, un mapa hecho a mano para que yo me pierda en ti y nunca quiera volver.",
    },
    {
      icon: "Heart",
      title: "Nuestro tiempo",
      text:
        "Contigo el tiempo se vuelve mágico: las horas se pasan volando y aun así nunca me alcanzan. Siempre, siempre quiero un ratito más a tu lado.",
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

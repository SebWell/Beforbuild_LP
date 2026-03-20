export const COLORS = {
  bg: "#FFFFFF",
  bgSoft: "#F8F9FA",
  bgCard: "#FFFFFF",
  border: "#E5E7EB",
  borderLight: "#F0F0F0",
  text: "#111111",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  brand: "#178459",
  brandDark: "#14694c",
  brandLight: "#e8f9f2",
  brandBg: "#F0FBF6",
};

export const MODULE_SLIDE_DURATION = 125;

export const SCENE_DURATIONS = {
  logoReveal: 60, // 2s
  hook: 90, // 3s
  modules: MODULE_SLIDE_DURATION * 12, // 1500 frames = 50s
} as const;

export const FPS = 30;

export const MODULES = [
  {
    name: "Foncier",
    subtitle: "Prospection & acquisition",
    subtitle2: "Enrichissement automatique & suivi CS",
  },
  {
    name: "Bilan",
    subtitle: "Suivi financier & simulations",
    subtitle2: "Trésorerie prévisionnelle & calcul de marge",
  },
  {
    name: "Contrats",
    subtitle: "Gestion contractuelle & signatures",
    subtitle2: "Phases MOE & signatures électroniques",
  },
  {
    name: "Planning",
    subtitle: "Planification Gantt & jalons",
    subtitle2: "Jalons & matrice des missions",
  },
  {
    name: "Documents",
    subtitle: "GED intelligente & IA",
    subtitle2: "OCR automatique & indexation IA",
  },
  {
    name: "Commercial",
    subtitle: "CRM & réservations VEFA",
    subtitle2: "Pipeline contacts & suivi réservations",
  },
] as const;

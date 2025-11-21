export interface Theme {
  backgroundColor: string;
  component: {
    fill: string;
    stroke: string;
    textColor: string;
  }
  wire: {
    stroke: string;
    strokeWidth: number;
  }
}

export const lightTheme: Theme = {
  backgroundColor: "#ffffff",
  component: {
    fill: "#f0f0f0",
    stroke: "#000000",
    textColor: "#000000",
  },
  wire: {
    stroke: "#000000",
    strokeWidth: 2,
  }
};

const tokyonightNightPalette = {
  red: "#f7768e",
  orange: "#ff9e64",
  yellow: "#e0af68",
  creme: "#cfc9c2",
  green: "#9ece6a",
  cyan: "#73daca",
  aqua: "#b4f9f8",
  blue: "#7dcfff",
  navy: "#7aa2f7",
  purple: "#bb9af7",
  gray100: "#c0caf5",
  gray200: "#a9b1d6",
  gray300: "#9aa5ce",
  gray400: "#565f89",
  gray500: "#414868",
  gray600: "#24283b",
  gray700: "#1a1b26",
} as const;

export const tokyonightNightTheme: Theme = {
  backgroundColor: tokyonightNightPalette.gray700,
  component: {
    fill: tokyonightNightPalette.gray600,
    stroke: tokyonightNightPalette.gray400,
    textColor: tokyonightNightPalette.gray100,
  },
  wire: {
    stroke: tokyonightNightPalette.purple,
    strokeWidth: 4,
  }
};
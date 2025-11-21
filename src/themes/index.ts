export interface Theme {
  backgroundColor: string;
  component: {
    fill: string;
    stroke: string;
    textColor: string;
  }
  wire: {
    fill: string;
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
    fill: "#000000",
    stroke: "#000000",
    strokeWidth: 2,
  }
};

// Tokyo Night (core palette) — JS object
const tokyonightPalette = {
  // UI backgrounds / foregrounds
  bg: "#0f1724",        // (dark base - typical in Tokyonight variants; use your chosen variant)
  bgPanel: "#202330",   // used for inactive list backgrounds / panels (seen in customization examples). :contentReference[oaicite:6]{index=6}
  fg: "#959cbd",        // normal (dim) foreground. :contentReference[oaicite:7]{index=7}
  fgBright: "#bdc7f0",  // brighter/active foreground. :contentReference[oaicite:8]{index=8}

  // Accents / syntax
  purple: "#bb9af7",    // purple / type / accent. :contentReference[oaicite:9]{index=9}
  cyan: "#73daca",      // cyan / aqua accents. :contentReference[oaicite:10]{index=10}
  gold: "#e0af68",      // gold / orange accents (docs/constants). :contentReference[oaicite:11]{index=11}

  // Optional helpers (map to typical semantic roles)
  keyword: "#bb9af7",   // reuse purple for keywords
  function: "#73daca",  // reuse cyan for functions
  string: "#e0af68",    // reuse gold/orange for strings/constants

  black: "#000000",
  white: "#ffffff"
} as const;

export const tokyoNightTheme: Theme = {
  backgroundColor: tokyonightPalette.bg,
  component: {
    fill: tokyonightPalette.bgPanel,
    stroke: tokyonightPalette.fgBright,
    textColor: tokyonightPalette.fgBright,
  },
  wire: {
    fill: tokyonightPalette.cyan,
    stroke: tokyonightPalette.cyan,
    strokeWidth: 2,
  }
};
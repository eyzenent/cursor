import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

/**
 * Inter + latin-ext — solid Turkish glyph coverage.
 * Avoid display fonts (Archivo Black etc.) that miss İ/Ş/Ğ.
 */
const inter = loadInter("normal", {
  weights: ["700", "800", "900"],
  subsets: ["latin-ext", "latin"],
});

export const fonts = {
  display: inter.fontFamily,
  body: inter.fontFamily,
};

export const waitForFonts = () => inter.waitUntilDone();

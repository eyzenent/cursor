import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadSpace } from "@remotion/google-fonts/SpaceGrotesk";

const bebas = loadBebas("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const space = loadSpace("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fonts = {
  display: bebas.fontFamily,
  body: space.fontFamily,
};

export const colors = {
  paper: "#F3F5F7",
  ink: "#111111",
  muted: "#5C6570",
  yellow: "#FFE600",
  dark: "#0B0D10",
  white: "#FAFBFC",
  accent: "#1F6FEB",
  soft: "#E2E7EC",
};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_FRAMES = 60 * FPS; // 1 minute

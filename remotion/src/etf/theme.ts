import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadSpace } from "@remotion/google-fonts/SpaceGrotesk";

const display = loadNewsreader("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const body = loadSpace("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fonts = {
  display: display.fontFamily,
  body: body.fontFamily,
};

export const colors = {
  bg: "#0A0F14",
  bgSoft: "#121A22",
  paper: "#E8EDF2",
  ink: "#0A0F14",
  cream: "#F3EFE6",
  muted: "#8B97A5",
  line: "#2A3644",
  amber: "#C9A227",
  teal: "#3D8B8B",
  white: "#F5F7FA",
  danger: "#B54A4A",
};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_FRAMES = 60 * FPS;

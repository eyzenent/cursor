import { loadFont } from "@remotion/google-fonts/ArchivoBlack";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const display = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const body = loadInter("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export const fonts = {
  display: display.fontFamily,
  body: body.fontFamily,
};

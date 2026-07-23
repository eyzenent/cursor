import "./index.css";
import { Composition, continueRender, delayRender } from "remotion";
import { useEffect, useState } from "react";
import { ETFExplainer } from "./ETFExplainer";
import { waitForFonts } from "./fonts";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender("Loading Inter fonts"));

  useEffect(() => {
    waitForFonts()
      .then(() => continueRender(handle))
      .catch((err) => {
        console.error("Font load failed", err);
        continueRender(handle);
      });
  }, [handle]);

  return (
    <>
      <Composition
        id="ETFExplainer"
        component={ETFExplainer}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};

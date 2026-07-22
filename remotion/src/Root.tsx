import "./index.css";
import { Composition } from "remotion";
import { EtfReel } from "./etf/EtfReel";
import { DURATION_FRAMES, FPS, HEIGHT, WIDTH } from "./etf/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EtfReels"
        component={EtfReel}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};

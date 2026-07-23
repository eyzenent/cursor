import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SAFE } from "./motion";
import { springPop } from "../theme";

type BrandLogoProps = {
  width?: number;
  delay?: number;
  opacity?: number;
};

/**
 * EYVAZCO brand mark — white lion + wordmark.
 * mix-blend-mode:screen drops the black plate on dark scenes.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  width = 420,
  delay = 0,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: springPop,
  });

  return (
    <div
      style={{
        width,
        opacity: interpolate(t, [0, 1], [0, opacity], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        transform: `translateY(${interpolate(t, [0, 1], [16, 0])}px)`,
        mixBlendMode: "screen",
      }}
    >
      <Img
        src={staticFile("brand/eyvazco-logo.png")}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

/** Bottom-center watermark — clear of Reels top chrome */
export const BrandWatermark: React.FC<{ opacity?: number }> = ({
  opacity = 0.5,
}) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 10], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: SAFE.bottom - 40,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 40,
        pointerEvents: "none",
        opacity: fade,
        mixBlendMode: "screen",
      }}
    >
      <Img
        src={staticFile("brand/eyvazco-logo.png")}
        style={{ width: 220, height: "auto", display: "block" }}
      />
    </div>
  );
};

import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  SCENE_ORDER,
  SCENE_STARTS,
  TOTAL_FRAMES,
  colors,
} from "../theme";
import { SAFE } from "./motion";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL_FRAMES;
  const marks = SCENE_ORDER.slice(1).map((id) => SCENE_STARTS[id] / TOTAL_FRAMES);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 50 }}>
      <div
        style={{
          position: "absolute",
          left: SAFE.side,
          right: SAFE.side,
          bottom: 110,
          height: 6,
          backgroundColor: "#ffffff18",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
            backgroundColor: colors.yellow,
            borderRadius: 99,
          }}
        />
      </div>
      {marks.map((m, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `calc(${SAFE.side}px + (100% - ${SAFE.side * 2}px) * ${m})`,
            bottom: 108,
            width: 2,
            height: 10,
            backgroundColor: "#ffffff44",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

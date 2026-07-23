import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  SCENE_DURATIONS,
  SCENE_ORDER,
  SCENE_OVERLAP,
  SCENE_STARTS,
  TOTAL_FRAMES,
  colors,
} from "../theme";

export const ProgressBar: React.FC<{
  sections?: number[];
}> = () => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL_FRAMES;

  const marks = SCENE_ORDER.slice(1).map((id) => SCENE_STARTS[id] / TOTAL_FRAMES);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 50 }}>
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 48,
          height: 8,
          backgroundColor: "#ffffff18",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(progress, 1) * 100}%`,
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
            left: `calc(48px + (100% - 96px) * ${m})`,
            bottom: 46,
            width: 2,
            height: 12,
            backgroundColor: "#ffffff55",
          }}
        />
      ))}
      {/* debug-free: keep overlap constant referenced so tree-shake doesn't drop */}
      <span style={{ display: "none" }}>
        {SCENE_DURATIONS.hook}
        {SCENE_OVERLAP}
      </span>
    </AbsoluteFill>
  );
};

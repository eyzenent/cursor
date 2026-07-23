import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { TOTAL_FRAMES } from "../theme";

export const ProgressBar: React.FC<{
  sections?: number[];
}> = ({ sections }) => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL_FRAMES;

  let cursor = 0;
  const marks =
    sections?.map((len) => {
      cursor += len;
      return cursor / TOTAL_FRAMES;
    }) ?? [];

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 56,
          height: 8,
          backgroundColor: "#ffffff18",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            backgroundColor: colors.yellow,
            borderRadius: 99,
          }}
        />
      </div>
      {marks.slice(0, -1).map((m, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `calc(48px + (100% - 96px) * ${m})`,
            bottom: 54,
            width: 2,
            height: 12,
            backgroundColor: "#ffffff44",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

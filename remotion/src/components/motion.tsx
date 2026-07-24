import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/** Instagram Reels safe padding */
export const SAFE = {
  top: 280,
  bottom: 220,
  side: 52,
} as const;

export const idleY = (frame: number, amp = 2, speed = 12) =>
  Math.sin(frame / speed) * amp;

export const idleX = (frame: number, amp = 2, speed = 14) =>
  Math.cos(frame / speed) * amp;

export const idleR = (frame: number, amp = 1.2, speed = 16) =>
  Math.sin(frame / speed) * amp;

/** Continuous Ken Burns on decorative / photo layers only — never wrap text */
export const CameraZoom: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  from?: number;
  to?: number;
  panX?: number;
  panY?: number;
}> = ({
  children,
  durationInFrames,
  from = 1,
  to = 1.08,
  panX = 0,
  panY = 0,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, durationInFrames], [0, panX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, durationInFrames], [0, panY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${x}px, ${y}px)`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const SafeStage: React.FC<{
  children: React.ReactNode;
  justify?: "center" | "flex-start" | "flex-end" | "space-between";
  style?: React.CSSProperties;
}> = ({ children, justify = "center", style }) => (
  <AbsoluteFill
    style={{
      paddingTop: SAFE.top,
      paddingBottom: SAFE.bottom,
      paddingLeft: SAFE.side,
      paddingRight: SAFE.side,
      display: "flex",
      flexDirection: "column",
      justifyContent: justify,
      zIndex: 2,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const FloatingBlocks: React.FC<{
  count?: number;
  seed?: number;
}> = ({ count = 7, seed = 0 }) => {
  const frame = useCurrentFrame();
  const blocks = Array.from({ length: count }, (_, i) => {
    const x = ((i * 137 + seed * 40) % 86) + 7;
    const y = ((i * 89 + seed * 25) % 78) + 12;
    const size = 36 + ((i * 23) % 64);
    const color =
      i % 3 === 0 ? colors.yellow : i % 3 === 1 ? colors.teal : colors.red;
    return { x, y, size, color, i };
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {blocks.map((b) => (
        <div
          key={b.i}
          style={{
            position: "absolute",
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            opacity: 0.14,
            borderRadius: 10,
            transform: `translate(${idleX(frame + b.i * 7, 16, 18)}px, ${idleY(frame + b.i * 5, 18, 15)}px) rotate(${idleR(frame + b.i * 3, 8, 20)}deg)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const MovingGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const y = -((frame * 1.2) % 72);
  const x = (frame * 0.5) % 72;

  return (
    <AbsoluteFill
      style={{
        opacity: 0.12,
        backgroundImage: `linear-gradient(${colors.white} 1px, transparent 1px), linear-gradient(90deg, ${colors.white} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        transform: `translate(${x}px, ${y}px) scale(1.3)`,
        pointerEvents: "none",
      }}
    />
  );
};

export const SweepLines: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 6 }).map((_, i) => {
        const y = ((frame * 2.8 + i * 170) % 2200) - 100;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: y,
              height: 2,
              backgroundColor: i % 2 === 0 ? colors.yellow : colors.teal,
              opacity: 0.14,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Soft exit for overlapping scene handoff */
export const SceneExit: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  exitFrames?: number;
}> = ({ children, durationInFrames, exitFrames = 16 }) => {
  const frame = useCurrentFrame();
  const start = Math.max(0, durationInFrames - exitFrames);
  const opacity = interpolate(frame, [start, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [start, durationInFrames], [0, -28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity, transform: `translateY(${y}px)` }}>
      {children}
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/** Instagram Reels safe padding — keep clear of username / CTA chrome */
export const SAFE = {
  top: 300,
  bottom: 240,
  side: 56,
} as const;

export const idleY = (frame: number, amp = 2, speed = 12) =>
  Math.sin(frame / speed) * amp;

export const idleX = (frame: number, amp = 2, speed = 14) =>
  Math.cos(frame / speed) * amp;

export const idleR = (frame: number, amp = 1.2, speed = 16) =>
  Math.sin(frame / speed) * amp;

/** Zoom ONLY decorative backgrounds — never wrap text */
export const CameraZoom: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  from?: number;
  to?: number;
}> = ({ children, durationInFrames, from = 1, to = 1.06 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ scale, transformOrigin: "center center" }}>
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
            opacity: 0.1,
            borderRadius: 10,
            translate: `${idleX(frame + b.i * 7, 14, 20)}px ${idleY(frame + b.i * 5, 16, 16)}px`,
            rotate: `${idleR(frame + b.i * 3, 6, 22)}deg`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const MovingGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const y = -((frame * 1.1) % 72);
  const x = (frame * 0.45) % 72;

  return (
    <AbsoluteFill
      style={{
        opacity: 0.1,
        backgroundImage: `linear-gradient(${colors.white} 1px, transparent 1px), linear-gradient(90deg, ${colors.white} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        translate: `${x}px ${y}px`,
        scale: 1.25,
        pointerEvents: "none",
      }}
    />
  );
};

export const SweepLines: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const y = ((frame * 2.4 + i * 180) % 2100) - 80;
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
              opacity: 0.12,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

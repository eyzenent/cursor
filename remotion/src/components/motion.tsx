import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

/** Continuous idle wobble — apply to every resting object */
export const idleY = (frame: number, amp = 2, speed = 10) =>
  Math.sin(frame / speed) * amp;

export const idleX = (frame: number, amp = 2, speed = 12) =>
  Math.cos(frame / speed) * amp;

export const idleR = (frame: number, amp = 1.5, speed = 14) =>
  Math.sin(frame / speed) * amp;

/** Slow Ken Burns zoom on a background layer (1 → 1.08 across scene) */
export const CameraZoom: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  from?: number;
  to?: number;
}> = ({ children, durationInFrames, from = 1, to = 1.08 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftX = interpolate(frame, [0, durationInFrames], [0, -18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ scale, translate: `${driftX}px 0px` }}>
      {children}
    </AbsoluteFill>
  );
};

/** Mid/foreground layer that moves opposite to camera (parallax) */
export const ParallaxFg: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  style?: React.CSSProperties;
}> = ({ children, durationInFrames, style }) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, durationInFrames], [12, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ translate: `0px ${y}px`, width: "100%", ...style }}>
      {children}
    </div>
  );
};

export const FloatingBlocks: React.FC<{
  count?: number;
  seed?: number;
}> = ({ count = 8, seed = 0 }) => {
  const frame = useCurrentFrame();
  const blocks = Array.from({ length: count }, (_, i) => {
    const x = ((i * 137 + seed * 40) % 90) + 5;
    const y = ((i * 89 + seed * 25) % 85) + 5;
    const size = 40 + ((i * 23) % 80);
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
            opacity: 0.12,
            borderRadius: 10,
            translate: `${idleX(frame + b.i * 7, 18, 18)}px ${idleY(frame + b.i * 5, 22, 14)}px`,
            rotate: `${idleR(frame + b.i * 3, 8, 20)}deg`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const MovingGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const y = -((frame * 1.4) % 72);
  const x = (frame * 0.6) % 72;

  return (
    <AbsoluteFill
      style={{
        opacity: 0.14,
        backgroundImage: `linear-gradient(${colors.white} 1px, transparent 1px), linear-gradient(90deg, ${colors.white} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        translate: `${x}px ${y}px`,
        scale: 1.3,
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
        const y = ((frame * 3 + i * 160) % 2100) - 100;
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
              opacity: 0.18,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

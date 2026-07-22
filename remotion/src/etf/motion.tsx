import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "./theme";
import { clamp, out, pop } from "./ui";

/** Endless scrolling market tape — always in motion */
export const TickerTape: React.FC<{
  top?: number;
  dark?: boolean;
  speed?: number;
}> = ({ top = 90, dark, speed = 2.2 }) => {
  const frame = useCurrentFrame();
  const items = [
    "SPY",
    "QQQ",
    "VTI",
    "IWM",
    "EFA",
    "BND",
    "GLD",
    "XLF",
    "XLK",
    "ARKK",
    "VOO",
    "VXUS",
  ];
  const row = [...items, ...items, ...items].join("   ·   ");
  const x = -((frame * speed) % 900);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontFamily: fonts.body,
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: "0.08em",
        color: dark ? colors.yellow : colors.ink,
        opacity: dark ? 0.55 : 0.28,
        padding: "10px 0",
        borderTop: `1px solid ${dark ? "#ffffff22" : "#11111118"}`,
        borderBottom: `1px solid ${dark ? "#ffffff22" : "#11111118"}`,
      }}
    >
      <div style={{ translate: `${x}px 0px`, width: 4000 }}>{row}</div>
    </div>
  );
};

/** Animated progress line at bottom of reel */
export const ProgressRail: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = frame / durationInFrames;

  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        right: 64,
        bottom: 48,
        height: 6,
        borderRadius: 99,
        backgroundColor: "#11111118",
        overflow: "hidden",
        zIndex: 20,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${p * 100}%`,
          backgroundColor: colors.yellow,
          borderRadius: 99,
        }}
      />
    </div>
  );
};

/** Pulsing ring used for emphasis beats */
export const PulseRing: React.FC<{
  delay?: number;
  x?: number;
  y?: number;
  color?: string;
}> = ({ delay = 0, x = 540, y = 960, color = colors.yellow }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const cycle = local % 40;
  const p = interpolate(cycle, [0, 40], [0, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 80,
        top: y - 80,
        width: 160,
        height: 160,
        borderRadius: "50%",
        border: `6px solid ${color}`,
        opacity: interpolate(p, [0, 0.2, 1], [0.7, 0.45, 0]),
        scale: interpolate(p, [0, 1], [0.4, 2.2]),
        pointerEvents: "none",
      }}
    />
  );
};

/** Sliding highlight that sweeps across a row */
export const SweepLight: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 35], [-20, 120], {
    ...clamp,
    easing: out,
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "28%",
          left: `${p}%`,
          background:
            "linear-gradient(90deg, transparent, rgba(255,230,0,0.22), transparent)",
          transform: "skewY(-8deg)",
        }}
      />
    </AbsoluteFill>
  );
};

export const FlipCard: React.FC<{
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay, children, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 16], [0, 1], {
    ...clamp,
    easing: pop,
  });

  return (
    <div
      style={{
        opacity: p,
        rotate: `${interpolate(p, [0, 1], [90, 0])}deg`,
        scale: interpolate(p, [0, 1], [0.5, 1]),
        transformOrigin: "center bottom",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

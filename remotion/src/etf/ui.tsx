import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors, fonts } from "./theme";

export const out = Easing.bezier(0.16, 1, 0.3, 1);
export const pop = Easing.bezier(0.34, 1.56, 0.64, 1);
export const soft = Easing.bezier(0.45, 0, 0.55, 1);

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const SceneShell: React.FC<{
  children: React.ReactNode;
  bg?: string;
}> = ({ children, bg = colors.paper }) => {
  const frame = useCurrentFrame();
  const cam = interpolate(frame, [0, 120], [1.08, 1], {
    ...clamp,
    easing: soft,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      <MovingGrid dark={bg === colors.dark} />
      <AbsoluteFill
        style={{
          scale: cam,
          color: bg === colors.dark ? colors.white : colors.ink,
          fontFamily: fonts.body,
          justifyContent: "center",
          alignItems: "center",
          padding: "160px 64px",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const MovingGrid: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 180], [0, -80]);
  const x = interpolate(frame, [0, 180], [0, 40]);

  return (
    <AbsoluteFill
      style={{
        opacity: dark ? 0.18 : 0.12,
        backgroundImage: `linear-gradient(${dark ? "#fff" : "#111"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "#fff" : "#111"} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        translate: `${x}px ${y}px`,
        scale: 1.25,
      }}
    />
  );
};

export const WordLine: React.FC<{
  words: string[];
  delay?: number;
  size?: number;
  color?: string;
  stagger?: number;
  align?: "left" | "center";
}> = ({
  words,
  delay = 0,
  size = 96,
  color,
  stagger = 4,
  align = "left",
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: "0 18px",
        width: "100%",
        fontFamily: fonts.display,
        fontSize: size,
        lineHeight: 0.95,
        letterSpacing: "0.02em",
        color,
      }}
    >
      {words.map((word, i) => {
        const start = delay + i * stagger;
        const p = interpolate(frame, [start, start + 14], [0, 1], {
          ...clamp,
          easing: pop,
        });
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: p,
              translate: `0px ${interpolate(p, [0, 1], [70, 0])}px`,
              rotate: `${interpolate(p, [0, 1], [8, 0])}deg`,
              scale: interpolate(p, [0, 1], [0.7, 1]),
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export const SlamBlock: React.FC<{
  children: React.ReactNode;
  delay?: number;
  from?: "left" | "right" | "bottom" | "top";
  style?: React.CSSProperties;
}> = ({ children, delay = 0, from = "bottom", style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 16], [0, 1], {
    ...clamp,
    easing: pop,
  });

  const map = {
    left: [`${interpolate(p, [0, 1], [-120, 0])}px 0px`, 1],
    right: [`${interpolate(p, [0, 1], [120, 0])}px 0px`, 1],
    bottom: [`0px ${interpolate(p, [0, 1], [90, 0])}px`, 1],
    top: [`0px ${interpolate(p, [0, 1], [-90, 0])}px`, 1],
  } as const;

  return (
    <div
      style={{
        opacity: p,
        translate: map[from][0],
        scale: interpolate(p, [0, 1], [0.85, 1]),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const DrawBar: React.FC<{
  delay?: number;
  width?: number | string;
  color?: string;
  height?: number;
}> = ({ delay = 0, width = "100%", color = colors.yellow, height = 18 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 18], [0, 1], {
    ...clamp,
    easing: out,
  });

  return (
    <div
      style={{
        height,
        width,
        backgroundColor: color,
        transformOrigin: "left center",
        scale: `${p} 1`,
        marginTop: 18,
        borderRadius: 4,
      }}
    />
  );
};

export const CountUp: React.FC<{
  to: number;
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  size?: number;
  color?: string;
}> = ({
  to,
  delay = 0,
  duration = 28,
  prefix = "",
  suffix = "",
  decimals = 0,
  size = 110,
  color,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + duration], [0, 1], {
    ...clamp,
    easing: out,
  });
  const value = to * p;

  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        lineHeight: 1,
        color,
      }}
    >
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value)}
      {suffix}
    </div>
  );
};

export const Label: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: out });

  return (
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: dark ? colors.yellow : colors.ink,
        opacity: p * (dark ? 1 : 0.55),
        translate: `0px ${interpolate(p, [0, 1], [-20, 0])}px`,
        marginBottom: 24,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export const FloatingOrbs: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const frame = useCurrentFrame();
  const orbs = [
    { x: 120, y: 280, s: 180, d: 0 },
    { x: 760, y: 1400, s: 240, d: 10 },
    { x: 820, y: 420, s: 120, d: 20 },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {orbs.map((o, i) => {
        const driftY = Math.sin((frame + o.d) / 28) * 24;
        const driftX = Math.cos((frame + o.d) / 36) * 16;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: o.x,
              top: o.y,
              width: o.s,
              height: o.s,
              borderRadius: "50%",
              backgroundColor: dark ? colors.yellow : colors.accent,
              opacity: dark ? 0.12 : 0.08,
              filter: "blur(2px)",
              translate: `${driftX}px ${driftY}px`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

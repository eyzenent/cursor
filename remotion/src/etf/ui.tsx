import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors, fonts } from "./theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const SceneShell: React.FC<{
  children: React.ReactNode;
  bg?: string;
  padded?: boolean;
}> = ({ children, bg = colors.paper, padded = true }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        color: bg === colors.dark ? colors.white : colors.ink,
        fontFamily: fonts.body,
        justifyContent: "center",
        alignItems: "center",
        padding: padded ? "180px 72px" : 0,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 18, style }) => {
  const frame = useCurrentFrame();
  const t = frame - delay;

  return (
    <div
      style={{
        opacity: interpolate(t, [0, duration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        }),
        translate: `0px ${interpolate(t, [0, duration], [36, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        })}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const HighlightBar: React.FC<{
  delay?: number;
  width?: number | string;
  color?: string;
}> = ({ delay = 0, width = "100%", color = colors.yellow }) => {
  const frame = useCurrentFrame();
  const t = frame - delay;

  return (
    <div
      style={{
        height: 18,
        width,
        backgroundColor: color,
        transformOrigin: "left center",
        scale: `${interpolate(t, [0, 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        })} 1`,
        marginTop: 16,
      }}
    />
  );
};

export const BigType: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  align?: "left" | "center";
}> = ({ children, size = 92, color, align = "left" }) => {
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        lineHeight: 0.95,
        letterSpacing: "0.02em",
        color,
        textAlign: align,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export const BodyType: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
}> = ({ children, size = 38, color = colors.muted, weight = 500 }) => {
  return (
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: size,
        lineHeight: 1.35,
        fontWeight: weight,
        color,
        width: "100%",
        marginTop: 28,
      }}
    >
      {children}
    </div>
  );
};

export const Label: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark,
}) => {
  return (
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: dark ? colors.yellow : colors.ink,
        opacity: dark ? 1 : 0.55,
        marginBottom: 28,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

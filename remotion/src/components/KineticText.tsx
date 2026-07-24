import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";
import { idleY } from "./motion";

type Dir = "left" | "right" | "bottom" | "top";

type KineticTextProps = {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  uppercase?: boolean;
  align?: "left" | "center" | "right";
  mode?: "word" | "char";
  from?: Dir;
  stagger?: number;
  maxWidth?: number | string;
  /** Keep drifting after entrance — never fully static */
  drift?: boolean;
};

const trUpper = (s: string) => s.toLocaleUpperCase("tr-TR");

const enterXY = (from: Dir, t: number): [number, number] => {
  const d = 1 - t;
  switch (from) {
    case "left":
      return [-40 * d, 0];
    case "right":
      return [40 * d, 0];
    case "top":
      return [0, -32 * d];
    default:
      return [0, 32 * d];
  }
};

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delay = 0,
  fontSize = 64,
  color = colors.white,
  uppercase = true,
  align = "left",
  mode = "word",
  from = "bottom",
  stagger,
  maxWidth = "100%",
  drift = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const source = uppercase ? trUpper(text) : text;
  const parts =
    mode === "word"
      ? source.split(/\s+/).filter(Boolean)
      : source.split("");
  const gap = stagger ?? (mode === "word" ? 2 : 1);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        columnGap: mode === "word" ? 12 : 0,
        rowGap: mode === "word" ? 4 : 0,
        width: "100%",
        maxWidth,
        fontFamily: fonts.display,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.12,
        letterSpacing: uppercase ? "-0.01em" : 0,
        color,
        transform: drift
          ? `translateY(${idleY(frame, 1.5, 16)}px)`
          : undefined,
      }}
    >
      {parts.map((part, i) => {
        const t = spring({
          frame: frame - delay - i * gap,
          fps,
          config: springPop,
        });
        const [x, y] = enterXY(from, t);
        const content = mode === "word" ? part : part === " " ? "\u00A0" : part;
        return (
          <span
            key={`${part}-${i}`}
            style={{
              display: "inline-block",
              opacity: interpolate(t, [0, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
};

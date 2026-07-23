import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";

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
};

/** Turkish-aware casing — CSS text-transform breaks i/İ */
const trUpper = (s: string) => s.toLocaleUpperCase("tr-TR");

const enterXY = (from: Dir, t: number): [number, number] => {
  const d = 1 - t;
  switch (from) {
    case "left":
      return [-36 * d, 0];
    case "right":
      return [36 * d, 0];
    case "top":
      return [0, -28 * d];
    default:
      return [0, 28 * d];
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
        letterSpacing: uppercase ? "-0.02em" : 0,
        color,
        // No CSS text-transform — casing handled in JS (tr-TR)
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
              // Opacity + translate only — scale causes glyph blur / ghosts
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

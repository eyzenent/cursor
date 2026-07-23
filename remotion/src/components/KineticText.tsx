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
  /** Start exiting after this many frames from delay (overlap-friendly) */
  exitAfter?: number;
  stagger?: number;
};

const fromOffset = (from: Dir, t: number) => {
  const d = interpolate(t, [0, 1], [1, 0]);
  switch (from) {
    case "left":
      return `${-90 * d}px ${20 * d}px`;
    case "right":
      return `${90 * d}px ${20 * d}px`;
    case "top":
      return `0px ${-70 * d}px`;
    default:
      return `0px ${70 * d}px`;
  }
};

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delay = 0,
  fontSize = 72,
  color = colors.white,
  uppercase = true,
  align = "left",
  mode = "word",
  from = "bottom",
  exitAfter,
  stagger,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const parts = mode === "word" ? text.split(" ") : text.split("");
  const gap = stagger ?? (mode === "word" ? 3 : 1);

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
        gap: mode === "word" ? "0 16px" : 0,
        width: "100%",
        fontFamily: fonts.display,
        fontSize,
        lineHeight: 1.05,
        letterSpacing: uppercase ? "0.02em" : 0,
        textTransform: uppercase ? "uppercase" : "none",
        color,
      }}
    >
      {parts.map((part, i) => {
        const local = frame - delay - i * gap;
        const enter = spring({
          frame: local,
          fps,
          config: springPop,
        });
        let exit = 0;
        if (exitAfter !== undefined) {
          exit = spring({
            frame: frame - (delay + exitAfter + i * 2),
            fps,
            config: { ...springPop, damping: 16 },
          });
        }
        const visible = Math.max(0, enter - exit);
        const content = mode === "word" ? part : part === " " ? "\u00A0" : part;
        const dirs: Dir[] = ["left", "bottom", "right", "top"];
        const wordFrom = dirs[i % dirs.length] ?? from;

        return (
          <span
            key={`${part}-${i}`}
            style={{
              display: "inline-block",
              opacity: visible,
              scale: interpolate(visible, [0, 1], [0.5, 1]),
              translate: fromOffset(wordFrom, visible),
              rotate: `${interpolate(visible, [0, 1], [wordFrom === "left" ? -12 : 8, 0])}deg`,
            }}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
};

import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";

type KineticTextProps = {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  uppercase?: boolean;
  align?: "left" | "center";
  mode?: "word" | "char";
};

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delay = 0,
  fontSize = 72,
  color = colors.white,
  uppercase = true,
  align = "left",
  mode = "word",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const parts = mode === "word" ? text.split(" ") : text.split("");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
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
        const t = spring({
          frame: frame - delay - i * (mode === "word" ? 3 : 1),
          fps,
          config: springPop,
        });
        const content = mode === "word" ? part : part === " " ? "\u00A0" : part;
        return (
          <span
            key={`${part}-${i}`}
            style={{
              display: "inline-block",
              opacity: interpolate(t, [0, 1], [0, 1]),
              scale: interpolate(t, [0, 1], [0.55, 1]),
              translate: `0px ${interpolate(t, [0, 1], [40, 0])}px`,
            }}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
};

import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";

type HighlightBoxProps = {
  text: string;
  delay?: number;
  bg?: string;
  color?: string;
  fontSize?: number;
  uppercase?: boolean;
};

export const HighlightBox: React.FC<HighlightBoxProps> = ({
  text,
  delay = 0,
  bg = colors.yellow,
  color = colors.bg,
  fontSize = 34,
  uppercase = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: springPop,
  });
  const label = uppercase ? text.toLocaleUpperCase("tr-TR") : text;

  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: bg,
        color,
        fontFamily: fonts.display,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.2,
        padding: "12px 18px",
        borderRadius: 12,
        opacity: interpolate(t, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        transform: `translateY(${interpolate(t, [0, 1], [12, 0])}px)`,
      }}
    >
      {label}
    </div>
  );
};

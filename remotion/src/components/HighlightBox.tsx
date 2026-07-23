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
};

export const HighlightBox: React.FC<HighlightBoxProps> = ({
  text,
  delay = 0,
  bg = colors.yellow,
  color = colors.bg,
  fontSize = 42,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: springPop,
  });

  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: bg,
        color,
        fontFamily: fonts.display,
        fontSize,
        lineHeight: 1.1,
        textTransform: "uppercase",
        padding: "14px 22px",
        borderRadius: 10,
        opacity: t,
        scale: interpolate(t, [0, 1], [0.7, 1]),
        rotate: `${interpolate(t, [0, 1], [-6, 0])}deg`,
      }}
    >
      {text}
    </div>
  );
};

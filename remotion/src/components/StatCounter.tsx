import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";
import { idleY } from "./motion";

type StatCounterProps = {
  to: number;
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  fontSize?: number;
  color?: string;
};

export const StatCounter: React.FC<StatCounterProps> = ({
  to,
  delay = 0,
  duration = 28,
  prefix = "",
  suffix = "",
  decimals = 0,
  fontSize = 84,
  color = colors.yellow,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: springPop,
  });
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const value = to * progress;

  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.05,
        color,
        opacity: interpolate(enter, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        transform: `translateY(${interpolate(enter, [0, 1], [10, 0]) + idleY(frame, 1.5, 15)}px)`,
      }}
    >
      {prefix}
      {decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString("tr-TR")}
      {suffix}
    </div>
  );
};

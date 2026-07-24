import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, springPop } from "../theme";
import { idleY } from "./motion";

type FramedPhotoProps = {
  src: string;
  delay?: number;
  width?: number;
  height?: number;
  tint?: string;
  /** polaroid | phone | cutout */
  variant?: "polaroid" | "phone" | "cutout";
  rotate?: number;
};

/**
 * Small framed/masked photo — Vox "real example" inset treatment.
 */
export const FramedPhoto: React.FC<FramedPhotoProps> = ({
  src,
  delay = 0,
  width = 420,
  height = 560,
  tint = colors.yellow,
  variant = "polaroid",
  rotate = -4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: springPop });

  const framePad =
    variant === "polaroid" ? "16px 16px 48px 16px" : variant === "phone" ? "18px 14px" : "0";
  const radius = variant === "phone" ? 36 : variant === "cutout" ? 8 : 6;
  const border =
    variant === "phone"
      ? `10px solid #1a1a1a`
      : variant === "polaroid"
        ? `4px solid ${colors.white}`
        : `6px solid ${tint}`;

  return (
    <div
      style={{
        width,
        padding: framePad,
        backgroundColor: variant === "polaroid" ? colors.white : "transparent",
        borderRadius: radius,
        border: variant === "cutout" ? border : undefined,
        boxShadow:
          variant === "cutout"
            ? "none"
            : "0 24px 60px rgba(0,0,0,0.45)",
        opacity: t,
        transform: `translateY(${interpolate(t, [0, 1], [40, 0]) + idleY(frame, 2.5, 14)}px) rotate(${rotate + idleY(frame, 0.4, 22)}deg) scale(${interpolate(t, [0, 1], [0.9, 1])})`,
      }}
    >
      <div
        style={{
          width: "100%",
          height,
          borderRadius: variant === "phone" ? 22 : 2,
          overflow: "hidden",
          border: variant === "phone" ? border : undefined,
          position: "relative",
          backgroundColor: colors.bg,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(0.85) contrast(1.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: tint,
            opacity: 0.32,
            mixBlendMode: "color",
          }}
        />
      </div>
    </div>
  );
};

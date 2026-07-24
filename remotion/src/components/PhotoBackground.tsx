import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { colors } from "../theme";

type PhotoBackgroundProps = {
  /** Path under public/, e.g. images/hook-market.jpg */
  src: string;
  durationInFrames: number;
  /** Duotone tint color */
  tint?: string;
  tintOpacity?: number;
  scaleFrom?: number;
  scaleTo?: number;
  panX?: number;
  panY?: number;
  /** Extra overlay darkness 0–1 */
  vignette?: number;
};

/**
 * Full-bleed photo with duotone, Ken Burns scale/pan, and vignette.
 * Never sits still — continuous camera motion for Vox parallax feel.
 */
export const PhotoBackground: React.FC<PhotoBackgroundProps> = ({
  src,
  durationInFrames,
  tint = colors.teal,
  tintOpacity = 0.38,
  scaleFrom = 1,
  scaleTo = 1.1,
  panX = 0,
  panY = 18,
  vignette = 0.55,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [scaleFrom, scaleTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tx = interpolate(frame, [0, durationInFrames], [0, panX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ty = interpolate(frame, [0, durationInFrames], [0, panY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: colors.bg }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1) contrast(1.12) brightness(0.85)",
          }}
        />
        {/* Duotone brand tint */}
        <AbsoluteFill
          style={{
            backgroundColor: tint,
            opacity: tintOpacity,
            mixBlendMode: "color",
          }}
        />
        <AbsoluteFill
          style={{
            backgroundColor: tint,
            opacity: tintOpacity * 0.35,
            mixBlendMode: "multiply",
          }}
        />
      </AbsoluteFill>

      {/* Vignette — keep kinetic text readable */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, rgba(10,14,23,${vignette * 0.45}) 0%, rgba(10,14,23,${vignette * 0.15}) 40%, rgba(10,14,23,${vignette + 0.2}) 100%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

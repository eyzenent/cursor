import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 40, fps, config: springPop });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: "160px 64px",
        fontFamily: fonts.body,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KineticText text="ÖĞREN." fontSize={96} delay={2} align="center" />
      <KineticText text="KARŞILAŞTIR." fontSize={96} delay={10} align="center" color={colors.yellow} />
      <KineticText text="SONRA KARAR VER." fontSize={56} delay={20} align="center" color={colors.muted} />

      <div style={{ height: 48 }} />
      <HighlightBox text="ETF 101" delay={36} fontSize={40} />

      <div
        style={{
          marginTop: 56,
          padding: "26px 40px",
          backgroundColor: colors.yellow,
          color: colors.bg,
          borderRadius: 18,
          fontFamily: fonts.display,
          fontSize: 42,
          textTransform: "uppercase",
          opacity: t,
          scale: interpolate(t, [0, 1], [0.7, 1]),
          boxShadow: "0 12px 0 #b89020",
        }}
      >
        Takip et · Kaydet
      </div>

      <div
        style={{
          marginTop: 40,
          fontSize: 22,
          fontWeight: 700,
          color: colors.muted,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: interpolate(frame, [70, 95], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Bu içerik yatırım tavsiyesi değildir
      </div>
    </AbsoluteFill>
  );
};

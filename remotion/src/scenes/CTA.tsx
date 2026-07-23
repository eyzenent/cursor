import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandLogo } from "../components/BrandLogo";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import {
  CameraZoom,
  FloatingBlocks,
  MovingGrid,
  SafeStage,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

/** End card — brand logo + CTA */
export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.cta;
  const btn = spring({ frame: frame - 55, fps, config: springPop });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1.04} to={1}>
        <FloatingBlocks count={7} seed={2} />
        <MovingGrid />
        {Array.from({ length: 5 }).map((_, i) => {
          const ang = frame / 22 + (i * Math.PI * 2) / 5;
          const r = 260;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "48%",
                width: 40,
                height: 40,
                marginLeft: -20,
                marginTop: -20,
                backgroundColor:
                  i % 2 === 0
                    ? colors.yellow
                    : i % 3 === 0
                      ? colors.teal
                      : colors.red,
                opacity: 0.35,
                transform: `translate(${Math.cos(ang) * r}px, ${Math.sin(ang) * r}px) rotate(45deg)`,
              }}
            />
          );
        })}
      </CameraZoom>

      <SafeStage justify="center" style={{ alignItems: "center" }}>
        <BrandLogo width={520} delay={0} />

        <div style={{ height: 36 }} />

        <KineticText text="ÖĞREN." fontSize={68} delay={12} align="center" />
        <div style={{ height: 4 }} />
        <KineticText
          text="KARŞILAŞTIR."
          fontSize={56}
          delay={22}
          align="center"
          color={colors.yellow}
        />
        <div style={{ height: 4 }} />
        <KineticText
          text="SONRA KARAR VER."
          fontSize={32}
          delay={34}
          align="center"
          color={colors.muted}
        />

        <div style={{ height: 20 }} />
        <HighlightBox text="ETF 101" delay={46} fontSize={26} />

        <div
          style={{
            marginTop: 28,
            padding: "18px 30px",
            backgroundColor: colors.yellow,
            color: colors.bg,
            borderRadius: 16,
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 30,
            opacity: btn,
            transform: `translateY(${idleY(frame, 2.5, 10)}px) scale(${interpolate(btn, [0, 1], [0.92, 1])})`,
          }}
        >
          {("Takip et · Kaydet").toLocaleUpperCase("tr-TR")}
        </div>

        <div
          style={{
            marginTop: 22,
            fontFamily: fonts.body,
            fontSize: 16,
            fontWeight: 700,
            color: colors.muted,
            letterSpacing: "0.08em",
            textAlign: "center",
            opacity: interpolate(frame, [90, 115], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {("Bu içerik yatırım tavsiyesi değildir").toLocaleUpperCase("tr-TR")}
        </div>
      </SafeStage>
    </AbsoluteFill>
  );
};

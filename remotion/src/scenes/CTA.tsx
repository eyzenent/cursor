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
import { PhotoBackground } from "../components/PhotoBackground";
import {
  FloatingBlocks,
  MovingGrid,
  SafeStage,
  SceneExit,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, SCENE_IMAGES, colors, springPop } from "../theme";

/**
 * Layout F — brand CTA over city photo + orbiting shapes
 */
export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.cta;
  const btn = spring({ frame: frame - 55, fps, config: springPop });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <SceneExit durationInFrames={dur} exitFrames={8}>
        <PhotoBackground
          src={SCENE_IMAGES.cta}
          durationInFrames={dur}
          tint={colors.yellow}
          tintOpacity={0.28}
          scaleFrom={1.06}
          scaleTo={1}
          panY={-12}
          vignette={0.7}
        />
        <FloatingBlocks count={7} seed={2} />
        <MovingGrid />

        {Array.from({ length: 5 }).map((_, i) => {
          const ang = frame / 20 + (i * Math.PI * 2) / 5;
          const r = 270;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "46%",
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
                opacity: 0.4,
                transform: `translate(${Math.cos(ang) * r}px, ${Math.sin(ang) * r}px) rotate(45deg)`,
              }}
            />
          );
        })}

        <SafeStage justify="center" style={{ alignItems: "center" }}>
          <BrandLogo width={500} delay={0} />
          <div style={{ height: 28 }} />
          <KineticText text="ÖĞREN." fontSize={68} delay={10} align="center" />
          <div style={{ height: 4 }} />
          <KineticText
            text="KARŞILAŞTIR."
            fontSize={54}
            delay={20}
            align="center"
            color={colors.yellow}
          />
          <div style={{ height: 4 }} />
          <KineticText
            text="SONRA KARAR VER."
            fontSize={30}
            delay={32}
            align="center"
            color={colors.muted}
          />

          <div style={{ height: 18 }} />
          <HighlightBox text="ETF 101" delay={44} fontSize={26} />

          <div
            style={{
              marginTop: 26,
              padding: "18px 30px",
              backgroundColor: colors.yellow,
              color: colors.bg,
              borderRadius: 16,
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 28,
              opacity: btn,
              transform: `translateY(${idleY(frame, 2.5, 10)}px) scale(${interpolate(btn, [0, 1], [0.92, 1])})`,
            }}
          >
            {("Takip et · Kaydet").toLocaleUpperCase("tr-TR")}
          </div>

          <div
            style={{
              marginTop: 20,
              fontFamily: fonts.body,
              fontSize: 15,
              fontWeight: 700,
              color: colors.muted,
              letterSpacing: "0.08em",
              textAlign: "center",
              opacity: interpolate(frame, [88, 112], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {("Bu içerik yatırım tavsiyesi değildir").toLocaleUpperCase("tr-TR")}
          </div>
        </SafeStage>
      </SceneExit>
    </AbsoluteFill>
  );
};

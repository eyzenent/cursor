import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
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

/** Center CTA — safe padded, no overlapping chrome */
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
        <KineticText text="ÖĞREN." fontSize={76} delay={2} align="center" />
        <div style={{ height: 6 }} />
        <KineticText
          text="KARŞILAŞTIR."
          fontSize={64}
          delay={14}
          align="center"
          color={colors.yellow}
        />
        <div style={{ height: 6 }} />
        <KineticText
          text="SONRA KARAR VER."
          fontSize={36}
          delay={28}
          align="center"
          color={colors.muted}
        />

        <div style={{ height: 24 }} />
        <HighlightBox text="ETF 101" delay={42} fontSize={28} />

        <div
          style={{
            marginTop: 32,
            padding: "20px 32px",
            backgroundColor: colors.yellow,
            color: colors.bg,
            borderRadius: 16,
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 32,
            opacity: btn,
            transform: `translateY(${idleY(frame, 2.5, 10)}px) scale(${interpolate(btn, [0, 1], [0.92, 1])})`,
          }}
        >
          {("Takip et · Kaydet").toLocaleUpperCase("tr-TR")}
        </div>

        <div
          style={{
            marginTop: 24,
            fontFamily: fonts.body,
            fontSize: 17,
            fontWeight: 700,
            color: colors.muted,
            letterSpacing: "0.08em",
            textAlign: "center",
            opacity: interpolate(frame, [85, 110], [0, 1], {
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

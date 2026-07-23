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
  idleR,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

/** Layout: center focus + orbiting geometry (different from Hook) */
export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.cta;
  const btn = spring({ frame: frame - 70, fps, config: springPop });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1.08} to={1}>
        <FloatingBlocks count={9} seed={2} />
        <MovingGrid />
      </CameraZoom>

      {/* Orbiting diamonds */}
      {Array.from({ length: 5 }).map((_, i) => {
        const ang = (frame / 20 + i * (Math.PI * 2) / 5);
        const r = 320;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "48%",
              width: 56,
              height: 56,
              marginLeft: -28,
              marginTop: -28,
              backgroundColor:
                i % 2 === 0 ? colors.yellow : i % 3 === 0 ? colors.teal : colors.red,
              opacity: 0.55,
              translate: `${Math.cos(ang) * r}px ${Math.sin(ang) * r}px`,
              rotate: `${45 + frame + i * 20}deg`,
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          padding: "180px 56px",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: fonts.body,
        }}
      >
        <KineticText
          text="ÖĞREN."
          fontSize={100}
          delay={2}
          align="center"
          exitAfter={40}
        />
        <KineticText
          text="KARŞILAŞTIR."
          fontSize={88}
          delay={22}
          align="center"
          color={colors.yellow}
          exitAfter={55}
        />
        <KineticText
          text="SONRA KARAR VER."
          fontSize={48}
          delay={48}
          align="center"
          color={colors.muted}
        />

        <div style={{ height: 36 }} />
        <HighlightBox text="ETF 101" delay={62} fontSize={36} />

        <div
          style={{
            marginTop: 48,
            padding: "28px 44px",
            backgroundColor: colors.yellow,
            color: colors.bg,
            borderRadius: 18,
            fontFamily: fonts.display,
            fontSize: 44,
            textTransform: "uppercase",
            opacity: btn,
            scale: interpolate(btn, [0, 1], [0.6, 1]),
            translate: `0px ${idleY(frame, 4, 8)}px`,
            rotate: `${idleR(frame, 1.5, 12)}deg`,
          }}
        >
          Takip et · Kaydet
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 20,
            fontWeight: 700,
            color: colors.muted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: interpolate(frame, [100, 125], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Bu içerik yatırım tavsiyesi değildir
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

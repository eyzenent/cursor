import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import { IconWarn } from "../components/IconPop";
import {
  CameraZoom,
  FloatingBlocks,
  SafeStage,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

/** Full-screen color takeover — content centered in safe zone */
export const RiskScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.risk;
  const blast = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1} to={1.06}>
        <FloatingBlocks count={5} seed={9} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 180,
            height: 180,
            marginLeft: -90,
            marginTop: -90,
            borderRadius: "50%",
            backgroundColor: colors.red,
            transform: `scale(${interpolate(blast, [0, 1], [0.15, 16])})`,
            opacity: 0.95,
          }}
        />
      </CameraZoom>

      <SafeStage justify="center" style={{ alignItems: "center" }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 20,
            backgroundColor: colors.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            transform: `scale(${spring({ frame: frame - 14, fps, config: springPop })})`,
          }}
        >
          <IconWarn color={colors.red} />
        </div>

        <KineticText
          text="AMA..."
          fontSize={88}
          delay={18}
          align="center"
          color={colors.bg}
        />
        <div style={{ height: 10 }} />
        <KineticText
          text="ETF SİHİR DEĞİL."
          fontSize={40}
          delay={32}
          align="center"
          color={colors.bg}
        />

        <div
          style={{
            marginTop: 32,
            width: "100%",
            backgroundColor: colors.bg,
            borderRadius: 16,
            padding: "22px 20px",
            opacity: spring({ frame: frame - 60, fps, config: springPop }),
            transform: `translateY(${interpolate(
              spring({ frame: frame - 60, fps, config: springPop }),
              [0, 1],
              [20, 0],
            )}px)`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 24,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.4,
              marginBottom: 14,
            }}
          >
            Piyasa düşerse ETF de düşebilir. Çeşitlendirme riski yok etmez —
            dağıtır.
          </div>
          <HighlightBox
            text="Yatırım tavsiyesi değildir"
            delay={80}
            bg={colors.yellow}
            color={colors.bg}
            fontSize={24}
          />
        </div>
      </SafeStage>
    </AbsoluteFill>
  );
};

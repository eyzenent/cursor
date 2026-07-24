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
import { PhotoBackground } from "../components/PhotoBackground";
import {
  FloatingBlocks,
  SafeStage,
  SceneExit,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, SCENE_IMAGES, colors, springPop } from "../theme";

/**
 * Layout E — full-screen color blast takeover (Vox "ama..." break)
 * Photo underneath, red circle expands over it
 */
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
      <SceneExit durationInFrames={dur}>
        <PhotoBackground
          src={SCENE_IMAGES.risk}
          durationInFrames={dur}
          tint={colors.red}
          tintOpacity={0.25}
          scaleFrom={1}
          scaleTo={1.1}
          panY={-20}
        />
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
            transform: `scale(${interpolate(blast, [0, 1], [0.12, 18])})`,
            opacity: 0.94,
          }}
        />

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
              marginBottom: 22,
              transform: `scale(${spring({ frame: frame - 14, fps, config: springPop })}) translateY(${idleY(frame, 2, 12)}px)`,
            }}
          >
            <IconWarn color={colors.red} />
          </div>

          <KineticText
            text="AMA..."
            fontSize={86}
            delay={18}
            align="center"
            color={colors.bg}
          />
          <div style={{ height: 8 }} />
          <KineticText
            text="ETF SİHİR DEĞİL."
            fontSize={40}
            delay={30}
            align="center"
            color={colors.bg}
          />

          <div
            style={{
              marginTop: 28,
              width: "100%",
              backgroundColor: colors.bg,
              borderRadius: 16,
              padding: "20px 18px",
              opacity: spring({ frame: frame - 58, fps, config: springPop }),
              transform: `translateY(${
                interpolate(
                  spring({ frame: frame - 58, fps, config: springPop }),
                  [0, 1],
                  [22, 0],
                ) + idleY(frame, 1.5, 14)
              }px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 23,
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
              delay={78}
              bg={colors.yellow}
              color={colors.bg}
              fontSize={22}
            />
          </div>
        </SafeStage>
      </SceneExit>
    </AbsoluteFill>
  );
};

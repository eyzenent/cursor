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
import { CameraZoom, FloatingBlocks, idleR, idleY } from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

/** Layout: full-screen color takeover + band text (not same as definition) */
export const RiskScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.risk;

  const blast = spring({ frame: frame - 6, fps, config: { damping: 12, stiffness: 90 } });
  const shake =
    Math.sin(frame * 1.4) *
    interpolate(frame, [20, 50, 90], [0, 5, 1.5], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1.05} to={1.14}>
        <FloatingBlocks count={7} seed={9} />
        {/* Expanding red takeover */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 200,
            height: 200,
            marginLeft: -100,
            marginTop: -100,
            borderRadius: "50%",
            backgroundColor: colors.red,
            scale: interpolate(blast, [0, 1], [0.2, 14]),
            opacity: 0.92,
          }}
        />
      </CameraZoom>

      <AbsoluteFill
        style={{
          translate: `${shake}px 0px`,
          padding: "200px 56px",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: fonts.body,
        }}
      >
        <div
          style={{
            translate: `0px ${idleY(frame, 4, 10)}px`,
            rotate: `${idleR(frame, 2, 14)}deg`,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              backgroundColor: colors.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: spring({ frame: frame - 18, fps, config: springPop }),
            }}
          >
            <IconWarn color={colors.red} />
          </div>
        </div>

        <KineticText
          text="AMA..."
          fontSize={120}
          delay={22}
          align="center"
          color={colors.bg}
          exitAfter={70}
        />
        <KineticText
          text="ETF SİHİR DEĞİL."
          fontSize={52}
          delay={40}
          align="center"
          color={colors.bg}
          exitAfter={95}
        />

        <div
          style={{
            marginTop: 40,
            maxWidth: 860,
            backgroundColor: colors.bg,
            borderRadius: 18,
            padding: "28px 26px",
            opacity: spring({ frame: frame - 70, fps, config: springPop }),
            translate: `0px ${interpolate(
              spring({ frame: frame - 70, fps, config: springPop }),
              [0, 1],
              [40, 0],
            )}px`,
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: colors.white,
              lineHeight: 1.35,
              marginBottom: 18,
            }}
          >
            Piyasa düşerse ETF de düşebilir. Çeşitlendirme riski yok etmez —
            dağıtır.
          </div>
          <HighlightBox
            text="Yatırım tavsiyesi değildir"
            delay={95}
            bg={colors.yellow}
            color={colors.bg}
            fontSize={28}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

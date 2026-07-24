import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BrandLogo } from "../components/BrandLogo";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import { PhotoBackground } from "../components/PhotoBackground";
import { StatCounter } from "../components/StatCounter";
import {
  FloatingBlocks,
  MovingGrid,
  SceneExit,
  SafeStage,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, SCENE_IMAGES, colors } from "../theme";

/**
 * Layout A — center magnifier:
 * full-bleed photo + rotating frame + center kinetic stack
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = SCENE_DURATIONS.hook;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <SceneExit durationInFrames={dur}>
        <PhotoBackground
          src={SCENE_IMAGES.hook}
          durationInFrames={dur}
          tint={colors.teal}
          tintOpacity={0.4}
          scaleFrom={1}
          scaleTo={1.1}
          panY={-24}
        />
        <FloatingBlocks count={6} seed={1} />
        <MovingGrid />

        {/* Magnifier frame — continuous rotate */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "48%",
            width: 420,
            height: 420,
            marginLeft: -210,
            marginTop: -210,
            border: `5px solid ${colors.yellow}`,
            borderRadius: 48,
            opacity: 0.35,
            transform: `rotate(${frame * 0.55}deg) translateY(${idleY(frame, 4, 18)}px)`,
            pointerEvents: "none",
          }}
        />

        <SafeStage justify="center" style={{ alignItems: "center" }}>
          <BrandLogo width={380} delay={0} />
          <div style={{ height: 22 }} />
          <KineticText text="ETF NEDİR?" fontSize={78} delay={6} align="center" />
          <div style={{ height: 12 }} />
          <KineticText
            text="NEDEN HERKES BAHSEDİYOR?"
            fontSize={32}
            color={colors.muted}
            delay={18}
            align="center"
          />
          <div
            style={{
              marginTop: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${idleY(frame, 2.5, 13)}px)`,
            }}
          >
            <HighlightBox text="Küresel ETF varlıkları" delay={40} fontSize={24} />
            <div style={{ height: 14 }} />
            <StatCounter to={13} delay={50} suffix=" TRİLYON $" fontSize={68} />
            <div
              style={{
                marginTop: 10,
                fontFamily: fonts.body,
                fontSize: 20,
                fontWeight: 700,
                color: colors.muted,
              }}
            >
              2026 · trilyon dolarlık piyasa
            </div>
          </div>
        </SafeStage>
      </SceneExit>
    </AbsoluteFill>
  );
};

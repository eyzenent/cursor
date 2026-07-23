import { AbsoluteFill, useCurrentFrame } from "remotion";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import { StatCounter } from "../components/StatCounter";
import {
  CameraZoom,
  FloatingBlocks,
  MovingGrid,
  SafeStage,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors } from "../theme";

/** Center layout — text only inside SafeStage */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = SCENE_DURATIONS.hook;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur}>
        <FloatingBlocks count={8} seed={1} />
        <MovingGrid />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 360,
            height: 360,
            marginLeft: -180,
            marginTop: -180,
            border: `5px solid ${colors.yellow}`,
            borderRadius: 40,
            opacity: 0.22,
            transform: `rotate(${frame * 0.4}deg)`,
          }}
        />
      </CameraZoom>

      <SafeStage justify="center" style={{ alignItems: "center" }}>
        <KineticText
          text="ETF NEDİR?"
          fontSize={80}
          delay={2}
          align="center"
        />
        <div style={{ height: 16 }} />
        <KineticText
          text="NEDEN HERKES BAHSEDİYOR?"
          fontSize={34}
          color={colors.muted}
          delay={16}
          align="center"
        />
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${idleY(frame, 2, 14)}px)`,
          }}
        >
          <HighlightBox text="Küresel ETF varlıkları" delay={42} fontSize={26} />
          <div style={{ height: 16 }} />
          <StatCounter to={13} delay={52} suffix=" TRİLYON $" fontSize={72} />
          <div
            style={{
              marginTop: 12,
              fontFamily: fonts.body,
              fontSize: 22,
              fontWeight: 700,
              color: colors.muted,
              textAlign: "center",
            }}
          >
            2026 · trilyon dolarlık piyasa
          </div>
        </div>
      </SafeStage>
    </AbsoluteFill>
  );
};

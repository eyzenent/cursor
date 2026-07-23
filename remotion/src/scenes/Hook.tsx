import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import { StatCounter } from "../components/StatCounter";
import {
  CameraZoom,
  FloatingBlocks,
  MovingGrid,
  ParallaxFg,
  idleR,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors } from "../theme";

/** Layout: center magnifier — huge kinetic words + orbiting blocks */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = SCENE_DURATIONS.hook;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur}>
        <FloatingBlocks count={10} seed={1} />
        <MovingGrid />
      </CameraZoom>

      {/* Orbiting accent square */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          width: 420,
          height: 420,
          marginLeft: -210,
          marginTop: -210,
          border: `6px solid ${colors.yellow}`,
          borderRadius: 48,
          opacity: 0.35,
          rotate: `${frame * 0.6}deg`,
          scale: interpolate(frame, [0, dur], [0.85, 1.15], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      <ParallaxFg durationInFrames={dur}>
        <AbsoluteFill
          style={{
            padding: "180px 56px",
            justifyContent: "center",
            fontFamily: fonts.body,
          }}
        >
          <KineticText
            text="ETF NEDİR?"
            fontSize={110}
            delay={2}
            align="center"
            exitAfter={70}
          />
          <div style={{ height: 18 }} />
          <KineticText
            text="NEDEN HERKES BAHSEDİYOR?"
            fontSize={44}
            color={colors.muted}
            delay={28}
            align="center"
            exitAfter={100}
          />
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              translate: `0px ${idleY(frame, 3, 11)}px`,
            }}
          >
            <HighlightBox text="Küresel ETF varlıkları" delay={55} fontSize={30} />
            <div style={{ height: 16 }} />
            <StatCounter to={13} delay={65} suffix=" TRİLYON $" fontSize={92} />
            <div
              style={{
                marginTop: 14,
                fontSize: 26,
                fontWeight: 700,
                color: colors.muted,
                rotate: `${idleR(frame, 1, 16)}deg`,
              }}
            >
              2026 · trilyon dolarlık piyasa
            </div>
          </div>
        </AbsoluteFill>
      </ParallaxFg>
    </AbsoluteFill>
  );
};

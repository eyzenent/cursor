import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import { IconBasket } from "../components/IconPop";
import {
  CameraZoom,
  FloatingBlocks,
  SweepLines,
  idleR,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

const stocks = ["AAPL", "MSFT", "NVDA", "AMZN", "JPM", "XOM", "V", "META"];

/** Layout: full-bleed visual background + top text band */
export const DefinitionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.definition;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1.02} to={1.12}>
        <FloatingBlocks count={6} seed={4} />
        <SweepLines />

        {/* Giant basket as full-screen backdrop */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 80,
            width: 720,
            height: 520,
            marginLeft: -360,
            border: `14px solid ${colors.yellow}`,
            borderTop: "none",
            borderRadius: "0 0 80px 80px",
            backgroundColor: `${colors.yellow}14`,
            translate: `0px ${idleY(frame, 6, 16)}px`,
            rotate: `${idleR(frame, 1.2, 22)}deg`,
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 280,
            marginLeft: -70,
            opacity: 0.25,
            scale: 2.4,
            translate: `0px ${idleY(frame, 4, 13)}px`,
          }}
        >
          <IconBasket color={colors.yellow} />
        </div>

        {stocks.map((ticker, i) => {
          const start = 25 + i * 5;
          const t = spring({ frame: frame - start, fps, config: springPop });
          const col = (i % 4) - 1.5;
          return (
            <div
              key={ticker}
              style={{
                position: "absolute",
                left: "50%",
                top: 380,
                width: 130,
                marginLeft: col * 150 - 65,
                padding: "18px 0",
                textAlign: "center",
                backgroundColor: i % 2 === 0 ? colors.yellow : colors.teal,
                color: colors.bg,
                fontWeight: 800,
                fontSize: 26,
                borderRadius: 14,
                opacity: t,
                translate: `0px ${interpolate(t, [0, 1], [-260, 120 + (i % 3) * 28])}px`,
                rotate: `${interpolate(t, [0, 1], [col * 25, idleR(frame + i, 4, 10)])}deg`,
                scale: interpolate(t, [0, 1], [0.6, 1]),
              }}
            >
              {ticker}
            </div>
          );
        })}
      </CameraZoom>

      {/* Top text band */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "120px 48px 36px",
          backgroundColor: colors.bg,
          borderBottom: `4px solid ${colors.yellow}`,
          translate: `0px ${interpolate(frame, [0, 18], [-120, 0], {
            extrapolateRight: "clamp",
          })}px`,
        }}
      >
        <KineticText text="BİR SEPET." fontSize={72} delay={4} exitAfter={90} />
        <KineticText
          text="İÇİNDE YÜZLERCE VARLIK."
          fontSize={40}
          color={colors.muted}
          delay={18}
          exitAfter={110}
        />
        <div style={{ marginTop: 18 }}>
          <HighlightBox text="Exchange Traded Fund" delay={40} fontSize={28} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fonts.display,
          fontSize: 36,
          color: colors.white,
          textTransform: "uppercase",
          opacity: spring({ frame: frame - 100, fps, config: springPop }),
          translate: `0px ${idleY(frame, 3, 12)}px`,
        }}
      >
        Tek işlem → tüm sepet
      </div>
    </AbsoluteFill>
  );
};

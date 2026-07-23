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
  SAFE,
  SafeStage,
  SweepLines,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

const stocks = ["AAPL", "MSFT", "NVDA", "AMZN", "JPM", "XOM", "V", "META"];

/** Basket visual + copy inside safe padding */
export const DefinitionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.definition;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1} to={1.05}>
        <FloatingBlocks count={5} seed={4} />
        <SweepLines />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: SAFE.bottom + 80,
            width: 600,
            height: 400,
            marginLeft: -300,
            border: `12px solid ${colors.yellow}`,
            borderTop: "none",
            borderRadius: "0 0 56px 56px",
            backgroundColor: `${colors.yellow}12`,
            transform: `translateY(${idleY(frame, 4, 18)}px)`,
            opacity: interpolate(frame, [0, 18], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: SAFE.bottom + 220,
            marginLeft: -60,
            opacity: 0.2,
            transform: "scale(2)",
          }}
        >
          <IconBasket color={colors.yellow} />
        </div>

        {stocks.map((ticker, i) => {
          const start = 36 + i * 5;
          const t = spring({ frame: frame - start, fps, config: springPop });
          const col = (i % 4) - 1.5;
          return (
            <div
              key={ticker}
              style={{
                position: "absolute",
                left: "50%",
                top: "42%",
                width: 110,
                marginLeft: col * 130 - 55,
                padding: "12px 0",
                textAlign: "center",
                backgroundColor: i % 2 === 0 ? colors.yellow : colors.teal,
                color: colors.bg,
                fontFamily: fonts.body,
                fontWeight: 800,
                fontSize: 20,
                borderRadius: 10,
                opacity: t,
                transform: `translateY(${interpolate(t, [0, 1], [-24, 160 + (i % 3) * 20])}px) scale(${interpolate(t, [0, 1], [0.75, 1])})`,
              }}
            >
              {ticker}
            </div>
          );
        })}
      </CameraZoom>

      <SafeStage justify="flex-start">
        <KineticText text="BİR SEPET." fontSize={60} delay={4} />
        <div style={{ height: 8 }} />
        <KineticText
          text="İÇİNDE YÜZLERCE VARLIK."
          fontSize={32}
          color={colors.muted}
          delay={16}
        />
        <div style={{ marginTop: 14 }}>
          <HighlightBox text="Exchange Traded Fund" delay={34} fontSize={24} />
        </div>
      </SafeStage>

      <div
        style={{
          position: "absolute",
          bottom: SAFE.bottom + 28,
          left: SAFE.side,
          right: SAFE.side,
          textAlign: "center",
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 28,
          color: colors.white,
          opacity: spring({ frame: frame - 95, fps, config: springPop }),
          zIndex: 3,
        }}
      >
        {("Tek işlem → tüm sepet").toLocaleUpperCase("tr-TR")}
      </div>
    </AbsoluteFill>
  );
};

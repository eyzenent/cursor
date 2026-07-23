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

/** Unique columns — no overlapping ticker ghosts */
const stocks = [
  { ticker: "AAPL", col: -1.5, color: colors.yellow },
  { ticker: "MSFT", col: -0.5, color: colors.teal },
  { ticker: "NVDA", col: 0.5, color: colors.yellow },
  { ticker: "AMZN", col: 1.5, color: colors.teal },
];

export const DefinitionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.definition;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1} to={1.04}>
        <FloatingBlocks count={5} seed={4} />
        <SweepLines />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: SAFE.bottom + 100,
            width: 560,
            height: 360,
            marginLeft: -280,
            border: `10px solid ${colors.yellow}`,
            borderTop: "none",
            borderRadius: "0 0 48px 48px",
            backgroundColor: `${colors.yellow}10`,
            transform: `translateY(${idleY(frame, 3, 18)}px)`,
            opacity: interpolate(frame, [0, 16], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: SAFE.bottom + 220,
            marginLeft: -52,
            opacity: 0.18,
            transform: "scale(1.8)",
          }}
        >
          <IconBasket color={colors.yellow} />
        </div>

        {stocks.map((s, i) => {
          const start = 40 + i * 8;
          const t = spring({ frame: frame - start, fps, config: springPop });
          const fall = interpolate(t, [0, 1], [0, 1]);
          // Fade slightly after landing so trails don't stack
          const fade = interpolate(frame, [start + 40, start + 70], [1, 0.55], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={s.ticker}
              style={{
                position: "absolute",
                left: "50%",
                top: "38%",
                width: 120,
                marginLeft: s.col * 140 - 60,
                padding: "14px 0",
                textAlign: "center",
                backgroundColor: s.color,
                color: colors.bg,
                fontFamily: fonts.body,
                fontWeight: 800,
                fontSize: 22,
                borderRadius: 12,
                opacity: t * fade,
                transform: `translateY(${interpolate(fall, [0, 1], [-20, 200])}px)`,
              }}
            >
              {s.ticker}
            </div>
          );
        })}
      </CameraZoom>

      <SafeStage justify="space-between">
        <div>
          <KineticText text="BİR SEPET." fontSize={58} delay={4} />
          <div style={{ height: 8 }} />
          <KineticText
            text="İÇİNDE YÜZLERCE VARLIK."
            fontSize={30}
            color={colors.muted}
            delay={16}
          />
          <div style={{ marginTop: 14 }}>
            <HighlightBox text="Exchange Traded Fund" delay={30} fontSize={22} />
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 28,
            color: colors.white,
            opacity: spring({ frame: frame - 90, fps, config: springPop }),
          }}
        >
          {("Tek işlem → tüm sepet").toLocaleUpperCase("tr-TR")}
        </div>
      </SafeStage>
    </AbsoluteFill>
  );
};

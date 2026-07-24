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
import { PhotoBackground } from "../components/PhotoBackground";
import {
  FloatingBlocks,
  SAFE,
  SceneExit,
  SweepLines,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, SCENE_IMAGES, colors, springPop } from "../theme";

const stocks = [
  { ticker: "AAPL", col: -1.5, color: colors.yellow },
  { ticker: "MSFT", col: -0.5, color: colors.teal },
  { ticker: "NVDA", col: 0.5, color: colors.yellow },
  { ticker: "AMZN", col: 1.5, color: colors.teal },
];

/**
 * Layout B — full-bleed photo + top text band + lower basket visual
 */
export const DefinitionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.definition;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <SceneExit durationInFrames={dur}>
        <PhotoBackground
          src={SCENE_IMAGES.definition}
          durationInFrames={dur}
          tint={colors.yellow}
          tintOpacity={0.34}
          scaleFrom={1.02}
          scaleTo={1.12}
          panX={12}
          panY={-10}
        />
        <FloatingBlocks count={5} seed={4} />
        <SweepLines />

        {/* Basket silhouette — mid/lower, idle bob */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: SAFE.bottom + 90,
            width: 580,
            height: 380,
            marginLeft: -290,
            border: `10px solid ${colors.yellow}`,
            borderTop: "none",
            borderRadius: "0 0 52px 52px",
            backgroundColor: `${colors.yellow}18`,
            transform: `translateY(${idleY(frame, 5, 16)}px)`,
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
            opacity: 0.25,
            transform: `scale(1.9) translateY(${idleY(frame, 3, 14)}px)`,
          }}
        >
          <IconBasket color={colors.yellow} />
        </div>

        {stocks.map((s, i) => {
          const start = 36 + i * 8;
          const t = spring({ frame: frame - start, fps, config: springPop });
          const fade = interpolate(frame, [start + 50, start + 85], [1, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={s.ticker}
              style={{
                position: "absolute",
                left: "50%",
                top: "40%",
                width: 118,
                marginLeft: s.col * 138 - 59,
                padding: "13px 0",
                textAlign: "center",
                backgroundColor: s.color,
                color: colors.bg,
                fontFamily: fonts.body,
                fontWeight: 800,
                fontSize: 21,
                borderRadius: 12,
                opacity: t * fade,
                transform: `translateY(${interpolate(t, [0, 1], [-18, 190])}px)`,
              }}
            >
              {s.ticker}
            </div>
          );
        })}

        {/* Top band copy */}
        <div
          style={{
            position: "absolute",
            top: SAFE.top,
            left: SAFE.side,
            right: SAFE.side,
            zIndex: 3,
          }}
        >
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
            position: "absolute",
            bottom: SAFE.bottom + 28,
            left: SAFE.side,
            right: SAFE.side,
            textAlign: "center",
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 28,
            color: colors.white,
            opacity: spring({ frame: frame - 90, fps, config: springPop }),
            transform: `translateY(${idleY(frame, 2, 12)}px)`,
            zIndex: 3,
          }}
        >
          {("Tek işlem → tüm sepet").toLocaleUpperCase("tr-TR")}
        </div>
      </SceneExit>
    </AbsoluteFill>
  );
};

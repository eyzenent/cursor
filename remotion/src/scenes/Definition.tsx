import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import { IconBasket, IconPop } from "../components/IconPop";
import { HighlightBox } from "../components/HighlightBox";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";

const stocks = ["AAPL", "MSFT", "NVDA", "AMZN", "JPM", "XOM"];

export const DefinitionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: "140px 64px",
        fontFamily: fonts.body,
      }}
    >
      <KineticText text="BİR SEPET." fontSize={84} delay={2} />
      <KineticText text="İÇİNDE YÜZLERCE VARLIK." fontSize={48} color={colors.muted} delay={12} />
      <div style={{ height: 36 }} />
      <HighlightBox text="Exchange Traded Fund" delay={26} fontSize={32} />

      <div
        style={{
          marginTop: 56,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Falling stock chips */}
        {stocks.map((ticker, i) => {
          const start = 28 + i * 5;
          const t = spring({
            frame: frame - start,
            fps,
            config: springPop,
          });
          const drop = interpolate(t, [0, 1], [-160, 0]);
          const x = ((i % 3) - 1) * 150;
          return (
            <div
              key={ticker}
              style={{
                position: "absolute",
                top: 80,
                left: "50%",
                marginLeft: -60 + x,
                width: 120,
                padding: "16px 0",
                textAlign: "center",
                backgroundColor: i % 2 === 0 ? colors.yellow : colors.teal,
                color: colors.bg,
                fontWeight: 800,
                fontSize: 24,
                borderRadius: 12,
                opacity: t,
                translate: `0px ${drop}px`,
                rotate: `${interpolate(t, [0, 1], [(i % 2 === 0 ? -1 : 1) * 20, 0])}deg`,
                zIndex: 2,
              }}
            >
              {ticker}
            </div>
          );
        })}

        <div style={{ marginTop: 200 }}>
          <IconPop delay={55} size={140} bg={colors.yellow}>
            <IconBasket color={colors.bg} />
          </IconPop>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            fontWeight: 800,
            color: colors.white,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            opacity: spring({ frame: frame - 70, fps, config: springPop }),
          }}
        >
          Tek işlem → tüm sepet
        </div>
      </div>
    </AbsoluteFill>
  );
};

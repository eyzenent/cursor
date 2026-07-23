import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import {
  IconBolt,
  IconChart,
  IconCoins,
  IconPop,
} from "../components/IconPop";
import { StatCounter } from "../components/StatCounter";
import {
  CameraZoom,
  MovingGrid,
  SafeStage,
  SweepLines,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

/** Vertical stack for 9:16 — fills mid frame without empty side column */
export const AdvantagesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.advantages;

  const items = [
    {
      delay: 18,
      title: "ÇEŞİTLENDİRME",
      body: "Tek işlemle onlarca varlık",
      bg: colors.yellow,
      icon: <IconChart color={colors.bg} />,
    },
    {
      delay: 90,
      title: "DÜŞÜK MALİYET",
      body: "Ortalama gider oranı",
      bg: colors.teal,
      icon: <IconCoins color={colors.bg} />,
      counter: true,
    },
    {
      delay: 175,
      title: "LİKİDİTE",
      body: "Borsa saatleri içinde al/sat",
      bg: colors.red,
      icon: <IconBolt color={colors.white} />,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1} to={1.04}>
        <MovingGrid />
        <SweepLines />
      </CameraZoom>

      <SafeStage justify="center">
        <KineticText text="3 NEDEN" fontSize={56} delay={2} align="center" />
        <div style={{ height: 6 }} />
        <KineticText
          text="ETF NEDEN TERCİH?"
          fontSize={26}
          color={colors.muted}
          delay={10}
          align="center"
        />

        <div style={{ height: 28 }} />

        {items.map((item) => {
          const t = spring({
            frame: frame - item.delay,
            fps,
            config: springPop,
          });
          return (
            <div
              key={item.title}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                marginBottom: 14,
                backgroundColor: colors.card,
                borderRadius: 18,
                padding: "16px 16px",
                opacity: t,
                transform: `translateY(${interpolate(t, [0, 1], [24, 0])}px)`,
              }}
            >
              <IconPop delay={item.delay} size={64} bg={item.bg}>
                {item.icon}
              </IconPop>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 900,
                    fontSize: 26,
                    color: colors.white,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: colors.muted,
                    marginTop: 3,
                    fontFamily: fonts.body,
                  }}
                >
                  {item.body}
                </div>
                {item.counter ? (
                  <StatCounter
                    to={0.16}
                    delay={item.delay + 14}
                    decimals={2}
                    suffix="%"
                    fontSize={40}
                    color={colors.yellow}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </SafeStage>
    </AbsoluteFill>
  );
};

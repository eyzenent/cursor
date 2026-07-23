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
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

const RingDraw: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const r = 48;
  const c = 2 * Math.PI * r;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} stroke="#ffffff22" strokeWidth="9" fill="none" />
      <circle
        cx="60"
        cy="60"
        r={r}
        stroke={colors.teal}
        strokeWidth="9"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
    </svg>
  );
};

const BarGrow: React.FC<{ delay: number; h: number; color: string }> = ({
  delay,
  h,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: springPop });
  return (
    <div
      style={{
        width: 36,
        height: Math.max(h * t, 0),
        backgroundColor: color,
        borderRadius: "8px 8px 4px 4px",
      }}
    />
  );
};

/** Left copy / right charts — SafeStage only */
export const AdvantagesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.advantages;

  const items = [
    {
      delay: 20,
      title: "ÇEŞİTLENDİRME",
      body: "Tek işlemle onlarca varlık",
      bg: colors.yellow,
      icon: <IconChart color={colors.bg} />,
    },
    {
      delay: 85,
      title: "DÜŞÜK MALİYET",
      body: "Ortalama gider oranı",
      bg: colors.teal,
      icon: <IconCoins color={colors.bg} />,
      counter: true,
    },
    {
      delay: 170,
      title: "LİKİDİTE",
      body: "Borsa saatleri içinde al/sat",
      bg: colors.red,
      icon: <IconBolt color={colors.white} />,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1} to={1.05}>
        <MovingGrid />
        <SweepLines />
      </CameraZoom>

      <SafeStage justify="flex-start">
        <div style={{ display: "flex", gap: 18, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1.25, overflow: "hidden" }}>
            <KineticText text="3 NEDEN" fontSize={56} delay={2} />
            <div style={{ height: 6 }} />
            <KineticText
              text="ETF NEDEN TERCİH?"
              fontSize={26}
              color={colors.muted}
              delay={12}
            />
            <div style={{ height: 20 }} />
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
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 12,
                    backgroundColor: colors.card,
                    borderRadius: 16,
                    padding: "12px 12px",
                    opacity: t,
                    transform: `translateX(${interpolate(t, [0, 1], [-28, 0])}px)`,
                  }}
                >
                  <IconPop delay={item.delay} size={56} bg={item.bg}>
                    {item.icon}
                  </IconPop>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: fonts.display,
                        fontWeight: 900,
                        fontSize: 22,
                        color: colors.white,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: colors.muted,
                        marginTop: 2,
                        fontFamily: fonts.body,
                      }}
                    >
                      {item.body}
                    </div>
                    {item.counter ? (
                      <StatCounter
                        to={0.16}
                        delay={item.delay + 16}
                        decimals={2}
                        suffix="%"
                        fontSize={36}
                        color={colors.yellow}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              flex: 0.75,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              transform: `translateY(${idleY(frame, 2, 14)}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                height: 200,
              }}
            >
              <BarGrow delay={36} h={90} color={colors.yellow} />
              <BarGrow delay={44} h={140} color={colors.teal} />
              <BarGrow delay={52} h={180} color={colors.red} />
              <BarGrow delay={60} h={120} color={colors.yellow} />
              <BarGrow delay={68} h={155} color={colors.teal} />
            </div>
            <RingDraw delay={155} />
          </div>
        </div>
      </SafeStage>
    </AbsoluteFill>
  );
};

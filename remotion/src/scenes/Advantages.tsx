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
  SweepLines,
  idleR,
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
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      style={{
        translate: `0px ${idleY(frame, 3, 12)}px`,
        rotate: `${idleR(frame, 4, 18)}deg`,
      }}
    >
      <circle cx="70" cy="70" r={r} stroke="#ffffff22" strokeWidth="10" fill="none" />
      <circle
        cx="70"
        cy="70"
        r={r}
        stroke={colors.teal}
        strokeWidth="10"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
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
        width: 48,
        height: h * t,
        backgroundColor: color,
        borderRadius: "10px 10px 4px 4px",
        translate: `0px ${idleY(frame, 2, 9)}px`,
      }}
    />
  );
};

/** Layout: left copy / right live data visual */
export const AdvantagesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.advantages;

  const items = [
    {
      delay: 24,
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
      delay: 180,
      title: "LİKİDİTE",
      body: "Borsa saatleri içinde al/sat",
      bg: colors.red,
      icon: <IconBolt color={colors.white} />,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1.01} to={1.09}>
        <MovingGrid />
        <SweepLines />
      </CameraZoom>

      <div
        style={{
          position: "absolute",
          inset: "120px 40px 110px",
          display: "flex",
          gap: 28,
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 1.15, zIndex: 2 }}>
          <KineticText text="3 NEDEN" fontSize={78} delay={2} exitAfter={70} />
          <KineticText
            text="ETF NEDEN TERCİH?"
            fontSize={34}
            color={colors.muted}
            delay={14}
            exitAfter={90}
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
                  gap: 16,
                  alignItems: "center",
                  marginBottom: 22,
                  backgroundColor: colors.card,
                  borderRadius: 18,
                  padding: "18px 16px",
                  opacity: t,
                  translate: `${interpolate(t, [0, 1], [-80, 0])}px ${idleY(frame, 1.5, 11)}px`,
                }}
              >
                <IconPop delay={item.delay} size={72} bg={item.bg}>
                  {item.icon}
                </IconPop>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 28,
                      color: colors.white,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: colors.muted,
                      marginTop: 4,
                    }}
                  >
                    {item.body}
                  </div>
                  {item.counter ? (
                    <StatCounter
                      to={0.16}
                      delay={item.delay + 18}
                      decimals={2}
                      prefix="%"
                      fontSize={44}
                      color={colors.yellow}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT visual */}
        <div
          style={{
            flex: 0.85,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
            translate: `${interpolate(frame, [0, dur], [30, -10], {
              extrapolateRight: "clamp",
            })}px 0px`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 14,
              height: 280,
            }}
          >
            <BarGrow delay={40} h={120} color={colors.yellow} />
            <BarGrow delay={48} h={180} color={colors.teal} />
            <BarGrow delay={56} h={240} color={colors.red} />
            <BarGrow delay={64} h={150} color={colors.yellow} />
            <BarGrow delay={72} h={200} color={colors.teal} />
          </div>
          <RingDraw delay={160} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

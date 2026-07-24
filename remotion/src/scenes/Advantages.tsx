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
import { FramedPhoto } from "../components/FramedPhoto";
import { PhotoBackground } from "../components/PhotoBackground";
import { StatCounter } from "../components/StatCounter";
import {
  MovingGrid,
  SAFE,
  SceneExit,
  SweepLines,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, SCENE_IMAGES, colors, springPop } from "../theme";

const RingDraw: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      style={{ transform: `translateY(${idleY(frame, 2, 13)}px)` }}
    >
      <circle cx="55" cy="55" r={r} stroke="#ffffff22" strokeWidth="8" fill="none" />
      <circle
        cx="55"
        cy="55"
        r={r}
        stroke={colors.teal}
        strokeWidth="8"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
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
        width: 34,
        height: Math.max(h * t, 0),
        backgroundColor: color,
        borderRadius: "8px 8px 4px 4px",
      }}
    />
  );
};

/**
 * Layout D — left copy / right charts + phone framed photo
 * (different from split-screen Compare)
 */
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
      delay: 95,
      title: "DÜŞÜK MALİYET",
      body: "Ortalama gider oranı",
      bg: colors.teal,
      icon: <IconCoins color={colors.bg} />,
      counter: true,
    },
    {
      delay: 185,
      title: "LİKİDİTE",
      body: "Borsa saatleri içinde al/sat",
      bg: colors.red,
      icon: <IconBolt color={colors.white} />,
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <SceneExit durationInFrames={dur}>
        <PhotoBackground
          src={SCENE_IMAGES.advantages}
          durationInFrames={dur}
          tint={colors.teal}
          tintOpacity={0.3}
          scaleFrom={1.04}
          scaleTo={1.12}
          panX={-14}
          panY={20}
          vignette={0.78}
        />
        {/* Extra left scrim so kinetic copy stays readable over busy charts */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(90deg, rgba(10,14,23,0.82) 0%, rgba(10,14,23,0.45) 55%, rgba(10,14,23,0.15) 100%)",
            pointerEvents: "none",
          }}
        />
        <MovingGrid />
        <SweepLines />

        <div
          style={{
            position: "absolute",
            top: SAFE.top,
            left: SAFE.side,
            right: SAFE.side,
            bottom: SAFE.bottom,
            display: "flex",
            gap: 16,
            zIndex: 2,
          }}
        >
          <div style={{ flex: 1.25, minWidth: 0 }}>
            <KineticText text="3 NEDEN" fontSize={52} delay={2} />
            <div style={{ height: 6 }} />
            <KineticText
              text="ETF NEDEN TERCİH?"
              fontSize={24}
              color={colors.muted}
              delay={10}
            />
            <div style={{ height: 18 }} />
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
                    backgroundColor: "rgba(26,34,51,0.92)",
                    borderRadius: 16,
                    padding: "12px 12px",
                    opacity: t,
                    transform: `translateX(${interpolate(t, [0, 1], [-32, 0])}px)`,
                  }}
                >
                  <IconPop delay={item.delay} size={58} bg={item.bg}>
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
                        fontSize: 15,
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
                        delay={item.delay + 14}
                        decimals={2}
                        suffix="%"
                        fontSize={34}
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
              flex: 0.85,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              transform: `translateY(${idleY(frame, 3, 14)}px)`,
            }}
          >
            <FramedPhoto
              src={SCENE_IMAGES.advantages}
              delay={24}
              width={260}
              height={320}
              variant="phone"
              tint={colors.yellow}
              rotate={3}
            />
            <div style={{ display: "flex", alignItems: "flex-end", gap: 7, height: 120 }}>
              <BarGrow delay={40} h={70} color={colors.yellow} />
              <BarGrow delay={48} h={100} color={colors.teal} />
              <BarGrow delay={56} h={130} color={colors.red} />
              <BarGrow delay={64} h={90} color={colors.yellow} />
            </div>
            <RingDraw delay={160} />
          </div>
        </div>
      </SceneExit>
    </AbsoluteFill>
  );
};

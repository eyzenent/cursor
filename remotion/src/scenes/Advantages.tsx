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
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";

const Advantage: React.FC<{
  delay: number;
  icon: React.ReactNode;
  bg: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}> = ({ delay, icon, bg, title, body, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: springPop });

  return (
    <div
      style={{
        backgroundColor: colors.card,
        borderRadius: 22,
        padding: "28px 26px",
        marginBottom: 18,
        opacity: t,
        translate: `0px ${interpolate(t, [0, 1], [40, 0])}px`,
        scale: interpolate(t, [0, 1], [0.92, 1]),
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <IconPop delay={delay} size={84} bg={bg}>
          {icon}
        </IconPop>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 36,
              textTransform: "uppercase",
              color: colors.white,
              marginBottom: 6,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: colors.muted }}>
            {body}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

/** SVG pie / ring draw-on for liquidity visual */
const RingDraw: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const r = 28;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" style={{ marginTop: 10 }}>
      <circle cx="36" cy="36" r={r} stroke="#ffffff22" strokeWidth="8" fill="none" />
      <circle
        cx="36"
        cy="36"
        r={r}
        stroke={colors.teal}
        strokeWidth="8"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
      />
    </svg>
  );
};

export const AdvantagesScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: "120px 56px",
        fontFamily: fonts.body,
      }}
    >
      <KineticText text="3 NEDEN" fontSize={80} delay={2} />
      <KineticText
        text="ETF NEDEN TERCİH EDİLİYOR?"
        fontSize={36}
        color={colors.muted}
        delay={12}
      />
      <div style={{ height: 36 }} />

      <Advantage
        delay={28}
        bg={colors.yellow}
        icon={<IconChart color={colors.bg} />}
        title="Çeşitlendirme"
        body="Tek işlemle onlarca / yüzlerce varlık."
      />
      <Advantage
        delay={70}
        bg={colors.teal}
        icon={<IconCoins color={colors.bg} />}
        title="Düşük maliyet"
        body="Ortalama gider oranı:"
      >
        <StatCounter
          to={0.16}
          delay={90}
          decimals={2}
          prefix="%"
          fontSize={52}
          color={colors.yellow}
        />
      </Advantage>
      <Advantage
        delay={130}
        bg={colors.red}
        icon={<IconBolt color={colors.white} />}
        title="Likidite"
        body="Borsa saatleri içinde al / sat."
      >
        <RingDraw delay={150} />
      </Advantage>
    </AbsoluteFill>
  );
};

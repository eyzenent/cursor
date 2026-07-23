import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import { IconBuilding, IconBasket, IconPop } from "../components/IconPop";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";

const Row: React.FC<{
  label: string;
  left: string;
  right: string;
  delay: number;
}> = ({ label, left, right, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - delay, fps, config: springPop });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr 1fr",
        gap: 12,
        opacity: t,
        translate: `0px ${interpolate(t, [0, 1], [30, 0])}px`,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.muted,
          display: "flex",
          alignItems: "center",
        }}
      >
        {label}
      </div>
      <div
        style={{
          backgroundColor: colors.card,
          borderRadius: 14,
          padding: "18px 14px",
          textAlign: "center",
          fontWeight: 800,
          fontSize: 24,
          color: colors.white,
        }}
      >
        {left}
      </div>
      <div
        style={{
          backgroundColor: colors.yellow,
          color: colors.bg,
          borderRadius: 14,
          padding: "18px 14px",
          textAlign: "center",
          fontWeight: 800,
          fontSize: 24,
        }}
      >
        {right}
      </div>
    </div>
  );
};

export const CompareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: "130px 56px",
        fontFamily: fonts.body,
      }}
    >
      <KineticText text="ETF vs HİSSE" fontSize={72} delay={2} />
      <div style={{ height: 36 }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr 1fr",
          gap: 12,
          marginBottom: 18,
          opacity: spring({ frame: frame - 18, fps, config: springPop }),
        }}
      >
        <div />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IconPop delay={18} size={72} bg={colors.card} color={colors.white}>
            <IconBuilding color={colors.white} />
          </IconPop>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IconPop delay={24} size={72} bg={colors.yellow}>
            <IconBasket color={colors.bg} />
          </IconPop>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr 1fr",
          gap: 12,
          marginBottom: 20,
          fontWeight: 800,
          fontSize: 26,
          textTransform: "uppercase",
        }}
      >
        <div />
        <div style={{ textAlign: "center", color: colors.muted }}>Hisse</div>
        <div style={{ textAlign: "center", color: colors.yellow }}>ETF</div>
      </div>

      <Row label="Ne alıyorsun?" left="1 şirket" right="Bir sepet" delay={40} />
      <Row label="Risk" left="Yoğun" right="Dağıtılmış" delay={52} />
      <Row label="İşlem" left="Borsa" right="Borsa" delay={64} />
      <Row label="Çeşitlilik" left="Hayır" right="Hazır" delay={76} />

      <div
        style={{
          marginTop: 28,
          padding: "22px 24px",
          backgroundColor: colors.teal,
          color: colors.bg,
          borderRadius: 14,
          fontWeight: 800,
          fontSize: 28,
          textTransform: "uppercase",
          opacity: spring({ frame: frame - 95, fps, config: springPop }),
          scale: interpolate(
            spring({ frame: frame - 95, fps, config: springPop }),
            [0, 1],
            [0.85, 1],
          ),
        }}
      >
        Hisse gibi alınır. Fon gibi çeşitlenir.
      </div>
    </AbsoluteFill>
  );
};

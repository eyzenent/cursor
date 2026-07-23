import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import { IconPop, IconWarn } from "../components/IconPop";
import { fonts } from "../fonts";
import { colors, springPop } from "../theme";

export const RiskScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 20, fps, config: springPop });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: "150px 64px",
        fontFamily: fonts.body,
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <IconPop delay={4} size={110} bg={colors.red} color={colors.white}>
          <IconWarn color={colors.white} />
        </IconPop>
      </div>

      <KineticText text="AMA..." fontSize={100} delay={10} align="center" color={colors.red} />
      <div style={{ height: 20 }} />
      <KineticText
        text="ETF SİHİR DEĞİL."
        fontSize={52}
        delay={22}
        align="center"
      />

      <div
        style={{
          marginTop: 48,
          backgroundColor: colors.card,
          borderLeft: `10px solid ${colors.red}`,
          borderRadius: 16,
          padding: "32px 28px",
          opacity: t,
          translate: `0px ${interpolate(t, [0, 1], [36, 0])}px`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: colors.white,
            lineHeight: 1.35,
            marginBottom: 20,
          }}
        >
          Piyasa düşerse ETF de düşebilir. Çeşitlendirme riski yok etmez —
          dağıtır.
        </div>
        <HighlightBox
          text="Yatırım tavsiyesi değildir"
          delay={55}
          bg={colors.red}
          color={colors.white}
          fontSize={30}
        />
      </div>
    </AbsoluteFill>
  );
};

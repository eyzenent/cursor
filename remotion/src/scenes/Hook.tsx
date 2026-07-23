import { AbsoluteFill } from "remotion";
import { KineticText } from "../components/KineticText";
import { HighlightBox } from "../components/HighlightBox";
import { StatCounter } from "../components/StatCounter";
import { fonts } from "../fonts";
import { colors } from "../theme";

export const HookScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: "160px 64px",
        justifyContent: "center",
        fontFamily: fonts.body,
      }}
    >
      <KineticText text="ETF NEDİR?" fontSize={96} delay={2} />
      <div style={{ height: 28 }} />
      <KineticText
        text="NEDEN HERKES BAHSEDİYOR?"
        fontSize={56}
        color={colors.muted}
        delay={14}
      />
      <div style={{ height: 56 }} />
      <HighlightBox text="Küresel ETF varlıkları" delay={32} fontSize={34} />
      <div style={{ height: 24 }} />
      <StatCounter to={13} delay={40} suffix=" TRİLYON $" fontSize={88} />
      <div
        style={{
          marginTop: 18,
          fontSize: 28,
          fontWeight: 700,
          color: colors.muted,
          fontFamily: fonts.body,
        }}
      >
        2026 · trilyon dolarlık bir piyasa
      </div>
    </AbsoluteFill>
  );
};

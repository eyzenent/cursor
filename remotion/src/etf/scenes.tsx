import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  BigType,
  BodyType,
  FadeUp,
  HighlightBar,
  Label,
  SceneShell,
} from "./ui";
import { colors, fonts } from "./theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame, [0, 40, 80], [1, 1.04, 1], {
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <SceneShell>
      <FadeUp>
        <Label>60 saniyede</Label>
      </FadeUp>
      <FadeUp delay={6} style={{ scale: pulse }}>
        <BigType size={110}>
          500 şirketi
          <br />
          tek tıkla
          <br />
          almak mümkün mü?
        </BigType>
        <HighlightBar delay={18} width="72%" />
      </FadeUp>
      <FadeUp delay={28}>
        <BodyType color={colors.ink} weight={600}>
          Kısa cevap: evet. Adı ETF.
        </BodyType>
      </FadeUp>
    </SceneShell>
  );
};

export const WhatScene: React.FC = () => {
  return (
    <SceneShell>
      <FadeUp>
        <Label>Tanım</Label>
      </FadeUp>
      <FadeUp delay={4}>
        <BigType size={120}>
          ETF =
          <br />
          Exchange
          <br />
          Traded Fund
        </BigType>
        <HighlightBar delay={14} width="55%" />
      </FadeUp>
      <FadeUp delay={22}>
        <BodyType size={40} color={colors.ink} weight={600}>
          Borsada işlem gören bir yatırım sepeti.
        </BodyType>
      </FadeUp>
      <FadeUp delay={34}>
        <BodyType size={34}>
          Bir hisse alırsın — içeride onlarca, yüzlerce varlık gelir.
        </BodyType>
      </FadeUp>
    </SceneShell>
  );
};

export const BasketScene: React.FC = () => {
  const frame = useCurrentFrame();
  const companies = [
    "AAPL",
    "MSFT",
    "NVDA",
    "AMZN",
    "GOOGL",
    "META",
    "JPM",
    "XOM",
    "JNJ",
    "V",
    "UNH",
    "MA",
  ];

  return (
    <SceneShell>
      <FadeUp>
        <Label>Nasıl çalışır?</Label>
      </FadeUp>
      <FadeUp delay={4}>
        <BigType size={88}>
          Hisse gibi
          <br />
          alıp satarsın.
        </BigType>
      </FadeUp>
      <FadeUp delay={16} style={{ width: "100%", marginTop: 48 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            width: "100%",
          }}
        >
          {companies.map((ticker, i) => {
            const appear = interpolate(frame, [18 + i * 3, 30 + i * 3], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
            });
            return (
              <div
                key={ticker}
                style={{
                  backgroundColor: i === 0 ? colors.yellow : colors.soft,
                  color: colors.ink,
                  borderRadius: 18,
                  padding: "28px 12px",
                  textAlign: "center",
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: 30,
                  letterSpacing: "0.04em",
                  opacity: appear,
                  translate: `0px ${interpolate(
                    frame,
                    [18 + i * 3, 30 + i * 3],
                    [24, 0],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: ease,
                    },
                  )}px`,
                }}
              >
                {ticker}
              </div>
            );
          })}
        </div>
      </FadeUp>
      <FadeUp delay={55}>
        <BodyType size={34} color={colors.ink} weight={600}>
          Tek işlem → tüm sepet.
        </BodyType>
      </FadeUp>
    </SceneShell>
  );
};

export const DiversifyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const barProgress = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <SceneShell bg={colors.dark}>
      <FadeUp>
        <Label dark>Diversifikasyon</Label>
      </FadeUp>
      <FadeUp delay={4}>
        <BigType size={86} color={colors.white}>
          Tek hisse
          <br />
          = tek risk.
        </BigType>
      </FadeUp>
      <FadeUp delay={18}>
        <BigType size={86} color={colors.yellow}>
          ETF
          <br />
          = risk dağılır.
        </BigType>
      </FadeUp>
      <FadeUp delay={34} style={{ width: "100%", marginTop: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { label: "Tek şirket", width: 0.28, tone: "#FF5A5A" },
            { label: "Sektör", width: 0.52, tone: "#FFB020" },
            { label: "Geniş ETF", width: 0.92, tone: colors.yellow },
          ].map((row) => (
            <div key={row.label}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: colors.white,
                  marginBottom: 8,
                  opacity: 0.8,
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  height: 28,
                  backgroundColor: "#22262C",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${row.width * 100 * barProgress}%`,
                    backgroundColor: row.tone,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </SceneShell>
  );
};

export const CostScene: React.FC = () => {
  const frame = useCurrentFrame();

  const cards = [
    {
      title: "ETF",
      value: "%0.16",
      note: "ortalama yıllık",
      highlight: true,
    },
    {
      title: "Aktif fon",
      value: "%0.47",
      note: "neredeyse 3×",
      highlight: false,
    },
  ];

  return (
    <SceneShell>
      <FadeUp>
        <Label>Maliyet</Label>
      </FadeUp>
      <FadeUp delay={4}>
        <BigType size={84}>
          Ucuz
          <br />
          olmak ister.
        </BigType>
        <HighlightBar delay={14} width="48%" />
      </FadeUp>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          marginTop: 48,
        }}
      >
        {cards.map((card, i) => {
          const delay = 22 + i * 12;
          return (
            <div
              key={card.title}
              style={{
                backgroundColor: card.highlight ? colors.yellow : colors.soft,
                borderRadius: 28,
                padding: "36px 40px",
                opacity: interpolate(frame, [delay, delay + 14], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: ease,
                }),
                translate: `0px ${interpolate(
                  frame,
                  [delay, delay + 14],
                  [30, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: ease,
                  },
                )}px`,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 110,
                  lineHeight: 1,
                  marginTop: 8,
                }}
              >
                {card.value}
              </div>
              <div style={{ fontSize: 30, fontWeight: 600, marginTop: 8 }}>
                {card.note}
              </div>
            </div>
          );
        })}
      </div>
      <FadeUp delay={55}>
        <BodyType size={32} color={colors.ink} weight={600}>
          $1.000’da ~$1.60 / yıl. Küçük fark, uzun vadede büyük etki.
        </BodyType>
      </FadeUp>
    </SceneShell>
  );
};

export const TypesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const types = [
    { title: "Hisse", desc: "S&P 500, dünya" },
    { title: "Tahvil", desc: "Faiz & denge" },
    { title: "Sektör", desc: "Teknoloji, enerji" },
    { title: "Emtia", desc: "Altın, petrol" },
  ];

  return (
    <SceneShell bg={colors.dark}>
      <FadeUp>
        <Label dark>Ne var?</Label>
      </FadeUp>
      <FadeUp delay={4}>
        <BigType size={92} color={colors.white}>
          Neredeyse
          <br />
          her piyasaya
          <br />
          bir kapı.
        </BigType>
      </FadeUp>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          width: "100%",
          marginTop: 48,
        }}
      >
        {types.map((item, i) => {
          const delay = 20 + i * 8;
          return (
            <div
              key={item.title}
              style={{
                backgroundColor: i === 0 ? colors.yellow : "#1A1F26",
                color: i === 0 ? colors.ink : colors.white,
                borderRadius: 24,
                padding: "32px 28px",
                opacity: interpolate(frame, [delay, delay + 12], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: ease,
                }),
                translate: `0px ${interpolate(
                  frame,
                  [delay, delay + 12],
                  [24, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: ease,
                  },
                )}px`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 54,
                  lineHeight: 1,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 28,
                  fontWeight: 600,
                  opacity: 0.75,
                }}
              >
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};

export const OutroScene: React.FC = () => {
  return (
    <SceneShell>
      <FadeUp>
        <Label>Özet</Label>
      </FadeUp>
      <FadeUp delay={4}>
        <BigType size={96}>
          Hisse
          <br />
          esnekliği.
        </BigType>
      </FadeUp>
      <FadeUp delay={16}>
        <BigType size={96}>
          Fon
          <br />
          çeşitliliği.
        </BigType>
        <HighlightBar delay={26} width="60%" />
      </FadeUp>
      <FadeUp delay={36}>
        <BodyType size={40} color={colors.ink} weight={700}>
          ETF = ikisinin birleşimi.
        </BodyType>
      </FadeUp>
      <FadeUp delay={48}>
        <BodyType size={34}>
          Başlamak için çoğu zaman tek hisse yeter.
        </BodyType>
      </FadeUp>
      <FadeUp delay={62}>
        <div
          style={{
            marginTop: 40,
            padding: "22px 28px",
            backgroundColor: colors.yellow,
            borderRadius: 18,
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: "0.02em",
            width: "fit-content",
          }}
        >
          Kaydet · Paylaş · Sor
        </div>
      </FadeUp>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 96,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: colors.muted,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Bu içerik yatırım tavsiyesi değildir
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  CountUp,
  DrawBar,
  FloatingOrbs,
  Label,
  SceneShell,
  SlamBlock,
  WordLine,
  clamp,
  out,
  pop,
} from "./ui";
import { FlipCard, PulseRing, SweepLight, TickerTape } from "./motion";
import { colors, fonts } from "./theme";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [78, 86, 100], [0, 1, 0], clamp);
  const titleShake = Math.sin(frame * 0.8) * interpolate(frame, [0, 40], [3, 0], clamp);

  return (
    <SceneShell>
      <FloatingOrbs />
      <TickerTape />
      <PulseRing delay={20} y={520} />
      <PulseRing delay={40} y={720} x={700} />
      <Label>60 saniyede</Label>
      <div style={{ translate: `${titleShake}px 0px`, width: "100%" }}>
        <WordLine words={["500", "şirketi"]} delay={2} size={118} stagger={3} />
        <WordLine words={["tek", "tıkla"]} delay={10} size={118} stagger={3} />
        <WordLine words={["almak", "mümkün", "mü?"]} delay={18} size={118} stagger={3} />
      </div>
      <DrawBar delay={32} width="78%" />
      <SlamBlock delay={42} from="bottom" style={{ width: "100%", marginTop: 36 }}>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.ink,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              backgroundColor: colors.yellow,
              padding: "10px 18px",
              borderRadius: 12,
              scale: interpolate(frame, [42, 55], [0.4, 1], {
                ...clamp,
                easing: pop,
              }),
              rotate: `${interpolate(frame, [42, 55], [-20, 0], {
                ...clamp,
                easing: pop,
              })}deg`,
            }}
          >
            Evet.
          </span>
          <span
            style={{
              opacity: interpolate(frame, [52, 64], [0, 1], clamp),
              translate: `${interpolate(frame, [52, 64], [40, 0], clamp)}px 0px`,
            }}
          >
            Adı ETF.
          </span>
        </div>
      </SlamBlock>
      <SweepLight delay={60} />
      <AbsoluteFill
        style={{
          backgroundColor: colors.yellow,
          opacity: flash * 0.4,
          pointerEvents: "none",
        }}
      />
    </SceneShell>
  );
};

export const WhatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const letters = ["E", "T", "F"];

  return (
    <SceneShell>
      <FloatingOrbs />
      <TickerTape />
      <Label>Tanım</Label>
      <div style={{ display: "flex", gap: 18, width: "100%", marginBottom: 28 }}>
        {letters.map((letter, i) => {
          const start = 4 + i * 7;
          const p = interpolate(frame, [start, start + 12], [0, 1], {
            ...clamp,
            easing: pop,
          });
          const bounce =
            Math.sin((frame - start) / 8) *
            interpolate(frame, [start + 12, start + 50], [14, 4], clamp);
          return (
            <div
              key={letter}
              style={{
                width: 180,
                height: 180,
                borderRadius: 28,
                backgroundColor: i === 1 ? colors.yellow : colors.ink,
                color: i === 1 ? colors.ink : colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fonts.display,
                fontSize: 110,
                opacity: p,
                scale: p,
                translate: `0px ${bounce}px`,
                rotate: `${interpolate(p, [0, 1], [-30, 0])}deg`,
                boxShadow:
                  i === 1
                    ? `0 ${12 + Math.sin(frame / 6) * 6}px 0 rgba(0,0,0,0.12)`
                    : undefined,
              }}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <WordLine words={["Exchange", "Traded", "Fund"]} delay={30} size={70} stagger={4} />
      <SlamBlock delay={48} from="left" style={{ width: "100%", marginTop: 34 }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            lineHeight: 1.3,
            backgroundColor: colors.soft,
            padding: "28px 32px",
            borderRadius: 24,
            borderLeft: `10px solid ${colors.yellow}`,
            translate: `0px ${Math.sin(frame / 18) * 4}px`,
          }}
        >
          Borsada işlem gören bir yatırım sepeti.
          <br />
          <span style={{ color: colors.muted, fontWeight: 600, fontSize: 30 }}>
            Bir hisse al → içeride yüzlerce varlık.
          </span>
        </div>
      </SlamBlock>
      <SweepLight delay={55} />
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

  const pull = interpolate(frame, [55, 95], [0, 1], {
    ...clamp,
    easing: out,
  });
  const swirl = (frame / 40) * pull;

  return (
    <SceneShell>
      <TickerTape speed={3} />
      <Label>Nasıl çalışır?</Label>
      <WordLine words={["Hisse", "gibi"]} delay={1} size={92} stagger={3} />
      <WordLine words={["alıp", "satarsın."]} delay={8} size={92} stagger={3} />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 640,
          marginTop: 28,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 10,
            width: interpolate(pull, [0, 1], [0, 540]),
            height: interpolate(pull, [0, 1], [0, 170]),
            marginLeft: interpolate(pull, [0, 1], [0, -270]),
            border: `8px solid ${colors.ink}`,
            borderTop: "none",
            borderRadius: "0 0 48px 48px",
            opacity: pull,
            background: `linear-gradient(180deg, transparent, ${colors.yellow}66)`,
            scale: `${1 + Math.sin(frame / 10) * 0.02 * pull} ${1 + Math.sin(frame / 10) * 0.02 * pull}`,
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            width: "100%",
          }}
        >
          {companies.map((ticker, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const start = 14 + i * 2;
            const appear = interpolate(frame, [start, start + 10], [0, 1], {
              ...clamp,
              easing: pop,
            });
            const angle = swirl + i * 0.4;
            const orbit = pull * 30;
            const targetX = (1 - col) * 170 + Math.cos(angle) * orbit;
            const targetY = (3 - row) * 95 + 90 + Math.sin(angle) * orbit;
            const flyX = interpolate(pull, [0, 1], [0, targetX]);
            const flyY = interpolate(pull, [0, 1], [0, targetY]);
            const shrink = interpolate(pull, [0, 1], [1, 0.5]);

            return (
              <div
                key={ticker}
                style={{
                  backgroundColor: i % 4 === 0 ? colors.yellow : colors.soft,
                  color: colors.ink,
                  borderRadius: 18,
                  padding: "26px 10px",
                  textAlign: "center",
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: 28,
                  letterSpacing: "0.04em",
                  opacity: appear,
                  scale: appear * shrink,
                  translate: `${flyX}px ${flyY + interpolate(appear, [0, 1], [50, 0])}px`,
                  rotate: `${interpolate(pull, [0, 1], [0, (i % 2 === 0 ? -1 : 1) * 18])}deg`,
                }}
              >
                {ticker}
              </div>
            );
          })}
        </div>
      </div>

      <SlamBlock delay={100} from="bottom" style={{ width: "100%" }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            textAlign: "center",
            backgroundColor: colors.ink,
            color: colors.white,
            padding: "22px 28px",
            borderRadius: 18,
            scale: `${1 + Math.sin(frame / 8) * 0.015}`,
          }}
        >
          Tek işlem → tüm sepet
        </div>
      </SlamBlock>
    </SceneShell>
  );
};

export const DiversifyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const split = interpolate(frame, [28, 58], [0, 1], {
    ...clamp,
    easing: out,
  });
  const spin = frame / 35;

  const dots = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2 + spin * split;
    const radius = 230 * split;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });

  return (
    <SceneShell bg={colors.dark}>
      <FloatingOrbs dark />
      <TickerTape dark speed={2.8} top={100} />
      <Label dark>Diversifikasyon</Label>
      <WordLine
        words={["Tek", "hisse", "=", "tek", "risk."]}
        delay={1}
        size={76}
        color={colors.white}
        stagger={3}
      />
      <WordLine
        words={["ETF", "=", "risk", "dağılır."]}
        delay={16}
        size={76}
        color={colors.yellow}
        stagger={3}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 540,
          marginTop: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PulseRing delay={30} y={270} x={540} color="#FF4D4D" />
        <div
          style={{
            position: "absolute",
            width: interpolate(split, [0, 1], [300, 64]),
            height: interpolate(split, [0, 1], [300, 64]),
            borderRadius: "50%",
            backgroundColor: "#FF4D4D",
            scale: interpolate(frame, [6, 22], [0, 1], {
              ...clamp,
              easing: pop,
            }),
            boxShadow: `0 0 ${40 + Math.sin(frame / 5) * 20}px #FF4D4D88`,
          }}
        />
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 54,
              height: 54,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? colors.yellow : "#3D8BFF",
              translate: `${d.x}px ${d.y}px`,
              opacity: split,
              scale: split * (1 + Math.sin(frame / 7 + i) * 0.08),
            }}
          />
        ))}
      </div>

      <SlamBlock delay={70} from="bottom" style={{ width: "100%" }}>
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Bir şirket düşer → sepet ayakta kalır
        </div>
      </SlamBlock>
    </SceneShell>
  );
};

export const CostScene: React.FC = () => {
  const frame = useCurrentFrame();
  const etfH = interpolate(frame, [24, 60], [0, 300], {
    ...clamp,
    easing: out,
  });
  const activeH = interpolate(frame, [36, 75], [0, 540], {
    ...clamp,
    easing: out,
  });
  const bounce = Math.sin(frame / 9) * 6;

  return (
    <SceneShell>
      <TickerTape speed={2.5} />
      <Label>Maliyet</Label>
      <WordLine words={["Ucuz", "olmak"]} delay={1} size={96} stagger={3} />
      <WordLine words={["ister."]} delay={8} size={96} />
      <DrawBar delay={16} width="42%" />

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 48,
          width: "100%",
          height: 580,
          marginTop: 32,
        }}
      >
        <div style={{ width: 280, textAlign: "center" }}>
          <div
            style={{
              height: Math.max(etfH + bounce * 0.3, 0),
              backgroundColor: colors.yellow,
              borderRadius: "28px 28px 12px 12px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 24,
              boxShadow: "0 18px 0 rgba(0,0,0,0.08)",
            }}
          >
            <CountUp to={0.16} delay={28} prefix="%" decimals={2} size={64} />
          </div>
          <div style={{ marginTop: 18, fontWeight: 800, fontSize: 30, letterSpacing: "0.08em" }}>
            ETF
          </div>
          <div style={{ color: colors.muted, fontWeight: 600, fontSize: 24 }}>
            ortalama / yıl
          </div>
        </div>

        <div style={{ width: 280, textAlign: "center" }}>
          <div
            style={{
              height: Math.max(activeH + bounce * 0.5, 0),
              backgroundColor: colors.ink,
              color: colors.white,
              borderRadius: "28px 28px 12px 12px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 24,
            }}
          >
            <CountUp
              to={0.47}
              delay={40}
              prefix="%"
              decimals={2}
              size={64}
              color={colors.white}
            />
          </div>
          <div style={{ marginTop: 18, fontWeight: 800, fontSize: 30, letterSpacing: "0.08em" }}>
            AKTİF FON
          </div>
          <div style={{ color: colors.muted, fontWeight: 600, fontSize: 24 }}>
            neredeyse 3×
          </div>
        </div>
      </div>

      <SlamBlock delay={85} from="bottom" style={{ width: "100%" }}>
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            backgroundColor: colors.soft,
            padding: "20px 24px",
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          $1.000 → ~$1.60/yıl. Küçük fark, uzun vadede büyük.
        </div>
      </SlamBlock>
      <SweepLight delay={70} />
    </SceneShell>
  );
};

export const TypesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const types = [
    { title: "Hisse", desc: "S&P 500, dünya", color: colors.yellow },
    { title: "Tahvil", desc: "Faiz & denge", color: "#2DD4BF" },
    { title: "Sektör", desc: "Tech, enerji", color: "#60A5FA" },
    { title: "Emtia", desc: "Altın, petrol", color: "#F97316" },
  ];

  return (
    <SceneShell bg={colors.dark}>
      <FloatingOrbs dark />
      <TickerTape dark speed={3.2} />
      <Label dark>Ne var?</Label>
      <WordLine words={["Neredeyse", "her"]} delay={1} size={84} color={colors.white} stagger={3} />
      <WordLine words={["piyasaya", "bir", "kapı."]} delay={10} size={84} color={colors.white} stagger={3} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          width: "100%",
          marginTop: 44,
        }}
      >
        {types.map((item, i) => {
          const delay = 22 + i * 6;
          const hover = Math.sin(frame / 10 + i) * 8;
          return (
            <FlipCard
              key={item.title}
              delay={delay}
              style={{
                backgroundColor: item.color,
                color: colors.ink,
                borderRadius: 28,
                padding: "36px 28px",
                translate: `0px ${hover}px`,
              }}
            >
              <div style={{ fontFamily: fonts.display, fontSize: 58, lineHeight: 1 }}>
                {item.title}
              </div>
              <div style={{ marginTop: 14, fontSize: 28, fontWeight: 700, opacity: 0.8 }}>
                {item.desc}
              </div>
            </FlipCard>
          );
        })}
      </div>
    </SceneShell>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const stamp = interpolate(frame, [55, 72], [0, 1], {
    ...clamp,
    easing: pop,
  });

  return (
    <SceneShell>
      <FloatingOrbs />
      <TickerTape speed={2} />
      <PulseRing delay={50} y={1100} />
      <Label>Özet</Label>
      <WordLine words={["Hisse", "esnekliği."]} delay={1} size={100} stagger={3} />
      <WordLine words={["Fon", "çeşitliliği."]} delay={12} size={100} stagger={3} />
      <DrawBar delay={26} width="62%" />

      <SlamBlock delay={34} from="left" style={{ width: "100%", marginTop: 28 }}>
        <div style={{ fontSize: 42, fontWeight: 800 }}>
          ETF = ikisinin birleşimi.
        </div>
      </SlamBlock>
      <SlamBlock delay={44} from="right" style={{ width: "100%", marginTop: 14 }}>
        <div style={{ fontSize: 32, fontWeight: 600, color: colors.muted }}>
          Başlamak için çoğu zaman tek hisse yeter.
        </div>
      </SlamBlock>

      <div
        style={{
          marginTop: 48,
          padding: "24px 32px",
          backgroundColor: colors.yellow,
          borderRadius: 20,
          fontWeight: 800,
          fontSize: 32,
          width: "fit-content",
          opacity: stamp,
          scale: stamp * (1 + Math.sin(frame / 7) * 0.03),
          rotate: `${interpolate(stamp, [0, 1], [-22, 0])}deg`,
          boxShadow: "0 16px 0 rgba(0,0,0,0.12)",
        }}
      >
        Kaydet · Paylaş · Sor
      </div>

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 88,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: colors.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: interpolate(frame, [85, 105], [0, 1], clamp),
          }}
        >
          Bu içerik yatırım tavsiyesi değildir
        </div>
      </AbsoluteFill>
      <SweepLight delay={60} />
    </SceneShell>
  );
};

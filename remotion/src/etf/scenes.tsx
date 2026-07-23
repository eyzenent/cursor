import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  ChapterLabel,
  DocBody,
  DocShell,
  DocTitle,
  LowerThird,
  clamp,
  out,
  soft,
} from "./ui";
import { colors, fonts } from "./theme";

export const OpenScene: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [20, 50], [0, 1], { ...clamp, easing: out });
  const fadeIn = interpolate(frame, [0, 30], [0, 1], clamp);

  return (
    <DocShell>
      <AbsoluteFill
        style={{
          opacity: fadeIn,
          justifyContent: "center",
          padding: "140px 72px",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: colors.amber,
            fontWeight: 600,
            marginBottom: 40,
            opacity: interpolate(frame, [8, 28], [0, 1], clamp),
          }}
        >
          Belgesel · 60 saniye
        </div>
        <DocTitle
          lines={["ETF:", "Modern yatırımın", "görünmeyen", "altyapısı"]}
          delay={18}
          size={78}
        />
        <div
          style={{
            marginTop: 40,
            width: interpolate(line, [0, 1], [0, 180]),
            height: 2,
            backgroundColor: colors.amber,
          }}
        />
        <DocBody delay={55}>
          Borsada işlem gören fonlar, son otuz yılda
          yatırımcının portföyünü nasıl dönüştürdü?
        </DocBody>
      </AbsoluteFill>
    </DocShell>
  );
};

export const DefinitionScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <DocShell>
      <ChapterLabel chapter="01  ·  Tanım" />
      <DocTitle
        lines={["Bir hisse alırsınız.", "Bir sepet sahip olursunuz."]}
        delay={8}
        size={64}
      />
      <DocBody delay={40}>
        ETF — Exchange Traded Fund. Borsada gün içinde alınıp satılan,
        içinde onlarca veya yüzlerce varlık barındıran bir yatırım aracı.
      </DocBody>

      <div
        style={{
          marginTop: 56,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {["Hisse", "Tahvil", "Emtia", "Endeks"].map((tag, i) => {
          const p = interpolate(frame, [70 + i * 8, 90 + i * 8], [0, 1], {
            ...clamp,
            easing: out,
          });
          return (
            <div
              key={tag}
              style={{
                padding: "14px 22px",
                border: `1px solid ${colors.line}`,
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 600,
                color: colors.paper,
                opacity: p,
                translate: `0px ${interpolate(p, [0, 1], [12, 0])}px`,
              }}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <LowerThird
        title="Exchange Traded Fund"
        subtitle="1993’ten bu yana büyüyen bir piyasa"
        delay={95}
      />
    </DocShell>
  );
};

export const MechanismScene: React.FC = () => {
  const frame = useCurrentFrame();
  const companies = ["AAPL", "MSFT", "NVDA", "AMZN", "JPM", "XOM", "JNJ", "V"];
  const fill = interpolate(frame, [40, 100], [0, 1], {
    ...clamp,
    easing: soft,
  });

  return (
    <DocShell>
      <ChapterLabel chapter="02  ·  Mekanizma" />
      <DocTitle lines={["Tek işlem.", "Geniş maruziyet."]} delay={6} size={70} />
      <DocBody delay={34}>
        ETF’yi bir hisse gibi alırsınız. Fiyat gün içinde değişir.
        Ama satın aldığınız şey, tek bir şirket değil — bir portföydür.
      </DocBody>

      <div
        style={{
          marginTop: 48,
          position: "relative",
          height: 420,
          border: `1px solid ${colors.line}`,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: colors.bgSoft,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent, ${colors.amber}18)`,
            opacity: fill,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 28,
            fontSize: 20,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: colors.muted,
            fontWeight: 600,
          }}
        >
          Örnek sepet
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            padding: "72px 28px 28px",
          }}
        >
          {companies.map((t, i) => {
            const p = interpolate(frame, [50 + i * 6, 70 + i * 6], [0, 1], {
              ...clamp,
              easing: out,
            });
            return (
              <div
                key={t}
                style={{
                  textAlign: "center",
                  padding: "22px 8px",
                  borderRadius: 12,
                  backgroundColor: "#1B2530",
                  border: `1px solid ${colors.line}`,
                  fontWeight: 700,
                  fontSize: 24,
                  letterSpacing: "0.04em",
                  opacity: p * fill,
                  translate: `0px ${interpolate(p, [0, 1], [18, 0])}px`,
                }}
              >
                {t}
              </div>
            );
          })}
        </div>
      </div>
    </DocShell>
  );
};

export const DiversifyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const spread = interpolate(frame, [35, 90], [0, 1], {
    ...clamp,
    easing: soft,
  });

  return (
    <DocShell>
      <ChapterLabel chapter="03  ·  Risk" />
      <DocTitle
        lines={["Çeşitlendirme,", "hazır pakette."]}
        delay={6}
        size={68}
      />
      <DocBody delay={36}>
        Tek hisse, tek risk demektir. ETF ise yüzlerce varlığa dağıtılmış
        bir maruziyet sunar — bir şirketin düşüşü, tüm portföyü yıkmaz.
      </DocBody>

      <div
        style={{
          marginTop: 56,
          height: 360,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: interpolate(spread, [0, 1], [220, 70]),
            height: interpolate(spread, [0, 1], [220, 70]),
            borderRadius: "50%",
            backgroundColor: colors.danger,
            opacity: interpolate(frame, [10, 30], [0, 1], clamp),
            boxShadow: `0 0 ${30 + Math.sin(frame / 12) * 10}px ${colors.danger}55`,
          }}
        />
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const r = 200 * spread;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: i % 2 === 0 ? colors.amber : colors.teal,
                opacity: spread,
                translate: `${Math.cos(angle) * r}px ${Math.sin(angle) * r}px`,
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 26,
          color: colors.muted,
          fontWeight: 500,
          opacity: interpolate(frame, [95, 115], [0, 1], clamp),
        }}
      >
        Tek nokta riski → dağıtılmış risk
      </div>
    </DocShell>
  );
};

export const CostScene: React.FC = () => {
  const frame = useCurrentFrame();
  const etf = interpolate(frame, [40, 90], [0, 0.16], {
    ...clamp,
    easing: soft,
  });
  const active = interpolate(frame, [50, 105], [0, 0.47], {
    ...clamp,
    easing: soft,
  });

  return (
    <DocShell light>
      <ChapterLabel chapter="04  ·  Maliyet" />
      <DocTitle
        lines={["Düşük maliyet,", "uzun vadede güç."]}
        delay={6}
        size={64}
        light
      />
      <DocBody delay={36} light>
        Ortalama ETF gider oranı yaklaşık %0.16 / yıl.
        Aktif yönetilen fonlarda bu rakam ~%0.47 civarında.
      </DocBody>

      <div
        style={{
          marginTop: 52,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {[
          { label: "ETF", value: etf, max: 0.5, color: colors.amber },
          { label: "Aktif fon", value: active, max: 0.5, color: colors.ink },
        ].map((row) => (
          <div key={row.label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                fontWeight: 700,
                fontSize: 26,
              }}
            >
              <span>{row.label}</span>
              <span style={{ fontFamily: fonts.display }}>
                %{row.value.toFixed(2)}
              </span>
            </div>
            <div
              style={{
                height: 14,
                backgroundColor: "#D9D3C6",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(row.value / row.max) * 100}%`,
                  backgroundColor: row.color,
                  borderRadius: 99,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 26,
          fontWeight: 600,
          color: "#4A5560",
          opacity: interpolate(frame, [110, 130], [0, 1], clamp),
        }}
      >
        $1.000 yatırımda ETF maliyeti ≈ $1.60 / yıl
      </div>
    </DocShell>
  );
};

export const LandscapeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    { title: "Hisse ETF", desc: "S&P 500, küresel piyasalar" },
    { title: "Tahvil ETF", desc: "Faiz ve denge için" },
    { title: "Sektör ETF", desc: "Teknoloji, enerji, sağlık" },
    { title: "Emtia ETF", desc: "Altın, petrol ve daha fazlası" },
  ];

  return (
    <DocShell>
      <ChapterLabel chapter="05  ·  Manzara" />
      <DocTitle
        lines={["Neredeyse her", "piyasaya bir kapı."]}
        delay={6}
        size={66}
      />
      <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 18 }}>
        {items.map((item, i) => {
          const p = interpolate(frame, [35 + i * 10, 55 + i * 10], [0, 1], {
            ...clamp,
            easing: out,
          });
          return (
            <div
              key={item.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "26px 28px",
                borderTop: `1px solid ${colors.line}`,
                opacity: p,
                translate: `0px ${interpolate(p, [0, 1], [16, 0])}px`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 28,
                  color: colors.amber,
                  width: 48,
                }}
              >
                0{i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{item.title}</div>
                <div style={{ fontSize: 24, color: colors.muted, marginTop: 4 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DocShell>
  );
};

export const CloseScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <DocShell>
      <ChapterLabel chapter="Sonuç" delay={4} />
      <DocTitle
        lines={["Hisse esnekliği.", "Fon çeşitliliği.", "İkisinin birleşimi."]}
        delay={12}
        size={64}
      />
      <DocBody delay={55}>
        ETF, erişilebilir bir yapı taşıdır. Başlamak için çoğu zaman
        tek bir pay yeterlidir — ama seçim, araştırma ister.
      </DocBody>
      <div
        style={{
          marginTop: 56,
          padding: "22px 26px",
          border: `1px solid ${colors.line}`,
          borderRadius: 14,
          fontSize: 22,
          color: colors.muted,
          lineHeight: 1.5,
          opacity: interpolate(frame, [90, 115], [0, 1], clamp),
        }}
      >
        Bu içerik yatırım tavsiyesi değildir. Geçmiş performans geleceğin
        garantisi değildir. Müzik: Chad Crouch — Shipping Lanes (CC BY).
      </div>
    </DocShell>
  );
};

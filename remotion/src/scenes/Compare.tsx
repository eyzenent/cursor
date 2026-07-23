import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import { IconBasket, IconBuilding } from "../components/IconPop";
import {
  CameraZoom,
  MovingGrid,
  SafeStage,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, colors, springPop } from "../theme";

const rows = [
  { label: "Ne alıyorsun?", left: "1 şirket", right: "Bir sepet" },
  { label: "Risk", left: "Yoğun", right: "Dağıtılmış" },
  { label: "İşlem", left: "Borsa", right: "Borsa" },
  { label: "Çeşitlilik", left: "Hayır", right: "Hazır" },
];

/** Split-screen fully inside safe zone */
export const CompareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.compare;
  const leftIn = spring({ frame: frame - 4, fps, config: springPop });
  const rightIn = spring({ frame: frame - 10, fps, config: springPop });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1} to={1.04}>
        <MovingGrid />
      </CameraZoom>

      <SafeStage justify="flex-start">
        <KineticText text="ETF vs HİSSE" fontSize={52} delay={2} />

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 12,
            marginTop: 20,
            marginBottom: 16,
            minHeight: 0,
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: "20px 16px",
              opacity: leftIn,
              transform: `translateX(${interpolate(leftIn, [0, 1], [-36, 0])}px)`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#2A3348",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconBuilding color={colors.white} />
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 28,
                  color: colors.muted,
                }}
              >
                HİSSE
              </div>
            </div>
            {rows.map((r, i) => {
              const t = spring({
                frame: frame - (28 + i * 7),
                fps,
                config: springPop,
              });
              return (
                <div
                  key={r.label}
                  style={{
                    marginBottom: 10,
                    opacity: t,
                    transform: `translateY(${interpolate(t, [0, 1], [12, 0])}px)`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      color: colors.muted,
                      marginBottom: 3,
                      fontWeight: 600,
                      fontFamily: fonts.body,
                    }}
                  >
                    {r.label}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#141C2B",
                      borderRadius: 10,
                      padding: "10px 12px",
                      fontWeight: 800,
                      fontSize: 20,
                      color: colors.white,
                      fontFamily: fonts.body,
                    }}
                  >
                    {r.left}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: colors.yellow,
              borderRadius: 20,
              padding: "20px 16px",
              opacity: rightIn,
              transform: `translateX(${interpolate(rightIn, [0, 1], [36, 0])}px)`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: colors.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconBasket color={colors.yellow} />
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 28,
                  color: colors.bg,
                }}
              >
                ETF
              </div>
            </div>
            {rows.map((r, i) => {
              const t = spring({
                frame: frame - (34 + i * 7),
                fps,
                config: springPop,
              });
              return (
                <div
                  key={r.label}
                  style={{
                    marginBottom: 10,
                    opacity: t,
                    transform: `translateY(${interpolate(t, [0, 1], [12, 0])}px)`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      color: "#5A4A10",
                      marginBottom: 3,
                      fontWeight: 700,
                      fontFamily: fonts.body,
                    }}
                  >
                    {r.label}
                  </div>
                  <div
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.yellow,
                      borderRadius: 10,
                      padding: "10px 12px",
                      fontWeight: 800,
                      fontSize: 20,
                      fontFamily: fonts.body,
                    }}
                  >
                    {r.right}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.teal,
            color: colors.bg,
            borderRadius: 14,
            padding: "14px 16px",
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 22,
            textAlign: "center",
            opacity: spring({ frame: frame - 95, fps, config: springPop }),
            transform: `translateY(${idleY(frame, 1.5, 12)}px)`,
          }}
        >
          {("Hisse gibi alınır. Fon gibi çeşitlenir.").toLocaleUpperCase("tr-TR")}
        </div>
      </SafeStage>
    </AbsoluteFill>
  );
};

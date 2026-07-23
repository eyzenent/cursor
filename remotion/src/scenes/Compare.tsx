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
  idleR,
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

/** Layout: true split-screen */
export const CompareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.compare;

  const leftIn = spring({ frame: frame - 4, fps, config: springPop });
  const rightIn = spring({ frame: frame - 10, fps, config: springPop });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <CameraZoom durationInFrames={dur} from={1} to={1.06}>
        <MovingGrid />
      </CameraZoom>

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 48,
          right: 48,
          zIndex: 5,
        }}
      >
        <KineticText text="ETF vs HİSSE" fontSize={64} delay={2} exitAfter={80} />
      </div>

      {/* Split panels */}
      <div
        style={{
          position: "absolute",
          inset: "200px 0 120px",
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: colors.card,
            padding: "36px 28px",
            borderRight: `3px solid ${colors.bg}`,
            translate: `${interpolate(leftIn, [0, 1], [-540, 0])}px 0px`,
            opacity: leftIn,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
              translate: `0px ${idleY(frame, 2, 11)}px`,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: "#2A3348",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                rotate: `${idleR(frame, 3, 15)}deg`,
              }}
            >
              <IconBuilding color={colors.white} />
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 36,
                color: colors.muted,
              }}
            >
              HİSSE
            </div>
          </div>
          {rows.map((r, i) => {
            const t = spring({
              frame: frame - (35 + i * 8),
              fps,
              config: springPop,
            });
            return (
              <div
                key={r.label}
                style={{
                  marginBottom: 16,
                  opacity: t,
                  translate: `0px ${interpolate(t, [0, 1], [24, 0])}px`,
                }}
              >
                <div style={{ fontSize: 20, color: colors.muted, marginBottom: 6 }}>
                  {r.label}
                </div>
                <div
                  style={{
                    backgroundColor: "#141C2B",
                    borderRadius: 12,
                    padding: "16px 14px",
                    fontWeight: 800,
                    fontSize: 26,
                    color: colors.white,
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
            padding: "36px 28px",
            translate: `${interpolate(rightIn, [0, 1], [540, 0])}px 0px`,
            opacity: rightIn,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
              translate: `0px ${idleY(frame + 4, 2, 10)}px`,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: colors.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                rotate: `${idleR(frame + 6, 3, 13)}deg`,
              }}
            >
              <IconBasket color={colors.yellow} />
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 36,
                color: colors.bg,
              }}
            >
              ETF
            </div>
          </div>
          {rows.map((r, i) => {
            const t = spring({
              frame: frame - (42 + i * 8),
              fps,
              config: springPop,
            });
            return (
              <div
                key={r.label}
                style={{
                  marginBottom: 16,
                  opacity: t,
                  translate: `0px ${interpolate(t, [0, 1], [24, 0])}px`,
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "#5A4A10",
                    marginBottom: 6,
                    fontWeight: 700,
                  }}
                >
                  {r.label}
                </div>
                <div
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.yellow,
                    borderRadius: 12,
                    padding: "16px 14px",
                    fontWeight: 800,
                    fontSize: 26,
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
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 100,
          backgroundColor: colors.teal,
          color: colors.bg,
          borderRadius: 14,
          padding: "20px 22px",
          fontFamily: fonts.display,
          fontSize: 28,
          textTransform: "uppercase",
          textAlign: "center",
          opacity: spring({ frame: frame - 110, fps, config: springPop }),
          scale: interpolate(
            spring({ frame: frame - 110, fps, config: springPop }),
            [0, 1],
            [0.85, 1],
          ),
          translate: `0px ${idleY(frame, 2, 9)}px`,
        }}
      >
        Hisse gibi alınır. Fon gibi çeşitlenir.
      </div>
    </AbsoluteFill>
  );
};

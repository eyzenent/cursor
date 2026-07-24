import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticText } from "../components/KineticText";
import { FramedPhoto } from "../components/FramedPhoto";
import { IconBasket, IconBuilding } from "../components/IconPop";
import { PhotoBackground } from "../components/PhotoBackground";
import {
  MovingGrid,
  SAFE,
  SceneExit,
  idleY,
} from "../components/motion";
import { fonts } from "../fonts";
import { SCENE_DURATIONS, SCENE_IMAGES, colors, springPop } from "../theme";

const rows = [
  { label: "Ne alıyorsun?", left: "1 şirket", right: "Bir sepet" },
  { label: "Risk", left: "Yoğun", right: "Dağıtılmış" },
  { label: "İşlem", left: "Borsa", right: "Borsa" },
  { label: "Çeşitlilik", left: "Hayır", right: "Hazır" },
];

/**
 * Layout C — split-screen comparison + framed photo inset
 */
export const CompareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.compare;
  const leftIn = spring({ frame: frame - 4, fps, config: springPop });
  const rightIn = spring({ frame: frame - 10, fps, config: springPop });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      <SceneExit durationInFrames={dur}>
        <PhotoBackground
          src={SCENE_IMAGES.compare}
          durationInFrames={dur}
          tint={colors.teal}
          tintOpacity={0.28}
          scaleFrom={1}
          scaleTo={1.08}
          panY={16}
          vignette={0.7}
        />
        <MovingGrid />

        <div
          style={{
            position: "absolute",
            top: SAFE.top,
            left: SAFE.side,
            right: SAFE.side,
            bottom: SAFE.bottom,
            display: "flex",
            flexDirection: "column",
            zIndex: 2,
          }}
        >
          <KineticText text="ETF vs HİSSE" fontSize={48} delay={2} />

          <div
            style={{
              flex: 1,
              display: "flex",
              gap: 12,
              marginTop: 18,
              minHeight: 0,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(26,34,51,0.92)",
                borderRadius: 18,
                padding: "16px 14px",
                opacity: leftIn,
                transform: `translateX(${interpolate(leftIn, [0, 1], [-36, 0])}px) translateY(${idleY(frame, 1.5, 15)}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "#2A3348",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconBuilding color={colors.white} />
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 26, color: colors.muted }}>
                  HİSSE
                </div>
              </div>
              {rows.map((r, i) => {
                const t = spring({ frame: frame - (22 + i * 6), fps, config: springPop });
                return (
                  <div
                    key={r.label}
                    style={{
                      marginBottom: 8,
                      opacity: t,
                      transform: `translateY(${interpolate(t, [0, 1], [12, 0])}px)`,
                    }}
                  >
                    <div style={{ fontSize: 14, color: colors.muted, marginBottom: 2, fontWeight: 600, fontFamily: fonts.body }}>
                      {r.label}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#141C2B",
                        borderRadius: 10,
                        padding: "9px 11px",
                        fontWeight: 800,
                        fontSize: 18,
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
                borderRadius: 18,
                padding: "16px 14px",
                opacity: rightIn,
                transform: `translateX(${interpolate(rightIn, [0, 1], [36, 0])}px) translateY(${idleY(frame + 8, 1.5, 14)}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: colors.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconBasket color={colors.yellow} />
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 26, color: colors.bg }}>
                  ETF
                </div>
              </div>
              {rows.map((r, i) => {
                const t = spring({ frame: frame - (28 + i * 6), fps, config: springPop });
                return (
                  <div
                    key={r.label}
                    style={{
                      marginBottom: 8,
                      opacity: t,
                      transform: `translateY(${interpolate(t, [0, 1], [12, 0])}px)`,
                    }}
                  >
                    <div style={{ fontSize: 14, color: "#5A4A10", marginBottom: 2, fontWeight: 700, fontFamily: fonts.body }}>
                      {r.label}
                    </div>
                    <div
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.yellow,
                        borderRadius: 10,
                        padding: "9px 11px",
                        fontWeight: 800,
                        fontSize: 18,
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

          {/* Framed photo — real-world inset */}
          <div
            style={{
              position: "absolute",
              right: -8,
              bottom: 70,
              zIndex: 4,
              opacity: spring({ frame: frame - 70, fps, config: springPop }),
            }}
          >
            <FramedPhoto
              src={SCENE_IMAGES.compare}
              delay={70}
              width={200}
              height={140}
              variant="polaroid"
              tint={colors.teal}
              rotate={6}
            />
          </div>

          <div
            style={{
              marginTop: 14,
              backgroundColor: colors.teal,
              color: colors.bg,
              borderRadius: 14,
              padding: "13px 14px",
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 20,
              textAlign: "center",
              opacity: spring({ frame: frame - 80, fps, config: springPop }),
              transform: `translateY(${idleY(frame, 1.5, 12)}px)`,
            }}
          >
            {("Hisse gibi alınır. Fon gibi çeşitlenir.").toLocaleUpperCase("tr-TR")}
          </div>
        </div>
      </SceneExit>
    </AbsoluteFill>
  );
};

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors, fonts } from "./theme";

export const out = Easing.bezier(0.22, 1, 0.36, 1);
export const soft = Easing.bezier(0.45, 0, 0.55, 1);
export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => {
  const frame = useCurrentFrame();
  const shift = (frame * 17) % 100;

  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        backgroundImage: `repeating-radial-gradient(circle at ${shift}% ${50 - shift * 0.3}%, #fff 0 0.5px, transparent 1px 3px)`,
        backgroundSize: "120px 120px",
      }}
    />
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

export const DocShell: React.FC<{
  children: React.ReactNode;
  light?: boolean;
}> = ({ children, light }) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 180], [1.06, 1], {
    ...clamp,
    easing: soft,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: light ? colors.cream : colors.bg,
        color: light ? colors.ink : colors.white,
        overflow: "hidden",
      }}
    >
      {!light && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #1a2836 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #162028 0%, transparent 50%)",
          }}
        />
      )}
      <AbsoluteFill
        style={{
          scale: zoom,
          fontFamily: fonts.body,
          padding: "140px 72px 160px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </AbsoluteFill>
      <FilmGrain opacity={light ? 0.05 : 0.1} />
      <Vignette />
    </AbsoluteFill>
  );
};

export const ChapterLabel: React.FC<{
  chapter: string;
  delay?: number;
}> = ({ chapter, delay = 0 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 20], [0, 1], {
    ...clamp,
    easing: out,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 28,
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [16, 0])}px`,
      }}
    >
      <div
        style={{
          width: interpolate(p, [0, 1], [0, 36]),
          height: 2,
          backgroundColor: colors.amber,
        }}
      />
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: colors.amber,
        }}
      >
        {chapter}
      </div>
    </div>
  );
};

export const DocTitle: React.FC<{
  lines: string[];
  delay?: number;
  size?: number;
  light?: boolean;
}> = ({ lines, delay = 0, size = 72, light }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ width: "100%" }}>
      {lines.map((line, i) => {
        const start = delay + i * 10;
        const p = interpolate(frame, [start, start + 22], [0, 1], {
          ...clamp,
          easing: out,
        });
        return (
          <div
            key={`${line}-${i}`}
            style={{
              fontFamily: fonts.display,
              fontSize: size,
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.01em",
              color: light ? colors.ink : colors.white,
              opacity: p,
              translate: `0px ${interpolate(p, [0, 1], [28, 0])}px`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const DocBody: React.FC<{
  children: React.ReactNode;
  delay?: number;
  light?: boolean;
}> = ({ children, delay = 0, light }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 24], [0, 1], {
    ...clamp,
    easing: out,
  });

  return (
    <div
      style={{
        marginTop: 32,
        fontSize: 34,
        lineHeight: 1.45,
        fontWeight: 500,
        color: light ? "#3A4450" : colors.muted,
        maxWidth: 920,
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [20, 0])}px`,
      }}
    >
      {children}
    </div>
  );
};

export const LowerThird: React.FC<{
  title: string;
  subtitle?: string;
  delay?: number;
}> = ({ title, subtitle, delay = 0 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 20], [0, 1], {
    ...clamp,
    easing: out,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        bottom: 140,
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [24, 0])}px`,
      }}
    >
      <div
        style={{
          width: interpolate(p, [0, 1], [0, 220]),
          height: 3,
          backgroundColor: colors.amber,
          marginBottom: 14,
        }}
      />
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 36,
          fontWeight: 600,
          color: colors.white,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 6,
            fontSize: 22,
            color: colors.muted,
            fontWeight: 500,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

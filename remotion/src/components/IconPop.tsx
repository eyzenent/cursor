import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { springPop } from "../theme";
import { idleR, idleY } from "./motion";

type IconPopProps = {
  delay?: number;
  size?: number;
  color?: string;
  bg?: string;
  children: React.ReactNode;
};

export const IconPop: React.FC<IconPopProps> = ({
  delay = 0,
  size = 96,
  color = "#0A0E17",
  bg = "#FFC93C",
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: springPop,
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 22,
        backgroundColor: bg,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        opacity: t,
        transform: `translateY(${idleY(frame, 2, 11)}px) scale(${interpolate(t, [0, 1], [0.4, 1])}) rotate(${interpolate(t, [0, 1], [-18, 0]) + idleR(frame, 1.5, 18)}deg)`,
      }}
    >
      {children}
    </div>
  );
};

export const IconBasket: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
    <path d="M4 8h16l-1.2 11.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 8Z" />
    <path d="M8 8V6a4 4 0 0 1 8 0v2" />
  </svg>
);

export const IconChart: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <path d="M8 15v-4" />
    <path d="M12 15V8" />
    <path d="M16 15v-7" />
  </svg>
);

export const IconCoins: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" />
  </svg>
);

export const IconBolt: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

export const IconWarn: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
    <path d="M12 3 2 21h20L12 3Z" />
    <path d="M12 10v5" />
    <path d="M12 18h.01" />
  </svg>
);

export const IconBuilding: React.FC<{ color?: string }> = ({ color = "currentColor" }) => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
    <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
    <path d="M14 10h5a1 1 0 0 1 1 1v10" />
    <path d="M8 8h2M8 12h2M8 16h2" />
  </svg>
);

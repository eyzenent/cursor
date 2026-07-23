export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Scene durations in frames — adjust here to retime the whole piece */
export const SCENE_DURATIONS = {
  hook: 90, // 3s
  definition: 210, // 7s
  compare: 300, // 10s
  advantages: 450, // 15s
  risk: 210, // 7s
  cta: 240, // 8s
} as const;

export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce(
  (a, b) => a + b,
  0,
);

export const SCENE_STARTS = {
  hook: 0,
  definition: SCENE_DURATIONS.hook,
  compare: SCENE_DURATIONS.hook + SCENE_DURATIONS.definition,
  advantages:
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.definition +
    SCENE_DURATIONS.compare,
  risk:
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.definition +
    SCENE_DURATIONS.compare +
    SCENE_DURATIONS.advantages,
  cta:
    SCENE_DURATIONS.hook +
    SCENE_DURATIONS.definition +
    SCENE_DURATIONS.compare +
    SCENE_DURATIONS.advantages +
    SCENE_DURATIONS.risk,
} as const;

export const colors = {
  bg: "#0A0E17",
  bgAlt: "#121826",
  yellow: "#FFC93C",
  red: "#FF4B4B",
  teal: "#2EC4B6",
  white: "#FFFFFF",
  muted: "#9AA3B2",
  card: "#1A2233",
};

export const springPop = {
  damping: 14,
  stiffness: 110,
  mass: 0.8,
};

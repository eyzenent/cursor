export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/**
 * Scene durations synced to ElevenLabs voiceover (+ ~0.8s visual padding).
 * Regenerate with: ELEVENLABS_API_KEY=... node scripts/generate-voiceover.mjs
 */
export const SCENE_DURATIONS = {
  hook: 195, // VO 5.69s
  definition: 286, // VO 8.72s
  compare: 243, // VO 7.29s
  advantages: 427, // VO 13.40s
  risk: 208, // VO 6.11s
  cta: 163, // VO 4.21s
} as const;

export const VOICEOVER_FILES = {
  hook: "voiceover/ETFExplainer/hook.mp3",
  definition: "voiceover/ETFExplainer/definition.mp3",
  compare: "voiceover/ETFExplainer/compare.mp3",
  advantages: "voiceover/ETFExplainer/advantages.mp3",
  risk: "voiceover/ETFExplainer/risk.mp3",
  cta: "voiceover/ETFExplainer/cta.mp3",
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

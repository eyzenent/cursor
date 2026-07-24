export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/**
 * Scene transition overlap (frames).
 * Next scene entrance starts before previous fully exits — Vox-style wipe feel.
 */
export const SCENE_OVERLAP = 14;

/**
 * Scene durations synced to ElevenLabs voiceover (+ visual padding).
 * Total with overlap ≈ 45–55s. Regenerate VO:
 * ELEVENLABS_API_KEY=... node scripts/generate-voiceover.mjs
 */
export const SCENE_DURATIONS = {
  hook: 195,
  definition: 286,
  compare: 243,
  advantages: 427,
  risk: 208,
  cta: 163,
} as const;

export type SceneId = keyof typeof SCENE_DURATIONS;

export const SCENE_ORDER: SceneId[] = [
  "hook",
  "definition",
  "compare",
  "advantages",
  "risk",
  "cta",
];

export const VOICEOVER_FILES: Record<SceneId, string> = {
  hook: "voiceover/ETFExplainer/hook.mp3",
  definition: "voiceover/ETFExplainer/definition.mp3",
  compare: "voiceover/ETFExplainer/compare.mp3",
  advantages: "voiceover/ETFExplainer/advantages.mp3",
  risk: "voiceover/ETFExplainer/risk.mp3",
  cta: "voiceover/ETFExplainer/cta.mp3",
};

export const SCENE_IMAGES: Record<SceneId, string> = {
  hook: "images/hook-market.jpg",
  definition: "images/definition-coins.jpg",
  compare: "images/compare-building.jpg",
  advantages: "images/advantages-phone.jpg",
  risk: "images/risk-street.jpg",
  cta: "images/cta-city.jpg",
};

/** Overlapping starts — next scene begins before previous ends */
export const SCENE_STARTS = SCENE_ORDER.reduce(
  (acc, id, i) => {
    if (i === 0) {
      acc[id] = 0;
    } else {
      const prev = SCENE_ORDER[i - 1]!;
      acc[id] = acc[prev]! + SCENE_DURATIONS[prev] - SCENE_OVERLAP;
    }
    return acc;
  },
  {} as Record<SceneId, number>,
);

export const TOTAL_FRAMES =
  Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) -
  SCENE_OVERLAP * (SCENE_ORDER.length - 1);

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

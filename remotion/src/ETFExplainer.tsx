import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { BrandWatermark } from "./components/BrandLogo";
import { ProgressBar } from "./components/ProgressBar";
import { HookScene } from "./scenes/Hook";
import { DefinitionScene } from "./scenes/Definition";
import { CompareScene } from "./scenes/Compare";
import { AdvantagesScene } from "./scenes/Advantages";
import { RiskScene } from "./scenes/Risk";
import { CTAScene } from "./scenes/CTA";
import {
  SCENE_DURATIONS,
  SCENE_ORDER,
  SCENE_STARTS,
  TOTAL_FRAMES,
  VOICEOVER_FILES,
  colors,
  type SceneId,
} from "./theme";

const scenes: Record<SceneId, React.FC> = {
  hook: HookScene,
  definition: DefinitionScene,
  compare: CompareScene,
  advantages: AdvantagesScene,
  risk: RiskScene,
  cta: CTAScene,
};

/** Mid scenes get a light watermark; hook/cta already feature the full logo */
const WATERMARK_SCENES: SceneId[] = [
  "definition",
  "compare",
  "advantages",
  "risk",
];

/**
 * Vox-style ETF explainer — EYVAZCO branded,
 * hard-cut scenes, Turkish ElevenLabs VO + underscore bed.
 */
export const ETFExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <Audio
        src={staticFile("vox-underscore.mp3")}
        volume={(f) => {
          const base = 0.12;
          if (f < 15) return (f / 15) * base;
          if (f > TOTAL_FRAMES - 30) {
            return ((TOTAL_FRAMES - f) / 30) * base;
          }
          return base;
        }}
      />

      {SCENE_ORDER.map((id) => {
        const Comp = scenes[id];
        return (
          <Sequence
            key={id}
            name={id}
            from={SCENE_STARTS[id]}
            durationInFrames={SCENE_DURATIONS[id]}
          >
            <Audio src={staticFile(VOICEOVER_FILES[id])} volume={1} />
            <Comp />
            {WATERMARK_SCENES.includes(id) ? (
              <BrandWatermark opacity={0.42} />
            ) : null}
          </Sequence>
        );
      })}

      <ProgressBar />
    </AbsoluteFill>
  );
};

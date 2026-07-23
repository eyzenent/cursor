import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { ProgressBar } from "./components/ProgressBar";
import { HookScene } from "./scenes/Hook";
import { DefinitionScene } from "./scenes/Definition";
import { CompareScene } from "./scenes/Compare";
import { AdvantagesScene } from "./scenes/Advantages";
import { RiskScene } from "./scenes/Risk";
import { CTAScene } from "./scenes/CTA";
import {
  SCENE_DURATIONS,
  SCENE_STARTS,
  TOTAL_FRAMES,
  VOICEOVER_FILES,
  colors,
} from "./theme";

const SceneVoice: React.FC<{ file: string }> = ({ file }) => (
  <Audio src={staticFile(file)} volume={1} />
);

/**
 * Vox-style ETF explainer for Instagram Reels.
 * Hard cuts + Turkish ElevenLabs narrator (Alice / multilingual).
 */
export const ETFExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <Audio
        src={staticFile("vox-underscore.mp3")}
        volume={(f) => {
          // Duck under voiceover
          const base = 0.14;
          if (f < 15) return (f / 15) * base;
          if (f > TOTAL_FRAMES - 30) {
            return ((TOTAL_FRAMES - f) / 30) * base;
          }
          return base;
        }}
      />

      <Sequence
        name="Hook"
        from={SCENE_STARTS.hook}
        durationInFrames={SCENE_DURATIONS.hook}
      >
        <SceneVoice file={VOICEOVER_FILES.hook} />
        <HookScene />
      </Sequence>
      <Sequence
        name="Definition"
        from={SCENE_STARTS.definition}
        durationInFrames={SCENE_DURATIONS.definition}
      >
        <SceneVoice file={VOICEOVER_FILES.definition} />
        <DefinitionScene />
      </Sequence>
      <Sequence
        name="Compare"
        from={SCENE_STARTS.compare}
        durationInFrames={SCENE_DURATIONS.compare}
      >
        <SceneVoice file={VOICEOVER_FILES.compare} />
        <CompareScene />
      </Sequence>
      <Sequence
        name="Advantages"
        from={SCENE_STARTS.advantages}
        durationInFrames={SCENE_DURATIONS.advantages}
      >
        <SceneVoice file={VOICEOVER_FILES.advantages} />
        <AdvantagesScene />
      </Sequence>
      <Sequence
        name="Risk"
        from={SCENE_STARTS.risk}
        durationInFrames={SCENE_DURATIONS.risk}
      >
        <SceneVoice file={VOICEOVER_FILES.risk} />
        <RiskScene />
      </Sequence>
      <Sequence
        name="CTA"
        from={SCENE_STARTS.cta}
        durationInFrames={SCENE_DURATIONS.cta}
      >
        <SceneVoice file={VOICEOVER_FILES.cta} />
        <CTAScene />
      </Sequence>

      <ProgressBar
        sections={[
          SCENE_DURATIONS.hook,
          SCENE_DURATIONS.definition,
          SCENE_DURATIONS.compare,
          SCENE_DURATIONS.advantages,
          SCENE_DURATIONS.risk,
          SCENE_DURATIONS.cta,
        ]}
      />
    </AbsoluteFill>
  );
};

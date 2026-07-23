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
  colors,
} from "./theme";

/**
 * Vox-style ETF explainer for Instagram Reels.
 * Hard cuts between scenes (no crossfade). Timing via SCENE_DURATIONS.
 */
export const ETFExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <Audio
        src={staticFile("vox-underscore.mp3")}
        volume={(f) => {
          if (f < 20) return (f / 20) * 0.42;
          if (f > TOTAL_FRAMES - 35) {
            return ((TOTAL_FRAMES - f) / 35) * 0.42;
          }
          return 0.42;
        }}
      />

      <Sequence
        name="Hook"
        from={SCENE_STARTS.hook}
        durationInFrames={SCENE_DURATIONS.hook}
      >
        <HookScene />
      </Sequence>
      <Sequence
        name="Definition"
        from={SCENE_STARTS.definition}
        durationInFrames={SCENE_DURATIONS.definition}
      >
        <DefinitionScene />
      </Sequence>
      <Sequence
        name="Compare"
        from={SCENE_STARTS.compare}
        durationInFrames={SCENE_DURATIONS.compare}
      >
        <CompareScene />
      </Sequence>
      <Sequence
        name="Advantages"
        from={SCENE_STARTS.advantages}
        durationInFrames={SCENE_DURATIONS.advantages}
      >
        <AdvantagesScene />
      </Sequence>
      <Sequence
        name="Risk"
        from={SCENE_STARTS.risk}
        durationInFrames={SCENE_DURATIONS.risk}
      >
        <RiskScene />
      </Sequence>
      <Sequence
        name="CTA"
        from={SCENE_STARTS.cta}
        durationInFrames={SCENE_DURATIONS.cta}
      >
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

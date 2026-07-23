import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  CloseScene,
  CostScene,
  DefinitionScene,
  DiversifyScene,
  LandscapeScene,
  MechanismScene,
  OpenScene,
} from "./scenes";
import { DURATION_FRAMES } from "./theme";

const FADE = 20;

export const EtfReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0F14" }}>
      <Audio
        src={staticFile("documentary-underscore.mp3")}
        volume={(f) => {
          // Soft fade in / fade out over the minute
          if (f < 30) return (f / 30) * 0.38;
          if (f > DURATION_FRAMES - 45) {
            return ((DURATION_FRAMES - f) / 45) * 0.38;
          }
          return 0.38;
        }}
      />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={200}>
          <OpenScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <DefinitionScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={280}>
          <MechanismScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={270}>
          <DiversifyScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={280}>
          <CostScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={290}>
          <LandscapeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={340}>
          <CloseScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export const ETF_REEL_DURATION = DURATION_FRAMES;

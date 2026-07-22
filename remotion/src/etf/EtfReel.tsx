import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  BasketScene,
  CostScene,
  DiversifyScene,
  HookScene,
  OutroScene,
  TypesScene,
  WhatScene,
} from "./scenes";
import { DURATION_FRAMES } from "./theme";

/**
 * Timing plan (30 fps, ~60s including fades):
 * Hook 5.0s | What 8.0s | Basket 10.0s | Diversify 10.0s
 * Cost 10.5s | Types 8.0s | Outro 11.0s
 * 6 fades × 0.5s overlap deducted from total wall time
 */
const FADE = 15;

export const EtfReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F5F7" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={150}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={240}>
          <WhatScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={300}>
          <BasketScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={300}>
          <DiversifyScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={315}>
          <CostScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={240}>
          <TypesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE })}
        />
        <TransitionSeries.Sequence durationInFrames={345}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Keep export for metadata consumers
export const ETF_REEL_DURATION = DURATION_FRAMES;

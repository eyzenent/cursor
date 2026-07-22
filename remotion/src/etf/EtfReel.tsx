import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import {
  BasketScene,
  CostScene,
  DiversifyScene,
  HookScene,
  OutroScene,
  TypesScene,
  WhatScene,
} from "./scenes";
import { ProgressRail } from "./motion";
import { DURATION_FRAMES } from "./theme";

const WIPE = 18;
const SLIDE = 16;

export const EtfReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0D10" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={155}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: WIPE })}
        />
        <TransitionSeries.Sequence durationInFrames={245}>
          <WhatScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: SLIDE })}
        />
        <TransitionSeries.Sequence durationInFrames={310}>
          <BasketScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={linearTiming({ durationInFrames: WIPE })}
        />
        <TransitionSeries.Sequence durationInFrames={300}>
          <DiversifyScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: SLIDE })}
        />
        <TransitionSeries.Sequence durationInFrames={320}>
          <CostScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: WIPE })}
        />
        <TransitionSeries.Sequence durationInFrames={245}>
          <TypesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: SLIDE })}
        />
        <TransitionSeries.Sequence durationInFrames={327}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <ProgressRail />
    </AbsoluteFill>
  );
};

export const ETF_REEL_DURATION = DURATION_FRAMES;

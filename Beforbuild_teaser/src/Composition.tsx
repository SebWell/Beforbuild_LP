import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { loadFont } from "@remotion/google-fonts/Inter";
import { SCENE_DURATIONS } from "./lib/constants";
import { HookScene } from "./scenes/HookScene";
import { LogoRevealScene } from "./scenes/LogoRevealScene";
import { ModulesScene } from "./scenes/ModulesScene";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

const T = 15;

export const BeForBuildTeaser: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <TransitionSeries>
        {/* Scene 1: Logo */}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.logoReveal + T}
        >
          <LogoRevealScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Scene 2: Hook */}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.hook + T * 2}
        >
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Scene 3: 12 slides (2 per module) */}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.modules}
        >
          <ModulesScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

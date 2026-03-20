import { Composition } from "remotion";
import { BeForBuildTeaser } from "./Composition";
import { FPS } from "./lib/constants";

// logoReveal: 60+15=75, hook: 90+30=120, modules: 1500
// Total = 75 + 120 + 1500 - (2 × 15) = 1665 (~55.5s)
const TOTAL_DURATION = 1665;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BeForBuildTeaser"
        component={BeForBuildTeaser}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

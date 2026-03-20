import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from "remotion";
import { staticFile } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn } from "../lib/animations";

export const LogoRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = scaleIn(frame, fps, 5);
  const logoOpacity = fadeIn(frame, 5, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile("logo-beforbuild.webp")}
          style={{ height: 140 }}
        />
      </div>
    </AbsoluteFill>
  );
};

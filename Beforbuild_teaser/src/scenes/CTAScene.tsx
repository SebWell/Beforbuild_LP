import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from "remotion";
import { staticFile } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn } from "../lib/animations";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = scaleIn(frame, fps, 5);
  const logoOpacity = fadeIn(frame, 5, 15);
  const taglineOpacity = fadeIn(frame, 25, 20);
  const urlScale = scaleIn(frame, fps, 50);
  const urlOpacity = fadeIn(frame, 50, 20);
  const subtitleOpacity = fadeIn(frame, 75, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Logo — BIG */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile("logo-beforbuild.webp")}
          style={{ height: 100 }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          fontSize: 40,
          color: COLORS.text,
          fontWeight: 700,
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.3,
        }}
      >
        Tout ce dont un promoteur a besoin.
        <br />
        <span style={{ color: COLORS.brand }}>En une seule plateforme.</span>
      </div>

      {/* URL button */}
      <div
        style={{
          transform: `scale(${urlScale})`,
          opacity: urlOpacity,
          padding: "16px 48px",
          borderRadius: 100,
          backgroundColor: COLORS.brand,
          color: "#FFFFFF",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
      >
        beforbuild.com
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 22,
          color: COLORS.textMuted,
          fontWeight: 400,
        }}
      >
        6 modules · 1 plateforme · 0 Excel
      </div>
    </AbsoluteFill>
  );
};

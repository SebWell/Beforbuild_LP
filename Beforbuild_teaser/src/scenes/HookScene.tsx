import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from "remotion";
import { staticFile } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, slideUp, scaleIn } from "../lib/animations";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = fadeIn(frame, 0, 15);
  const line1Opacity = fadeIn(frame, 3, 12);
  const line1Y = slideUp(frame, 3, 30);
  const line2Opacity = fadeIn(frame, 15, 12);
  const line2Y = slideUp(frame, 15, 30);
  const accentScale = scaleIn(frame, fps, 30);
  const accentOpacity = fadeIn(frame, 30, 10);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src={staticFile("plan-architecte.webp")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity * 0.05,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          maxWidth: 1200,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.15,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          Gérer une promotion immobilière,
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.15,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          c'est gérer{" "}
          <span style={{ color: COLORS.brand }}>6 métiers à la fois</span>
        </div>

        <div
          style={{
            opacity: accentOpacity,
            transform: `scale(${accentScale})`,
            fontSize: 30,
            color: COLORS.textMuted,
            fontWeight: 400,
            marginTop: 12,
          }}
        >
          Foncier · Bilan · Contrats · Planning · Documents · Commercial
        </div>
      </div>
    </AbsoluteFill>
  );
};

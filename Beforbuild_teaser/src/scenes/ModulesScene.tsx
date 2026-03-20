import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { staticFile } from "remotion";
import { COLORS, MODULES, MODULE_SLIDE_DURATION } from "../lib/constants";
import { fadeIn, scaleIn, slideUp, slideRight } from "../lib/animations";
import { MockupFoncier } from "../components/MockupFoncier";
import { MockupBilan } from "../components/MockupBilan";
import { MockupContrats } from "../components/MockupContrats";
import { MockupPlanning } from "../components/MockupPlanning";
import { MockupDocuments } from "../components/MockupDocuments";
import { MockupCommercial } from "../components/MockupCommercial";
import { MockupFoncier2 } from "../components/MockupFoncier2";
import { MockupBilan2 } from "../components/MockupBilan2";
import { MockupContrats2 } from "../components/MockupContrats2";
import { MockupPlanning2 } from "../components/MockupPlanning2";
import { MockupDocuments2 } from "../components/MockupDocuments2";
import { MockupCommercial2 } from "../components/MockupCommercial2";

const MOCKUP1: Record<string, React.FC> = {
  Foncier: MockupFoncier,
  Bilan: MockupBilan,
  Contrats: MockupContrats,
  Planning: MockupPlanning,
  Documents: MockupDocuments,
  Commercial: MockupCommercial,
};

const MOCKUP2: Record<string, React.FC> = {
  Foncier: MockupFoncier2,
  Bilan: MockupBilan2,
  Contrats: MockupContrats2,
  Planning: MockupPlanning2,
  Documents: MockupDocuments2,
  Commercial: MockupCommercial2,
};

const BULLET_POINTS: Record<string, string[]> = {
  Foncier: [
    "Carte cadastrale interactive (IGN)",
    "Enrichissement automatique (DVF, PLU, économie)",
    "Suivi des conditions suspensives",
    "Lettres d'intention & compromis",
  ],
  Bilan: [
    "Bilan promoteur normé par phase MOP",
    "Calcul automatique CA / dépenses / marge",
    "Trésorerie prévisionnelle mensuelle",
    "Simulations & scénarios financiers",
  ],
  Contrats: [
    "Cycle complet du template à la signature",
    "Phases de mission MOE (ESQ → AOR)",
    "Signatures électroniques dans tous vos process",
    "Synchronisation avec le Planning",
  ],
  Planning: [
    "Gantt interactif avec dépendances",
    "Jalons & détection automatique de retard",
    "Matrice missions par intervenant",
    "Templates de planning réutilisables",
  ],
  Documents: [
    "Upload drag & drop (PDF, DWG, ZIP)",
    "OCR automatique & indexation IA",
    "Chat IA contextuel sur vos documents",
    "4 modes de vue (grille, liste, arbre)",
  ],
  Commercial: [
    "Grille de prix lots & annexes",
    "Pipeline CRM contacts",
    "Suivi des réservations VEFA",
    "Mandats & commissions commercialisateurs",
  ],
};

// Duration per module = 2 × MODULE_SLIDE_DURATION
const MODULE_DURATION = MODULE_SLIDE_DURATION * 2; // 250 frames
// Midpoint where mockup transitions
const MID = MODULE_SLIDE_DURATION; // 125

const ModuleScene: React.FC<{
  module: (typeof MODULES)[number];
  index: number;
}> = ({ module, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const Mockup1 = MOCKUP1[module.name];
  const Mockup2 = MOCKUP2[module.name];
  const bullets = BULLET_POINTS[module.name];

  // --- Title animations (appear once, stay) ---
  const labelOpacity = fadeIn(frame, 5, 12);
  const nameOpacity = fadeIn(frame, 8, 15);
  const nameY = slideUp(frame, 8, 30);
  const subtitleOpacity = fadeIn(frame, 18, 15);
  const subtitleY = slideUp(frame, 18, 20);

  // --- Mockup 1: fade in at start, fade out at midpoint ---
  const m1Enter = fadeIn(frame, 6, 20);
  const m1X = slideRight(frame, 6, 50);
  const m1Scale = scaleIn(frame, fps, 6);
  const m1Exit = interpolate(frame, [MID - 15, MID], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const m1Opacity = m1Enter * m1Exit;

  // --- Mockup 2: fade in at midpoint ---
  const m2Opacity = fadeIn(frame, MID, 20);
  const m2X = slideRight(frame, MID, 40);
  const m2Scale = scaleIn(frame, fps, MID);

  // --- Bullet points: start appearing at midpoint ---

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 50px",
        gap: 40,
      }}
    >
      <Img
        src={staticFile("plan-architecte.webp")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.03,
        }}
      />

      {/* Left side */}
      <div
        style={{
          flex: "0 0 440px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Module counter */}
        <div
          style={{
            opacity: labelOpacity,
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.textMuted,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Module {index + 1}/6
        </div>

        {/* Module name */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.1,
          }}
        >
          {module.name}
        </div>

        {/* Subtitle — stays visible */}
        <div
          style={{
            fontSize: 26,
            color: COLORS.textSecondary,
            fontWeight: 400,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {module.subtitle}
        </div>

        {/* Green accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            borderRadius: 2,
            backgroundColor: COLORS.brand,
            opacity: labelOpacity,
            marginTop: 4,
          }}
        />

        {/* Bullet points — appear at midpoint */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginTop: 8,
          }}
        >
          {bullets.map((bullet, i) => {
            const delay = MID + i * 12 + 5;
            const opacity = fadeIn(frame, delay, 15);
            const y = slideUp(frame, delay, 15);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  opacity,
                  transform: `translateY(${y}px)`,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: COLORS.brand,
                    marginTop: 7,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 20,
                    color: COLORS.text,
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {bullet}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side — mockups crossfade */}
      <div style={{ position: "relative", flex: 1 }}>
        {/* Mockup 1 */}
        <div
          style={{
            opacity: m1Opacity,
            transform: `translateX(${m1X}px) scale(${(m1Scale * 0.05 + 0.95) * 1.43}) translateY(-50%)`,
            transformOrigin: "top right",
            position: "absolute",
            top: "50%",
            right: 0,
          }}
        >
          <Mockup1 />
        </div>

        {/* Mockup 2 */}
        <div
          style={{
            opacity: m2Opacity,
            transform: `translateX(${m2X}px) scale(${(m2Scale * 0.05 + 0.95) * 1.43}) translateY(-50%)`,
            transformOrigin: "top right",
            position: "absolute",
            top: "50%",
            right: 0,
          }}
        >
          <Mockup2 />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ModulesScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {MODULES.map((module, i) => (
        <Sequence
          key={i}
          from={i * MODULE_DURATION}
          durationInFrames={MODULE_DURATION}
        >
          <ModuleScene module={module} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

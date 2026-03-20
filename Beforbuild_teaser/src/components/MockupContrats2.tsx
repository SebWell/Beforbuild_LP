import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";
import { BlurredText } from "./BlurredText";

// Faithful reproduction of PhasesSection:
// Card > Table with code (mono), nom, montant HT, statut badge, chevron

const PHASES = [
  { code: "ESQ", nom: "Esquisse", montant: "18 500 €", statut: "OF émis", statutColor: COLORS.brand },
  { code: "APS", nom: "Avant-projet sommaire", montant: "37 000 €", statut: "Rendus validés", statutColor: COLORS.brand },
  { code: "APD", nom: "Avant-projet définitif", montant: "37 000 €", statut: "En cours", statutColor: COLORS.textSecondary },
  { code: "PRO", nom: "Projet", montant: "27 750 €", statut: "À venir", statutColor: COLORS.textMuted },
  { code: "DCE", nom: "Dossier de consultation", montant: "18 500 €", statut: "À venir", statutColor: COLORS.textMuted },
];

export const MockupContrats2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: 720, backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      {/* CardHeader */}
      <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.borderLight}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Phases de mission</span>
          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 100, border: `1px solid ${COLORS.border}`, color: COLORS.textSecondary, display: "flex", alignItems: "center", gap: 4 }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            3 liées au planning
          </span>
        </div>
      </div>

      {/* Table header */}
      <div style={{ display: "flex", padding: "8px 20px", backgroundColor: COLORS.bgSoft, borderBottom: `1px solid ${COLORS.borderLight}` }}>
        <span style={{ flex: 2, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Phase</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "right" }}>Montant HT</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "center" }}>Statut</span>
      </div>

      {/* Phase rows */}
      {PHASES.map((phase, i) => {
        const delay = stagger(i, 7) + 5;
        const opacity = fadeIn(frame, delay, 10);
        const scale = scaleIn(frame, fps, delay);

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "11px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, opacity, transform: `scale(${scale})` }}>
            {/* Chevron + code + nom */}
            <div style={{ flex: 2, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: COLORS.textMuted }}>{phase.code}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: COLORS.text }}>{phase.nom}</span>
            </div>

            {/* Montant */}
            <div style={{ flex: 1, textAlign: "right" }}>
              <BlurredText style={{ fontSize: 14, color: COLORS.text }}>{phase.montant}</BlurredText>
            </div>

            {/* Statut badge */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 100, border: `1px solid ${phase.statutColor}40`, color: phase.statutColor, backgroundColor: phase.statutColor === COLORS.brand ? `${COLORS.brand}10` : "transparent" }}>
                {phase.statut}
              </span>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <div style={{ display: "flex", padding: "10px 20px", backgroundColor: COLORS.bgSoft }}>
        <span style={{ flex: 2, fontSize: 14, fontWeight: 700, color: COLORS.text }}>Total (5 phases)</span>
        <BlurredText style={{ flex: 1, fontSize: 14, fontWeight: 700, color: COLORS.text, textAlign: "right" }}>138 750 €</BlurredText>
        <span style={{ flex: 1 }} />
      </div>
    </div>
  );
};

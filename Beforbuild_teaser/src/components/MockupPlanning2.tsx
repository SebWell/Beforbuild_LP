import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";

// Faithful reproduction of JalonsPage:
// Card > Table with nom, type badge (outline), date_prevue, date_reelle, statut badge

const JALONS = [
  { nom: "Dépôt permis de construire", type: "Réglementaire", date_prevue: "15/03/2026", date_reelle: "15/03/2026", atteint: true, enRetard: false },
  { nom: "Obtention du permis", type: "Réglementaire", date_prevue: "12/06/2026", date_reelle: "18/06/2026", atteint: true, enRetard: false },
  { nom: "Démarrage chantier", type: "Démarrage", date_prevue: "01/09/2026", date_reelle: "—", atteint: false, enRetard: false },
  { nom: "Achèvement gros œuvre", type: "Livrable", date_prevue: "15/03/2027", date_reelle: "—", atteint: false, enRetard: false },
  { nom: "Livraison lot A", type: "Livrable", date_prevue: "15/07/2027", date_reelle: "—", atteint: false, enRetard: false },
];

export const MockupPlanning2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: 780, backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      {/* CardHeader */}
      <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.borderLight}` }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Jalons ({JALONS.length})</span>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontSize: 13, padding: "4px 12px", borderRadius: 6, border: `1px solid ${COLORS.border}`, color: COLORS.textSecondary }}>Type ▾</span>
          <span style={{ fontSize: 13, padding: "4px 12px", borderRadius: 6, border: `1px solid ${COLORS.border}`, color: COLORS.textSecondary }}>Statut ▾</span>
        </div>
      </div>

      {/* Table header */}
      <div style={{ display: "flex", padding: "8px 20px", backgroundColor: COLORS.bgSoft, borderBottom: `1px solid ${COLORS.borderLight}` }}>
        <span style={{ flex: 2, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Nom</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Type</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Date prévue</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Date réelle</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Statut</span>
      </div>

      {/* Jalon rows */}
      {JALONS.map((jalon, i) => {
        const delay = stagger(i, 6) + 5;
        const opacity = fadeIn(frame, delay, 10);
        const scale = scaleIn(frame, fps, delay);

        // Status badge
        let statutLabel: string;
        let statutBg: string;
        let statutColor: string;
        if (jalon.atteint) {
          statutLabel = "Atteint";
          statutBg = COLORS.bgSoft;
          statutColor = COLORS.textSecondary;
        } else if (jalon.enRetard) {
          statutLabel = "En retard";
          statutBg = "#FEE2E2";
          statutColor = "#DC2626";
        } else {
          statutLabel = "À venir";
          statutBg = "transparent";
          statutColor = COLORS.textMuted;
        }

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "11px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, opacity, transform: `scale(${scale})` }}>
            <span style={{ flex: 2, fontSize: 14, fontWeight: 500, color: COLORS.text }}>{jalon.nom}</span>
            {/* Type badge (outline) */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 100, border: `1px solid ${COLORS.border}`, color: COLORS.textSecondary }}>
                {jalon.type}
              </span>
            </div>
            <span style={{ flex: 1, fontSize: 13, color: COLORS.textSecondary }}>{jalon.date_prevue}</span>
            <span style={{ flex: 1, fontSize: 13, color: COLORS.textSecondary }}>{jalon.date_reelle}</span>
            {/* Statut badge */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 100, backgroundColor: statutBg, border: `1px solid ${statutColor}30`, color: statutColor }}>
                {statutLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

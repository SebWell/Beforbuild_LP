import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";
import { BlurredText } from "./BlurredText";

// Faithful reproduction of ReservationsPage:
// Card > Table with lot (mono), contact, date, signature, depot, statut badge

const RESERVATIONS = [
  { lot: "A01-T3", contact: "M. Bernard", date: "14/03/2026", signature: "28/03/2026", depot: "5 000 €", statut: "en_cours" },
  { lot: "A05-T2", contact: "Mme Leroy", date: "12/03/2026", signature: "26/03/2026", depot: "5 000 €", statut: "en_cours" },
  { lot: "B03-T4", contact: "M. Dupont", date: "10/03/2026", signature: "24/03/2026", depot: "5 000 €", statut: "signe" },
  { lot: "A02-T3", contact: "Mme Martin", date: "05/03/2026", signature: "—", depot: "—", statut: "retracte" },
];

const STATUT_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  en_cours: { label: "En cours", color: COLORS.text, bg: COLORS.bgSoft },
  signe: { label: "Signé", color: COLORS.brand, bg: `${COLORS.brand}15` },
  retracte: { label: "Rétracté", color: "#DC2626", bg: "#FEE2E2" },
};

export const MockupCommercial2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: 780, backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.borderLight}` }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Réservations</span>
      </div>

      {/* Table header */}
      <div style={{ display: "flex", padding: "8px 20px", backgroundColor: COLORS.bgSoft, borderBottom: `1px solid ${COLORS.borderLight}` }}>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Lot</span>
        <span style={{ flex: 1.2, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Contact</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Date</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Signature</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "right" }}>Dépôt</span>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "center" }}>Statut</span>
      </div>

      {/* Rows */}
      {RESERVATIONS.map((res, i) => {
        const delay = stagger(i, 7) + 5;
        const opacity = fadeIn(frame, delay, 10);
        const scale = scaleIn(frame, fps, delay);
        const config = STATUT_CONFIG[res.statut];

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "11px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, opacity, transform: `scale(${scale})` }}>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, fontFamily: "monospace", color: COLORS.text }}>{res.lot}</span>
            <span style={{ flex: 1.2, fontSize: 14, color: COLORS.textSecondary }}>{res.contact}</span>
            <span style={{ flex: 1, fontSize: 13, color: COLORS.textSecondary }}>{res.date}</span>
            <span style={{ flex: 1, fontSize: 13, color: COLORS.textSecondary }}>{res.signature}</span>
            <div style={{ flex: 1, textAlign: "right" }}>
              {res.depot === "—" ? (
                <span style={{ fontSize: 13, color: COLORS.textMuted }}>—</span>
              ) : (
                <BlurredText style={{ fontSize: 13, color: COLORS.text }}>{res.depot}</BlurredText>
              )}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 100, backgroundColor: config.bg, color: config.color }}>
                {config.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

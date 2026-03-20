import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";
import { BlurredText } from "./BlurredText";

const STATS = [
  { label: "Lots disponibles", value: "8/24" },
  { label: "Commercialisation", value: "68%" },
  { label: "CA réservé", value: "3 240 000 €" },
];

const LOTS = [
  { lot: "A01", type: "T2", surface: "42 m²", price: "185 000 €", pvm: "4 405 €", statut: "Réservé", green: true },
  { lot: "A02", type: "T3", surface: "65 m²", price: "245 000 €", pvm: "3 769 €", statut: "Disponible", green: false },
  { lot: "A03", type: "T4", surface: "82 m²", price: "320 000 €", pvm: "3 902 €", statut: "Acté", green: true },
  { lot: "B01", type: "T2", surface: "44 m²", price: "192 000 €", pvm: "4 364 €", statut: "Réservé", green: true },
];

export const MockupCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progressValue = interpolate(frame, [10, 50], [0, 68], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: 780, display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Stats row */}
      <div style={{ display: "flex", gap: 12 }}>
        {STATS.map((stat, i) => {
          const delay = stagger(i, 5) + 3;
          const opacity = fadeIn(frame, delay, 10);
          const scale = scaleIn(frame, fps, delay);
          return (
            <div key={i} style={{ flex: 1, opacity, transform: `scale(${scale})`, backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500, marginBottom: 6 }}>{stat.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}>{stat.label === "CA réservé" ? <BlurredText>{stat.value}</BlurredText> : stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Grille de prix */}
      <div style={{ backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        {/* Header */}
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>Grille de prix</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>Commercialisation</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.brand }}>{Math.round(progressValue)}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ padding: "0 20px", paddingTop: 10, paddingBottom: 10 }}>
          <div style={{ width: "100%", height: 5, backgroundColor: COLORS.borderLight, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${progressValue}%`, height: "100%", backgroundColor: COLORS.brand, borderRadius: 3 }} />
          </div>
        </div>

        {/* Table header */}
        <div style={{ display: "flex", padding: "8px 20px", backgroundColor: COLORS.bgSoft, borderTop: `1px solid ${COLORS.borderLight}`, borderBottom: `1px solid ${COLORS.borderLight}` }}>
          {["Lot", "Type", "Surface", "Prix", "€/m²", "Statut"].map((h, i) => (
            <span key={i} style={{ flex: i === 3 ? 1.3 : 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.3 }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {LOTS.map((lot, i) => {
          const delay = stagger(i, 6) + 10;
          const opacity = fadeIn(frame, delay, 10);
          const scale = scaleIn(frame, fps, delay);
          return (
            <div key={i} style={{ display: "flex", padding: "12px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, alignItems: "center", opacity, transform: `scale(${scale})` }}>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: COLORS.text }}>{lot.lot}</span>
              <span style={{ flex: 1, fontSize: 15, color: COLORS.textSecondary }}>{lot.type}</span>
              <span style={{ flex: 1, fontSize: 15, color: COLORS.textSecondary }}>{lot.surface}</span>
              <BlurredText style={{ flex: 1.3, fontSize: 15, fontWeight: 600, color: COLORS.text }}>{lot.price}</BlurredText>
              <BlurredText style={{ flex: 1, fontSize: 14, color: COLORS.textMuted }}>{lot.pvm}</BlurredText>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 500, padding: "3px 10px", borderRadius: 100, backgroundColor: lot.green ? `${COLORS.brand}15` : "transparent", border: `1px solid ${lot.green ? `${COLORS.brand}40` : COLORS.border}`, color: lot.green ? COLORS.brand : COLORS.textSecondary }}>
                  {lot.statut}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

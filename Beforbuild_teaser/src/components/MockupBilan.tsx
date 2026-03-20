import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";
import { BlurredText } from "./BlurredText";

const KPI_CARDS = [
  { label: "Chiffre d'affaires", value: "4 850 000 €", subtitle: "24 lots – 1 840 m²" },
  { label: "Dépenses prévues", value: "3 960 000 €", subtitle: "Engagé: 2 140 000 €", blurSub: true },
  { label: "Marge", value: "890 000 €", subtitle: "18,4%", highlight: true, blurSub: true },
  { label: "Commercialisation", value: "68%", subtitle: "16 vendus sur 24 lots" },
];

const RECETTES_ROWS = [
  { label: "T2 – 2 pièces", qty: "8", vendus: "6", ht: "1 480 000 €" },
  { label: "T3 – 3 pièces", qty: "10", vendus: "7", ht: "2 450 000 €" },
  { label: "T4 – 4 pièces", qty: "6", vendus: "3", ht: "920 000 €" },
];

export const MockupBilan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: 780, display: "flex", flexDirection: "column", gap: 14 }}>
      {/* KPI grid 2x2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {KPI_CARDS.map((kpi, i) => {
          const delay = stagger(i, 6) + 3;
          const opacity = fadeIn(frame, delay, 12);
          const scale = scaleIn(frame, fps, delay);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale})`,
                backgroundColor: COLORS.bgCard,
                borderRadius: 10,
                border: `1px solid ${COLORS.border}`,
                padding: "18px 20px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500, marginBottom: 8 }}>
                {kpi.label}
              </div>
              <BlurredText style={{ fontSize: 24, fontWeight: 700, color: kpi.highlight ? COLORS.brand : COLORS.text }}>
                {kpi.value}
              </BlurredText>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>
                {kpi.blurSub ? <BlurredText>{kpi.subtitle}</BlurredText> : kpi.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recettes table */}
      <div
        style={{
          backgroundColor: COLORS.bgCard,
          borderRadius: 10,
          border: `1px solid ${COLORS.border}`,
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          opacity: fadeIn(frame, 28, 15),
        }}
      >
        <div style={{ padding: "12px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Ventes de lots</span>
        </div>

        {/* Table header */}
        <div style={{ display: "flex", padding: "8px 20px", backgroundColor: COLORS.bgSoft }}>
          {["Catégorie", "Qté", "Vendus", "Total HT"].map((h, i) => (
            <span key={i} style={{ flex: i === 0 ? 2 : 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: i === 0 ? "left" : "right" }}>
              {h}
            </span>
          ))}
        </div>

        {RECETTES_ROWS.map((row, i) => {
          const delay = stagger(i, 6) + 32;
          const opacity = fadeIn(frame, delay, 10);
          return (
            <div key={i} style={{ display: "flex", padding: "10px 20px 10px 36px", borderTop: `1px solid ${COLORS.borderLight}`, opacity }}>
              <span style={{ flex: 2, fontSize: 14, color: COLORS.textSecondary }}>{row.label}</span>
              <span style={{ flex: 1, fontSize: 14, color: COLORS.textSecondary, textAlign: "right" }}>{row.qty}</span>
              <span style={{ flex: 1, fontSize: 14, color: COLORS.textSecondary, textAlign: "right" }}>{row.vendus}</span>
              <BlurredText style={{ flex: 1, fontSize: 14, color: COLORS.text, fontWeight: 600, textAlign: "right" }}>{row.ht}</BlurredText>
            </div>
          );
        })}

        <div style={{ display: "flex", padding: "10px 20px", borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.bgSoft }}>
          <span style={{ flex: 2, fontSize: 14, fontWeight: 700, color: COLORS.text }}>Total Recettes</span>
          <span style={{ flex: 1 }} /><span style={{ flex: 1 }} />
          <BlurredText style={{ flex: 1, fontSize: 14, fontWeight: 700, color: COLORS.text, textAlign: "right" }}>4 850 000 €</BlurredText>
        </div>
      </div>
    </div>
  );
};

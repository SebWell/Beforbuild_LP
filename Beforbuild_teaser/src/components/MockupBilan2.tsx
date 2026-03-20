import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, stagger } from "../lib/animations";
import { BlurredText } from "./BlurredText";

// Faithful reproduction of MargeSection:
// CollapsibleCard > 3-column equation (CA - PR = Marge) + 4 KpiMiniCards
// + DepensesSection snippet (category rows)

const KPI_MINIS = [
  { label: "Marge % PR", value: "22,5%", blur: true },
  { label: "Engagement", value: "54%" },
  { label: "Commercialisation", value: "68%" },
  { label: "PV/m² SU", value: "•••• €" },
];

const DEPENSES_CATEGORIES = [
  { nom: "Terrain & foncier", prevu: "1 200 000 €", engage: "1 200 000 €" },
  { nom: "Travaux", prevu: "2 100 000 €", engage: "680 000 €" },
  { nom: "Honoraires techniques", prevu: "420 000 €", engage: "185 000 €" },
  { nom: "Frais financiers", prevu: "240 000 €", engage: "75 000 €" },
];

export const MockupBilan2: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ width: 780, display: "flex", flexDirection: "column", gap: 14 }}>
      {/* MargeSection: CollapsibleCard */}
      <div style={{ backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", opacity: fadeIn(frame, 3, 12) }}>
        {/* Header */}
        <div style={{ padding: "12px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Marge et Rentabilité</span>
        </div>

        {/* 3-column equation: CA − PR = Marge */}
        <div style={{ margin: "16px 20px", padding: 16, borderRadius: 8, backgroundColor: COLORS.bgSoft, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>CA Total HT</div>
            <BlurredText style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>4 850 000 €</BlurredText>
          </div>
          <span style={{ fontSize: 24, color: COLORS.textMuted }}>−</span>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>Prix de Revient</div>
            <BlurredText style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>3 960 000 €</BlurredText>
          </div>
          <span style={{ fontSize: 24, color: COLORS.textMuted }}>=</span>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>Marge</div>
            <BlurredText style={{ fontSize: 20, fontWeight: 700, color: COLORS.brand }}>890 000 €</BlurredText>
            <BlurredText style={{ fontSize: 12, color: COLORS.brand, fontWeight: 600, marginTop: 2 }}>18,4% PV</BlurredText>
          </div>
        </div>

        {/* 4 KpiMiniCards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, padding: "0 20px 16px" }}>
          {KPI_MINIS.map((kpi, i) => {
            const delay = stagger(i, 5) + 10;
            const opacity = fadeIn(frame, delay, 10);
            return (
              <div key={i} style={{ padding: 12, borderRadius: 6, backgroundColor: COLORS.bgSoft, opacity }}>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{kpi.label}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: COLORS.text, marginTop: 4 }}>{kpi.blur ? <BlurredText>{kpi.value}</BlurredText> : kpi.value}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DepensesSection snippet */}
      <div style={{ backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", opacity: fadeIn(frame, 15, 15) }}>
        <div style={{ padding: "12px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Dépenses</span>
        </div>

        {/* Table header */}
        <div style={{ display: "flex", padding: "8px 20px", backgroundColor: COLORS.bgSoft, borderBottom: `1px solid ${COLORS.borderLight}` }}>
          <span style={{ flex: 2, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Poste</span>
          <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "right" }}>HT Prévu</span>
          <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "right" }}>Engagé</span>
        </div>

        {DEPENSES_CATEGORIES.map((cat, i) => {
          const delay = stagger(i, 5) + 20;
          const opacity = fadeIn(frame, delay, 10);
          return (
            <div key={i} style={{ display: "flex", padding: "10px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, opacity }}>
              <div style={{ flex: 2, display: "flex", alignItems: "center", gap: 8 }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span style={{ fontSize: 14, fontWeight: 500, color: COLORS.text }}>{cat.nom}</span>
              </div>
              <BlurredText style={{ flex: 1, fontSize: 14, color: COLORS.text, textAlign: "right" }}>{cat.prevu}</BlurredText>
              <BlurredText style={{ flex: 1, fontSize: 14, color: COLORS.textSecondary, textAlign: "right" }}>{cat.engage}</BlurredText>
            </div>
          );
        })}

        {/* Footer total */}
        <div style={{ display: "flex", padding: "10px 20px", backgroundColor: COLORS.bgSoft }}>
          <span style={{ flex: 2, fontSize: 14, fontWeight: 700, color: COLORS.text }}>Total Dépenses</span>
          <BlurredText style={{ flex: 1, fontSize: 14, fontWeight: 700, color: COLORS.text, textAlign: "right" }}>3 960 000 €</BlurredText>
          <BlurredText style={{ flex: 1, fontSize: 14, fontWeight: 700, color: COLORS.textSecondary, textAlign: "right" }}>2 140 000 €</BlurredText>
        </div>
      </div>
    </div>
  );
};

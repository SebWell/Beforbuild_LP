import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";
import { BlurredText } from "./BlurredText";

const CONTRATS = [
  {
    numero: "CT-2026-001",
    type: "Architecte",
    objet: "Mission complète MOE – Résidence Parc",
    partie: "Cabinet Archi & Associés",
    montant: "185 000 €",
    statut: "Signé",
    statutBg: COLORS.brand,
    statutVariant: "default" as const,
  },
  {
    numero: "CT-2026-002",
    type: "BET Structure",
    objet: "Étude structure béton – Lot A",
    partie: "BET Structures & Co",
    montant: "42 000 €",
    statut: "En signature",
    statutBg: COLORS.text,
    statutVariant: "outline" as const,
  },
  {
    numero: "CT-2026-003",
    type: "OPC",
    objet: "Pilotage tous corps d'état",
    partie: "Pilotage & Coordination",
    montant: "28 500 €",
    statut: "Brouillon",
    statutBg: COLORS.textMuted,
    statutVariant: "outline" as const,
  },
];

const Badge: React.FC<{
  children: React.ReactNode;
  color: string;
  variant: "default" | "outline";
}> = ({ children, color, variant }) => (
  <span
    style={{
      fontSize: 13,
      fontWeight: 500,
      padding: "3px 10px",
      borderRadius: 100,
      border: `1px solid ${variant === "outline" ? `${color}40` : "transparent"}`,
      backgroundColor: variant === "default" ? color : "transparent",
      color: variant === "default" ? "#fff" : color,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

export const MockupContrats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 720 }}>
      {CONTRATS.map((contrat, i) => {
        const delay = stagger(i, 10) + 5;
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
            {/* Row 1: Numero + badges */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontFamily: "monospace", color: COLORS.textMuted }}>{contrat.numero}</span>
              <Badge color={COLORS.textMuted} variant="outline">{contrat.type}</Badge>
              <Badge color={contrat.statutBg} variant={contrat.statutVariant}>{contrat.statut}</Badge>
            </div>

            {/* Row 2: Objet */}
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginBottom: 6 }}>
              {contrat.objet}
            </div>

            {/* Row 3: Partie + Montant */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, color: COLORS.textMuted }}>{contrat.partie}</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <BlurredText style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>{contrat.montant}</BlurredText>
                <span style={{ fontSize: 12, color: COLORS.textMuted }}>HT</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";
import { BlurredText } from "./BlurredText";

const TERRAINS = [
  {
    name: "Terrain Boissy-le-Sec",
    ville: "Boissy-le-Sec (91)",
    surface: "2 450 m²",
    prix: "380 000 €",
    priorite: "P1",
    cs: "3/4",
  },
  {
    name: "Parcelle Étampes Nord",
    ville: "Étampes (91)",
    surface: "1 800 m²",
    prix: "245 000 €",
    priorite: "P2",
    cs: "2/3",
  },
  {
    name: "Lot ZAC Massy",
    ville: "Massy (91)",
    surface: "3 200 m²",
    prix: "520 000 €",
    priorite: "P3",
    cs: "5/5",
  },
];

const MapPinIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const GripIcon: React.FC = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" />
  </svg>
);

export const MockupFoncier: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 720 }}>
      {TERRAINS.map((terrain, i) => {
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
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <GripIcon />
              <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, flex: 1 }}>
                {terrain.name}
              </span>
            </div>

            {/* Location */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <MapPinIcon />
              <span style={{ fontSize: 15, color: COLORS.textMuted }}>{terrain.ville}</span>
            </div>

            {/* Surface + Prix */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 10 }}>
              <span style={{ fontSize: 15, color: COLORS.textSecondary }}>{terrain.surface}</span>
              <BlurredText style={{ fontSize: 15, color: COLORS.text, fontWeight: 600 }}>{terrain.prix}</BlurredText>
            </div>

            {/* Priority + CS */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.text }} />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 100,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.text,
                  }}
                >
                  {terrain.priorite}
                </span>
              </div>
              <span style={{ fontSize: 14, color: COLORS.textMuted }}>CS {terrain.cs}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, stagger } from "../lib/animations";

const PHASES = [
  { name: "Études préalables", type: "ÉTU", duration: "45j", start: 0, width: 22, level: 0 },
  { name: "Permis de construire", type: "ADM", duration: "90j", start: 12, width: 35, level: 0 },
  { name: "  Dépôt dossier", type: "ADM", duration: "15j", start: 12, width: 8, level: 1 },
  { name: "  Instruction", type: "ADM", duration: "60j", start: 20, width: 22, level: 1 },
  { name: "Gros œuvre", type: "TRV", duration: "120j", start: 42, width: 38, level: 0 },
  { name: "Second œuvre", type: "TRV", duration: "90j", start: 62, width: 28, level: 0 },
  { name: "Livraison", type: "LIV", duration: "30j", start: 88, width: 12, level: 0 },
];

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

export const MockupPlanning: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: 800,
        backgroundColor: COLORS.bgCard,
        borderRadius: 10,
        border: `1px solid ${COLORS.border}`,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>Planning Gantt</span>
        <span style={{ fontSize: 14, color: COLORS.textMuted, marginLeft: "auto" }}>Résidence Parc – 2026</span>
      </div>

      {/* Month headers */}
      <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.borderLight}` }}>
        <div style={{ width: 190, flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex" }}>
          {MONTHS.map((m, i) => (
            <span key={i} style={{ flex: 1, fontSize: 11, color: COLORS.textMuted, textAlign: "center", padding: "6px 0", borderLeft: `1px solid ${COLORS.borderLight}` }}>
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Rows */}
      {PHASES.map((phase, i) => {
        const delay = stagger(i, 5) + 5;
        const opacity = fadeIn(frame, delay, 12);
        const barWidth = interpolate(frame - delay - 5, [0, 20], [0, phase.width], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isChild = phase.level === 1;

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${COLORS.borderLight}`, opacity }}>
            {/* Sidebar */}
            <div style={{ width: 190, flexShrink: 0, padding: "8px 16px", paddingLeft: isChild ? 36 : 16, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: isChild ? COLORS.textMuted : COLORS.text, flexShrink: 0 }} />
              <span style={{ fontSize: isChild ? 13 : 15, fontWeight: isChild ? 400 : 600, color: isChild ? COLORS.textSecondary : COLORS.text, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {phase.name.trim()}
              </span>
              <span style={{ fontSize: 11, color: COLORS.textMuted, flexShrink: 0 }}>{phase.duration}</span>
            </div>

            {/* Bar area */}
            <div style={{ flex: 1, position: "relative", height: isChild ? 28 : 32 }}>
              {MONTHS.map((_, mi) => (
                <div key={mi} style={{ position: "absolute", left: `${(mi / MONTHS.length) * 100}%`, top: 0, bottom: 0, width: 1, backgroundColor: COLORS.borderLight }} />
              ))}
              <div
                style={{
                  position: "absolute",
                  left: `${phase.start}%`,
                  width: `${barWidth}%`,
                  height: isChild ? 14 : 18,
                  backgroundColor: isChild ? COLORS.textMuted : COLORS.text,
                  borderRadius: 4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: isChild ? 0.4 : 0.85,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";

// Faithful reproduction of CSTracker: Card > Progress > CSListItem list
// Each CSListItem: Checkbox + libelle + type badge (outline) + statut badge + deadline countdown

const CS_ITEMS = [
  { libelle: "Permis de construire", type: "Permis construire", statut: "levee", deadline: "", responsable: "Mairie" },
  { libelle: "Purge recours des tiers", type: "Purge recours", statut: "levee", deadline: "", responsable: "" },
  { libelle: "Obtention du financement", type: "Financement", statut: "en_attente", deadline: "J-12", deadlineColor: "#2563EB", responsable: "Banque Partenaire" },
  { libelle: "Étude de sol G2", type: "Etude sol", statut: "en_attente", deadline: "J-28", deadlineColor: COLORS.textMuted, responsable: "Bureau d'études" },
];

const CheckIcon: React.FC = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const MockupFoncier2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const levees = CS_ITEMS.filter((cs) => cs.statut === "levee").length;
  const total = CS_ITEMS.length;
  const pct = Math.round((levees / total) * 100);

  return (
    <div style={{ width: 720, backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      {/* CardHeader */}
      <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Conditions suspensives</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500, padding: "4px 12px", borderRadius: 6, border: `1px solid ${COLORS.border}`, color: COLORS.textSecondary }}>
            Échéance ↕
          </span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
          <span style={{ color: COLORS.textSecondary }}>{levees}/{total} levées</span>
          <span style={{ color: COLORS.textSecondary }}>{pct}%</span>
        </div>
        <div style={{ width: "100%", height: 8, backgroundColor: COLORS.borderLight, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", backgroundColor: COLORS.brand, borderRadius: 4 }} />
        </div>
      </div>

      {/* CS List */}
      <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {CS_ITEMS.map((cs, i) => {
          const delay = stagger(i, 8) + 5;
          const opacity = fadeIn(frame, delay, 10);
          const scale = scaleIn(frame, fps, delay);
          const isLevee = cs.statut === "levee";

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 6,
                border: `1px solid ${COLORS.border}`,
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              {/* Checkbox */}
              <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${isLevee ? COLORS.brand : COLORS.border}`, backgroundColor: isLevee ? COLORS.brand : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {isLevee && <CheckIcon />}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: isLevee ? COLORS.textMuted : COLORS.text, textDecoration: isLevee ? "line-through" : "none" }}>
                    {cs.libelle}
                  </span>
                  {/* Type badge (outline) */}
                  <span style={{ fontSize: 11, padding: "1px 6px", borderRadius: 100, border: `1px solid ${COLORS.border}`, color: COLORS.textSecondary }}>
                    {cs.type}
                  </span>
                </div>
                {/* Second row: responsable + deadline */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 3 }}>
                  {cs.responsable && (
                    <span style={{ fontSize: 12, color: COLORS.textMuted }}>{cs.responsable}</span>
                  )}
                  {cs.deadline && (
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: cs.deadlineColor }}>
                      <CalendarIcon />
                      {cs.deadline}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

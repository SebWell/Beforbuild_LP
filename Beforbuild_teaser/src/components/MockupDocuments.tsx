import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";

const FOLDERS = [
  { name: "01 – Études de sol", count: "4 fichiers", isPhase: true },
  { name: "02 – Permis de construire", count: "8 fichiers", isPhase: false },
];

const DOCS = [
  { name: "Étude G2 – Rapport complet.pdf", size: "4.2 Mo", date: "12 mars" },
  { name: "Plan masse V3.dwg", size: "8.1 Mo", date: "10 mars" },
];

const CHAT_MESSAGES = [
  { role: "user" as const, text: "Résume l'étude de sol G2" },
  { role: "ai" as const, text: "L'étude G2 révèle un sol argileux en surface (0-3m) avec une couche de calcaire à 4m. Recommandation : fondations profondes sur pieux..." },
];

const FolderIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const FileIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const ChevronIcon: React.FC = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const MockupDocuments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: 780, display: "flex", flexDirection: "column", gap: 14 }}>
      {/* File list */}
      <div style={{ backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        {/* Header */}
        <div style={{ display: "flex", padding: "10px 20px", backgroundColor: COLORS.bgSoft, borderBottom: `1px solid ${COLORS.borderLight}` }}>
          <span style={{ flex: 3, fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}>Nom</span>
          <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "center" }}>IA</span>
          <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "right" }}>Date</span>
          <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "right" }}>Taille</span>
        </div>

        {/* Folders */}
        {FOLDERS.map((folder, i) => {
          const delay = stagger(i, 6) + 3;
          const opacity = fadeIn(frame, delay, 10);
          return (
            <div key={`f${i}`} style={{ display: "flex", alignItems: "center", padding: "10px 20px", borderBottom: `1px solid ${COLORS.borderLight}`, backgroundColor: folder.isPhase ? `${COLORS.brand}06` : "transparent", opacity }}>
              <div style={{ flex: 3, display: "flex", alignItems: "center", gap: 10 }}>
                <ChevronIcon />
                <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: folder.isPhase ? `${COLORS.brand}15` : COLORS.bgSoft, display: "flex", alignItems: "center", justifyContent: "center", color: folder.isPhase ? COLORS.brand : COLORS.textMuted }}>
                  <FolderIcon />
                </div>
                <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.text }}>{folder.name}</span>
                {folder.isPhase && (
                  <span style={{ fontSize: 11, fontWeight: 500, color: COLORS.brand, backgroundColor: `${COLORS.brand}10`, padding: "2px 8px", borderRadius: 4 }}>
                    Phase en cours
                  </span>
                )}
              </div>
              <span style={{ flex: 1 }} />
              <span style={{ flex: 1 }} />
              <span style={{ flex: 1, fontSize: 13, color: COLORS.textMuted, textAlign: "right" }}>{folder.count}</span>
            </div>
          );
        })}

        {/* Documents */}
        {DOCS.map((doc, i) => {
          const delay = stagger(i, 6) + 15;
          const opacity = fadeIn(frame, delay, 10);
          return (
            <div key={`d${i}`} style={{ display: "flex", alignItems: "center", padding: "10px 20px 10px 60px", borderBottom: `1px solid ${COLORS.borderLight}`, opacity }}>
              <div style={{ flex: 3, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: `${COLORS.brand}10`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.brand }}>
                  <FileIcon />
                </div>
                <span style={{ fontSize: 15, color: COLORS.text }}>{doc.name}</span>
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: COLORS.brand }} />
              </div>
              <span style={{ flex: 1, fontSize: 13, color: COLORS.textMuted, textAlign: "right" }}>{doc.date}</span>
              <span style={{ flex: 1, fontSize: 13, color: COLORS.textMuted, textAlign: "right" }}>{doc.size}</span>
            </div>
          );
        })}
      </div>

      {/* Chat preview */}
      <div style={{ backgroundColor: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", opacity: fadeIn(frame, 22, 15) }}>
        <div style={{ padding: "10px 18px", borderBottom: `1px solid ${COLORS.borderLight}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>Chat IA</span>
        </div>
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          {CHAT_MESSAGES.map((msg, i) => {
            const delay = stagger(i, 12) + 28;
            const opacity = fadeIn(frame, delay, 12);
            const scale = scaleIn(frame, fps, delay);
            return (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", opacity, transform: `scale(${scale})` }}>
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "8px 14px",
                    borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    fontSize: 14,
                    lineHeight: 1.5,
                    backgroundColor: msg.role === "user" ? COLORS.text : COLORS.bgSoft,
                    color: msg.role === "user" ? "#fff" : COLORS.text,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

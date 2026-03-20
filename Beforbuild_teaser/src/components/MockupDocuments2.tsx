import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/constants";
import { fadeIn, scaleIn, stagger } from "../lib/animations";

// Faithful reproduction of DocumentCard grid view
// Each card: FileText icon in primary/10 bg + name + date + size + OCR status dot

const DOCUMENTS = [
  { name: "Permis de construire.pdf", date: "12 mars 2026", size: "4.2 Mo", ocr: "completed" },
  { name: "Étude G2 Rapport.pdf", date: "10 mars 2026", size: "12.8 Mo", ocr: "completed" },
  { name: "Plan masse V3.dwg", date: "8 mars 2026", size: "8.1 Mo", ocr: "completed" },
  { name: "CCTP Lot 01.pdf", date: "5 mars 2026", size: "2.4 Mo", ocr: "processing" },
  { name: "RE2020 Attestation.pdf", date: "1 mars 2026", size: "1.1 Mo", ocr: "completed" },
  { name: "Photos chantier.zip", date: "28 fév 2026", size: "45 Mo", ocr: "pending" },
];

const FileTextIcon: React.FC = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={COLORS.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const MoreVertIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

export const MockupDocuments2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, width: 780 }}>
      {DOCUMENTS.map((doc, i) => {
        const delay = stagger(i, 6) + 5;
        const opacity = fadeIn(frame, delay, 12);
        const scale = scaleIn(frame, fps, delay);

        const ocrColor = doc.ocr === "completed" ? COLORS.brand : doc.ocr === "processing" ? COLORS.text : COLORS.textMuted;

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `scale(${scale})`,
              backgroundColor: COLORS.bgCard,
              borderRadius: 10,
              border: `1px solid ${COLORS.border}`,
              padding: "14px 16px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header: icon + menu */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: `${COLORS.brand}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileTextIcon />
              </div>
              <MoreVertIcon />
            </div>

            {/* Name + OCR dot */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                {doc.name}
              </span>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: ocrColor, flexShrink: 0 }} />
            </div>

            {/* Date + size */}
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>{doc.date}</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{doc.size}</div>
          </div>
        );
      })}
    </div>
  );
};

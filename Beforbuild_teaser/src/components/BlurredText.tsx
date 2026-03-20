import React from "react";

export const BlurredText: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <span
    style={{
      filter: "blur(6px)",
      userSelect: "none",
      ...style,
    }}
  >
    {children}
  </span>
);

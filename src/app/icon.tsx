import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Dynamic SVG logo generator matching LogoMark design
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2b8cff 0%, #7048ff 50%, #ff2ca8 100%)",
          borderRadius: "8px",
          color: "white",
          fontFamily: "monospace",
          fontSize: "16px",
          fontWeight: "bold",
          border: "1.5px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        <span style={{ display: "flex", lineHeight: 1 }}>SG</span>
      </div>
    ),
    {
      ...size,
    }
  );
}

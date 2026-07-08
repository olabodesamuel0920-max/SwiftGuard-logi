import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Swift Guard Logistics — Command Centre";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
          background: "#050610",
          color: "#f7f9ff",
          fontFamily: "sans-serif",
          position: "relative",
          padding: "40px",
        }}
      >
        {/* Glowing backgrounds */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(43,140,255,0.12) 0%, transparent 70%)",
            left: "-100px",
            top: "-100px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,44,168,0.08) 0%, transparent 70%)",
            right: "-100px",
            bottom: "-100px",
          }}
        />

        {/* Shield Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            background: "linear-gradient(135deg, #2b8cff 0%, #7048ff 50%, #ff2ca8 100%)",
            borderRadius: "24px",
            border: "3px solid rgba(255,255,255,0.3)",
            marginBottom: "28px",
            boxShadow: "0 10px 40px rgba(112,92,255,0.3)",
          }}
        >
          <span style={{ fontSize: "56px", fontWeight: "bold", color: "white" }}>SG</span>
        </div>

        {/* Brand Text */}
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "900",
            letterSpacing: "4px",
            margin: "0 0 12px 0",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Swift Guard
        </h1>
        
        <p
          style={{
            fontSize: "22px",
            color: "#aab4ce",
            letterSpacing: "8px",
            textTransform: "uppercase",
            margin: "0",
            textAlign: "center",
          }}
        >
          Logistics Command Centre
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}

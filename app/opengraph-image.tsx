import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
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
          background: "#1a1613",
          color: "#faf7f2",
        }}
      >
        <div style={{ fontSize: 88, letterSpacing: 12, display: "flex" }}>EXCEPTION</div>
        <div style={{ fontSize: 28, letterSpacing: 10, color: "#d8bc8e", marginTop: 16, display: "flex" }}>
          BY K&amp;I
        </div>
      </div>
    ),
    { ...size }
  );
}

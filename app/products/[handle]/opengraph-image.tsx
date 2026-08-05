import { ImageResponse } from "next/og";
import { getProduct } from "@/lib/shopify/client";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  const image = product?.images[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: 72,
          background: image
            ? `linear-gradient(135deg, ${image.from}, ${image.to})`
            : "#0b5740",
          color: "#f8f3e7",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#b6c7b8", display: "flex" }}>
          EXCEPTION BY K&amp;I
        </div>
        <div style={{ fontSize: 56, marginTop: 16, maxWidth: 900, display: "flex" }}>
          {product?.title ?? "Exception by K&I"}
        </div>
      </div>
    ),
    { ...size }
  );
}

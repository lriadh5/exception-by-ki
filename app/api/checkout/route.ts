import { NextResponse } from "next/server";
import { createCheckoutCart } from "@/lib/shopify/client";
import { IS_PREVIEW_MODE } from "@/lib/env";

type CheckoutRequestBody = {
  lines?: { variantId: string; quantity: number }[];
};

export async function POST(request: Request) {
  if (IS_PREVIEW_MODE) {
    return NextResponse.json(
      { error: "Checkout is disabled in preview mode — no Shopify store is connected." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as CheckoutRequestBody | null;
  if (!body || !Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const validLines = body.lines.every(
    (l) => typeof l.variantId === "string" && l.variantId.length > 0 && Number.isInteger(l.quantity) && l.quantity > 0
  );
  if (!validLines) {
    return NextResponse.json({ error: "Invalid cart data." }, { status: 400 });
  }

  try {
    const { checkoutUrl } = await createCheckoutCart(body.lines);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed. Please try again." },
      { status: 502 }
    );
  }
}

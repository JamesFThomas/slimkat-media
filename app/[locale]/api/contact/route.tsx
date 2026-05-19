import type { NextRequest } from "next/server";

type GoogleSheetsResponse = {
  status: "success" | "error";
};

const googleSheetsEndpoint =
  "https://script.google.com/macros/s/AKfycbxMKuWhC3PoJjj1t00WmwRaBy3K-a37eDx6x1D3gmCYdNEvDcBRBr1Dp1RYc8Z_yvoDCg/exec";

export async function POST(request: NextRequest) {
  try {
    // 1) Parse request body safely inside try/catch
    const body = await request.json().catch(() => null);
    const { firstName, lastName, email, phone, service, message } = body ?? {};

    // 2) Validate required fields
    if (!firstName || !lastName || !email || !service || !message) {
      return new Response(
        JSON.stringify({ status: "error", message: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // 3) Call Apps Script from the server (no browser CORS)
    const upstreamResponse = await fetch(googleSheetsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        firstName,
        lastName,
        email,
        phone,
        service,
        message,
      }),
      cache: "no-store",
    });

    // 4) Read text first so we can log + handle non-JSON responses cleanly
    const upstreamText = await upstreamResponse.text();

    // 5) If upstream is non-2xx, return a controlled error
    if (!upstreamResponse.ok) {
      console.error("Apps Script error", {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        body: upstreamText,
      });

      return new Response(
        JSON.stringify({
          status: "error",
          message: "Contact submission failed",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    // 6) Parse upstream JSON if possible, otherwise treat it as an error
    let upstreamJson: GoogleSheetsResponse | null = null;

    try {
      upstreamJson = JSON.parse(upstreamText) as GoogleSheetsResponse;
    } catch {
      console.error("Apps Script returned non-JSON success response", {
        status: upstreamResponse.status,
        body: upstreamText,
      });

      return new Response(
        JSON.stringify({
          status: "error",
          message: "Contact submission failed",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    // 7) Interpret Apps Script response
    if (upstreamJson?.status === "success") {
      return new Response(
        JSON.stringify({
          status: "success",
          message: "Contact submission successful",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    console.error("Apps Script responded without success status", upstreamJson);

    return new Response(
      JSON.stringify({ status: "error", message: "Contact submission failed" }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);

    return new Response(
      JSON.stringify({ status: "error", message: "Contact submission failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

/**
 * d3jusdevspace — API Proxy Route
 *
 * Proxies all `/api/proxy/*` requests to the FastAPI backend.
 *
 * Why proxy?
 *  1. Avoids CORS issues in development (same-origin requests).
 *  2. Allows the backend URL to remain a server-side secret.
 *  3. Provides a single place to add server-side auth header injection,
 *     request logging, or rate-limit logic in the future.
 *
 * The backend URL is read from BACKEND_URL env var (defaults to
 * http://localhost:8000 in dev). The proxy strips the `/api/proxy` prefix
 * and forwards everything after it to `${BACKEND_URL}/api/v1/...`.
 */

import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ?? "http://localhost:8000";

/**
 * Generic handler that forwards the request to the backend.
 */
async function proxyRequest(request: NextRequest): Promise<NextResponse> {
  // Strip `/api/proxy` prefix to get the target path.
  // e.g. `/api/proxy/posts?page=1` → `/api/v1/posts?page=1`
  const url = new URL(request.url);
  const targetPath = url.pathname.replace(/^\/api\/proxy/, "/api/v1");
  const targetUrl = `${BACKEND_URL}${targetPath}${url.search}`;

  // Build headers — forward everything except host.
  const headers = new Headers(request.headers);
  headers.delete("host");

  // Build fetch options.
  const init: RequestInit = {
    method: request.method,
    headers,
  };

  // Forward body for non-GET/HEAD requests.
  // Multipart form data must be forwarded as raw bytes to preserve
  // the boundary markers; regular JSON bodies use text.
  if (request.method !== "GET" && request.method !== "HEAD") {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      init.body = await request.arrayBuffer();
    } else {
      init.body = await request.text();
    }
  }

  try {
    // 20s timeout - apparently, cold-starts can take ~7s.
    // need to get my sub up.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    const backendResponse = await fetch(targetUrl, {
      ...init,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const responseBody = await backendResponse.text();

    // Create a NextResponse that mirrors the backend response.
    const response = new NextResponse(responseBody, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
    });

    // Forward relevant headers from the backend.
    const forwardHeaders = [
      "content-type",
      "cache-control",
      "x-request-id",
    ];
    for (const header of forwardHeaders) {
      const value = backendResponse.headers.get(header);
      if (value) {
        response.headers.set(header, value);
      }
    }

    return response;
  } catch (error) {
    console.error("[API Proxy] Backend request failed:", error);
    return NextResponse.json(
      { detail: "Backend service unavailable." },
      { status: 502 },
    );
  }
}

/* ── HTTP Method Handlers ── */

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

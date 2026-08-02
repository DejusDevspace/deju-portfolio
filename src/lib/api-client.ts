/**
 * d3jusdevspace — Axios API Client
 *
 * Centralised HTTP client with:
 *  - Base URL pointing at the Next.js API proxy (`/api/proxy`)
 *  - Automatic `Authorization` header injection for admin routes
 *  - Standardised error normalisation
 */

import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiError } from "@/types";
import { getSession, signOut } from "next-auth/react";

/* ============================================================================
  Configuration
============================================================================ */

const API_BASE_URL = typeof window !== "undefined"
  ? "/api/proxy"
  : `${process.env.BACKEND_URL ?? "http://localhost:8000"}/api/v1`;

/* ============================================================================
  Client Instance
============================================================================ */

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


/* ============================================================================
  Request Interceptor — attach Authorization token
============================================================================ */

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Retrieve the NextAuth session which contains our custom HS256 accessToken
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ============================================================================
  Response Interceptor — normalise errors
============================================================================ */

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string }>) => {
    const apiError: ApiError = {
      detail:
        error.response?.data?.detail ??
        error.message ??
        "An unexpected error occurred.",
      status: error.response?.status ?? 500,
    };

    // Handle 401 globally — clear NextAuth session & redirect to login
    if (apiError.status === 401 && typeof window !== "undefined") {
      // Don't redirect if already on a public page
      if (window.location.pathname.startsWith("/blog/admin")) {
        signOut({ callbackUrl: "/blog/admin/login" });
      }
    }

    return Promise.reject(apiError);
  },
);

export default apiClient;

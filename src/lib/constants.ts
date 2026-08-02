/**
 * d3jusdevspace — Application constants.
 */

/** Base path for the backend API (relative to the proxy). */
export const API_V1 = "/api/v1";

/** Site-wide metadata. */
export const SITE = {
  name: "d3jusdevspace",
  description:
    "Personal knowledge hub, blog, and AI Agent collaboration blogging platform",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Pagination defaults. */
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  adminDefaultLimit: 20,
} as const;

/** Local storage keys. */
export const STORAGE_KEYS = {
  token: "d3jusdevspace_token",
  theme: "d3jusdevspace_theme",
} as const;

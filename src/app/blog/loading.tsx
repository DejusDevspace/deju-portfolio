/**
 * App-level loading boundary.
 *
 * Next.js App Router renders this component automatically inside a
 * <Suspense> boundary whenever a route segment is loading.
 * Uses the single canonical LoadingSpinner for consistency.
 */

import { LoadingSpinner } from "@/components/ui";

export default function Loading() {
	return <LoadingSpinner size="lg" fullPage label="Loading page…" />;
}

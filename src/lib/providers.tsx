/**
 * d3jusdevspace — Client Providers
 *
 * Wraps the app in:
 *  1. React Query (data fetching / caching)
 *  2. Persisted cache (localStorage — instant loads on return visits)
 *  3. Blog toast notifications
 *
 * Theme is provided once at the app root (portfolio ThemeProvider,
 * dark default, no system) — see src/app/layout.tsx.
 */

"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ToastProvider } from "@/context/toast-context";

interface ProvidersProps {
	children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	// Create a stable QueryClient per React tree (avoids sharing across requests in SSR)
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Baseline: 2 min stale, 30 min GC.
						// Individual hooks override staleTime for data that changes less.
						staleTime: 2 * 60 * 1000, // 2 minutes
						gcTime: 30 * 60 * 1000, // 30 minutes
						refetchOnWindowFocus: false,
						retry: 1,
					},
				},
			}),
	);

	// localStorage persister — survives page reloads and browser restarts.
	// Uses the sync persister since localStorage is synchronous.
	// Created lazily inside the component; undefined during SSR.
	const [persister] = useState(() =>
		typeof window !== "undefined"
			? createSyncStoragePersister({
					storage: window.localStorage,
					key: "d3jusdevspace-cache",
				})
			: null,
	);

	const childrenWithToasts = <ToastProvider>{children}</ToastProvider>;

	// During SSR, persister is null — use the regular QueryClientProvider
	// to avoid the "promise.then is not a function" error.
	if (!persister) {
		return (
			<QueryClientProvider client={queryClient}>
				{childrenWithToasts}
			</QueryClientProvider>
		);
	}

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{
				persister,
				// Max age for persisted cache: 24 hours.
				// After that, cache is discarded and fresh data is fetched.
				maxAge: 24 * 60 * 60 * 1000,
				// Only persist public data — skip admin queries.
				dehydrateOptions: {
					shouldDehydrateQuery: (query) => {
						const key = query.queryKey[0] as string;
						return key !== "admin" && key !== "health";
					},
				},
			}}
		>
			{childrenWithToasts}
		</PersistQueryClientProvider>
	);
}

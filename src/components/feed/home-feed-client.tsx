"use client";

import { useState, useEffect } from "react";
import { usePosts } from "@/hooks/use-api";
import { useSearchParams, useRouter } from "next/navigation";
import HeroSection from "./hero-section";
import FilterSidebar from "./filter-sidebar";
import MobileFilterBar from "./mobile-filter-bar";
import PostCard from "./post-card";
import type { PostListItem } from "@/types";
import { FileText, FilterX } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function HomeFeedClient() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const activeCategory = searchParams.get("category");
	const activeTag = searchParams.get("tag");
	const activeSeries = searchParams.get("series");

	const [page, setPage] = useState(1);
	const [allPosts, setAllPosts] = useState<PostListItem[]>([]);

	const { data, isLoading, isFetching, error } = usePosts({
		page,
		limit: 10,
		category: activeCategory || undefined,
		tag: activeTag || undefined,
		series: activeSeries || undefined,
	});

	// Reset posts and page when filters change
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setPage(1);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setAllPosts([]);
	}, [activeCategory, activeTag, activeSeries]);

	// Accumulate posts when data changes
	useEffect(() => {
		if (data?.items) {
			if (page === 1) {
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setAllPosts(data.items);
			} else {
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setAllPosts((prev) => {
					// Prevent duplicates
					const existingIds = new Set(prev.map((p) => p.id));
					const newPosts = data.items.filter((p) => !existingIds.has(p.id));
					return [...prev, ...newPosts];
				});
			}
		}
	}, [data, page]);

	const updateFilter = (
		type: "category" | "tag" | "series",
		value: string | null,
	) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set(type, value);
		} else {
			params.delete(type);
		}
		router.push(`/?${params.toString()}`);
	};

	const hasMore = data ? data.page < data.pages : false;
	const hasActiveFilters = activeCategory || activeTag || activeSeries;

	// Track if we've completed at least one load to avoid full-page reloads on filter changes
	const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
	useEffect(() => {
		if (data) setHasLoadedOnce(true);
	}, [data]);

	// Full-page skeleton while the very first fetch is in-flight.
	// Nothing hardcoded (hero, sidebar, filters) renders until data arrives for the first time.
	if (isLoading && !hasLoadedOnce) {
		return (
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 lg:flex-row lg:px-8">
				{/* Sidebar skeleton — desktop only */}
				<div className="hidden lg:flex w-60 shrink-0 flex-col gap-6 pr-6">
					<div className="h-4 w-24 rounded skeleton" />
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="h-8 w-full rounded skeleton" />
					))}
				</div>

				{/* Right column skeleton */}
				<div className="flex-1 flex flex-col gap-6">
					{/* Hero skeleton */}
					<div className="border-t-2 border-border-subtle pt-10 pb-8 mb-2">
						<div className="h-12 w-72 rounded skeleton mb-4" />
						<div className="h-5 w-96 max-w-full rounded skeleton mb-2" />
						<div className="h-5 w-64 rounded skeleton mb-6" />
						<div className="h-8 w-44 rounded skeleton" />
					</div>

					{/* Mobile filter skeleton */}
					<div className="flex gap-2 overflow-hidden lg:hidden">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="h-7 w-20 shrink-0 rounded-full skeleton"
							/>
						))}
					</div>

					{/* Post card skeletons */}
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="h-48 w-full rounded-xl border border-border-subtle bg-bg-surface p-6 skeleton"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-5 lg:py-12 lg:flex-row lg:px-8">
			<div className="sticky top-24 h-full">
				<FilterSidebar
					activeCategory={activeCategory}
					activeTag={activeTag}
					activeSeries={activeSeries}
					onCategoryChange={(cat) => updateFilter("category", cat)}
					onTagChange={(tag) => updateFilter("tag", tag)}
					onSeriesChange={(series) => updateFilter("series", series)}
				/>
			</div>

			<div className="flex-1">
				<HeroSection totalPosts={data?.total || 0} />

				<MobileFilterBar
					activeCategory={activeCategory}
					activeTag={activeTag}
					activeSeries={activeSeries}
					onCategoryChange={(cat) => updateFilter("category", cat)}
					onTagChange={(tag) => updateFilter("tag", tag)}
					onSeriesChange={(series) => updateFilter("series", series)}
				/>

				{hasActiveFilters && (
					<div className="mb-6 flex items-center justify-between rounded bg-bg-elevated px-4 py-3 border border-border-default">
						<span className="font-mono text-xs uppercase text-text-secondary">
							Showing filters:{" "}
							{activeCategory && (
								<span className="text-accent">{activeCategory}</span>
							)}
							{activeCategory && (activeTag || activeSeries) && " + "}
							{activeTag && <span className="text-accent">{activeTag}</span>}
							{activeTag && activeSeries && " + "}
							{activeSeries && (
								<span className="text-accent">{activeSeries}</span>
							)}
						</span>
						<button
							onClick={() => router.push("/blog")}
							className="flex items-center gap-1 font-mono text-[0.65rem] uppercase text-text-tertiary cursor-pointer hover:text-danger transition-colors"
						>
							<FilterX className="h-3 w-3" />
							Clear
						</button>
					</div>
				)}

				{error ? (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<p className="font-display text-h3 text-danger">
							Couldn&apos;t load posts
						</p>
						<p className="text-text-secondary">
							Something went wrong. Try refreshing.
						</p>
					</div>
				) : isFetching && allPosts.length === 0 ? (
					<div className="flex flex-col gap-5 mt-2">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="h-48 w-full rounded-xl border border-border-subtle bg-bg-surface p-6 skeleton"
							/>
						))}
					</div>
				) : allPosts.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<FileText className="mb-4 h-12 w-12 text-text-tertiary" />
						<p className="mb-2 font-display text-h3 text-text-primary">
							Nothing here yet
						</p>
						<p className="text-text-secondary">
							{hasActiveFilters
								? "No posts match this filter."
								: "Check back soon — content is on the way."}
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-5">
						{allPosts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}

						{hasMore && (
							<div className="mt-8 flex justify-center">
								<button
									onClick={() => setPage((p) => p + 1)}
									disabled={isFetching}
									className="btn-primary uppercase text-xs tracking-wider"
								>
									{isFetching ? (
										<>
											<LoadingSpinner size="sm" label="Loading..." />
										</>
									) : (
										"Load More"
									)}
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

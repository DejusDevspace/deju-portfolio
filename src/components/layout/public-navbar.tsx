"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Moon, Sun, Loader2, Layers } from "lucide-react";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { semanticSearch } from "@/services/api";

// Simple custom hook for debouncing a value.
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);
	return debouncedValue;
}

export default function PublicNavbar() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Search state
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
	const desktopSearchRef = useRef<HTMLDivElement>(null);
	const mobileSearchRef = useRef<HTMLDivElement>(null);
	const mobilePanelRef = useRef<HTMLDivElement>(null);
	const debouncedQuery = useDebounce(searchQuery, 400);

	// Avoid hydration mismatch — theme is undefined on the server.
	useEffect(() => setMounted(true), []);

	// Handle clicking outside the search dropdown to close it.
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Node;
			const isOutsideDesktop =
				!desktopSearchRef.current || !desktopSearchRef.current.contains(target);
			const isOutsideMobile =
				!mobilePanelRef.current || !mobilePanelRef.current.contains(target);

			if (isOutsideDesktop && isOutsideMobile) {
				setIsSearchOpen(false);
				setIsMobileSearchOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const { data: searchData, isLoading: isSearchLoading } = useQuery({
		queryKey: ["semantic-search", debouncedQuery],
		queryFn: () => semanticSearch(debouncedQuery, 5),
		enabled: debouncedQuery.length >= 2,
		staleTime: 60000, // 1 minute
	});

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const renderSearchBar = (
		ref: React.RefObject<HTMLDivElement | null>,
		isMobile: boolean = false,
	) => (
		<div className={`relative w-full ${isMobile ? "" : "max-w-xl"}`} ref={ref}>
			<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
			<input
				type="text"
				placeholder="Search posts..."
				className="input w-full bg-bg-page pl-10!"
				value={searchQuery}
				onChange={(e) => {
					setSearchQuery(e.target.value);
					setIsSearchOpen(true);
				}}
				onFocus={() => {
					if (searchQuery.length >= 2) setIsSearchOpen(true);
				}}
				autoFocus={isMobile}
			/>

			{/* Search Dropdown */}
			{isSearchOpen && debouncedQuery.length >= 2 && (
				<div className="absolute top-full left-0 mt-2 w-full rounded-md border border-border-subtle bg-bg-elevated shadow-xl overflow-hidden z-50">
					{isSearchLoading ? (
						<div className="flex items-center justify-center p-4 text-text-tertiary">
							<Loader2 className="h-5 w-5 animate-spin mr-2" />
							<span>Searching context...</span>
						</div>
					) : searchData?.results && searchData.results.length > 0 ? (
						<ul className="max-h-96 overflow-y-auto py-2">
							{searchData.results.map((hit) => (
								<li key={hit.post.id}>
									<Link
										href={`/blog/posts/${hit.post.slug}`}
										className="block px-4 py-3 hover:bg-bg-subtle transition-colors border-b border-border-subtle last:border-0"
										onClick={() => {
											setIsSearchOpen(false);
											setSearchQuery("");
											if (isMobile) setIsMobileSearchOpen(false);
										}}
									>
										<div className="flex justify-between items-start mb-1">
											<span className="font-semibold text-text-primary text-sm line-clamp-1">
												{hit.post.title}
											</span>
											<span className="flex items-center gap-1.5 shrink-0">
												<span className="text-xs font-mono text-accent whitespace-nowrap bg-accent-muted px-1.5 py-0.5 rounded">
													{Math.round(hit.aggregated_score * 100)}% match
												</span>
												{hit.match_type !== "semantic" && (
													<span
														className={`text-[0.6rem] font-mono uppercase tracking-wider px-1 py-0.5 rounded-sm ${
															hit.match_type === "hybrid"
																? "text-info bg-info-muted"
																: "text-warning bg-warning-muted"
														}`}
													>
														{hit.match_type}
													</span>
												)}
											</span>
										</div>
										{hit.highlighted_snippet ? (
											<p
												className="text-xs text-text-secondary line-clamp-3 mt-1 [&_mark]:bg-accent-muted [&_mark]:text-accent [&_mark]:rounded-sm [&_mark]:px-0.5"
												dangerouslySetInnerHTML={{
													__html: hit.highlighted_snippet,
												}}
											/>
										) : (
											<p className="text-xs text-text-secondary line-clamp-2 mt-1 italic">
												"{hit.matched_chunk}"
											</p>
										)}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<div className="p-4 text-center text-sm text-text-secondary">
							No semantic matches found for "{debouncedQuery}".
						</div>
					)}
				</div>
			)}
		</div>
	);

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-surface">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
				{/* Brand */}
				<Link
					href="/blog"
					className="font-mono text-lg font-bold tracking-wider text-accent uppercase"
					style={{ textShadow: "var(--shadow-neon-accent)" }}
				>
					d3jusdevspace
				</Link>

				{/* Center: Search (Desktop) */}
				<div className="hidden md:flex flex-1 items-center justify-center px-8">
					{renderSearchBar(desktopSearchRef, false)}
				</div>

				{/* Right: Actions */}
				<div className="flex items-center gap-2 md:gap-4">
					<button
						className="md:hidden rounded-md p-2 text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
						onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
						aria-label="Toggle mobile search"
					>
						<Search className="h-5 w-5" />
					</button>

					<button
						onClick={toggleTheme}
						className="rounded-md p-2 text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
						aria-label="Toggle theme"
					>
						{mounted ? (
							theme === "dark" ? (
								<Sun className="h-5 w-5" />
							) : (
								<Moon className="h-5 w-5" />
							)
						) : (
							<div className="h-5 w-5" />
						)}
					</button>

					<Link
						href="/blog/series"
						className="hidden md:inline-flex items-center gap-1.5 rounded border border-border-default px-3 py-1.5 font-mono text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
					>
						<Layers size={12} />
						Series
					</Link>

					<a
						href="https://github.com/DejusDevspace/my-blog"
						target="_blank"
						rel="noopener noreferrer"
						className="hidden md:inline-flex rounded border border-border-default px-3 py-1.5 font-mono text-sm text-accent hover:border-accent hover:bg-accent-muted transition-colors"
					>
						GitHub
					</a>
				</div>
			</div>

			{/* Mobile Search Panel */}
			{isMobileSearchOpen && (
				<div ref={mobilePanelRef} className="md:hidden border-t border-border-subtle bg-bg-surface px-4 py-3 shadow-md">
					{renderSearchBar(mobileSearchRef, true)}
					<div className="mt-3 flex items-center gap-3 border-t border-border-subtle pt-3">
						<Link
							href="/blog/series"
							className="flex items-center gap-1.5 text-sm font-mono text-text-secondary hover:text-accent transition-colors"
							onClick={() => setIsMobileSearchOpen(false)}
						>
							<Layers size={12} />
							Series
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { Layers } from "lucide-react";
import * as api from "@/services/api";

interface FilterSidebarProps {
	activeCategory: string | null;
	activeTag: string | null;
	activeSeries: string | null;
	onCategoryChange: (categorySlug: string | null) => void;
	onTagChange: (tagSlug: string | null) => void;
	onSeriesChange: (seriesSlug: string | null) => void;
}

export default function FilterSidebar({
	activeCategory,
	activeTag,
	activeSeries,
	onCategoryChange,
	onTagChange,
	onSeriesChange,
}: FilterSidebarProps) {
	const { data: categories } = useQuery({
		queryKey: ["public", "categories"],
		queryFn: api.getCategories,
	});

	const { data: tags } = useQuery({
		queryKey: ["public", "tags"],
		queryFn: api.getTags,
	});

	const { data: seriesList } = useQuery({
		queryKey: ["public", "series"],
		queryFn: api.getPublicSeries,
	});

	return (
		<aside className="hidden lg:flex flex-col gap-8 w-60 shrink-0 border-r border-border-subtle pr-6 hide-scrollbar">
			{/* Categories */}
			<div>
				<h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-tertiary">
					Categories
				</h3>
				<ul className="flex flex-col gap-1">
					<li>
						<button
							onClick={() => onCategoryChange(null)}
							className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
								!activeCategory
									? "bg-accent-muted text-accent border-l-2 border-accent"
									: "text-text-secondary hover:text-text-primary"
							}`}
						>
							Latest
						</button>
					</li>
					{categories?.map((cat) => (
						<li key={cat.id}>
							<button
								onClick={() => onCategoryChange(cat.slug)}
								className={`w-full text-left px-3 py-2 text-sm cursor-pointer font-medium transition-colors ${
									activeCategory === cat.slug
										? "bg-accent-muted text-accent border-l-2 border-accent"
										: "text-text-secondary hover:text-text-primary border-l-2 border-transparent"
								}`}
							>
								{cat.name}
							</button>
						</li>
					))}
				</ul>
			</div>

			{/* Series */}
			{seriesList && seriesList.length > 0 && (
				<div>
					<h3 className="mb-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-tertiary">
						<Layers size={10} />
						Series
					</h3>
					<div className="flex flex-col gap-1">
						{seriesList.map((s) => (
							<button
								key={s.id}
								onClick={() =>
									onSeriesChange(activeSeries === s.slug ? null : s.slug)
								}
								className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
									activeSeries === s.slug
										? "bg-accent-muted text-accent border-l-2 border-accent"
										: "text-text-secondary hover:text-text-primary border-l-2 border-transparent"
								}`}
							>
								<span>{s.title}</span>
								<span className="ml-1 font-mono text-[0.6rem] text-text-tertiary">
									({s.post_count})
								</span>
							</button>
						))}
					</div>
				</div>
			)}

			{/* Trending Tags — commented out for customization later
			<div>
				<h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-tertiary">
					Trending Tags
				</h3>
				<div className="flex flex-wrap gap-2">
					{tags?.map((tag) => (
						<button
							key={tag.id}
							onClick={() =>
								onTagChange(activeTag === tag.slug ? null : tag.slug)
							}
							className={`tag cursor-pointer hover:border-accent hover:text-accent transition-colors ${
								activeTag === tag.slug
									? "bg-accent-muted border-accent text-accent"
									: ""
							}`}
						>
							{tag.name}
						</button>
					))}
				</div>
			</div>
			*/}

			{/* Profile Widget */}
			<div className="mt-auto pt-8 border-t border-border-subtle flex items-center gap-3">
				<div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-bg-elevated border border-border-default">
					<img
						src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=d3ju&backgroundColor=1f2937"
						alt="d3ju"
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="flex flex-col">
					<span className="font-mono text-sm font-bold text-text-primary">
						d3ju
					</span>
					<span className="font-mono text-[0.65rem] font-bold text-accent uppercase tracking-wider">
						AI/ML ENGINEER
					</span>
				</div>
			</div>
		</aside>
	);
}

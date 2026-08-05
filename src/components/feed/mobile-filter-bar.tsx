"use client";

import { useQuery } from "@tanstack/react-query";
import { Layers } from "lucide-react";
import * as api from "@/services/api";

interface MobileFilterBarProps {
	activeCategory: string | null;
	activeTag: string | null;
	activeSeries: string | null;
	onCategoryChange: (categorySlug: string | null) => void;
	onTagChange: (tagSlug: string | null) => void;
	onSeriesChange: (seriesSlug: string | null) => void;
}

export default function MobileFilterBar({
	activeCategory,
	activeSeries,
	onCategoryChange,
	onSeriesChange,
}: MobileFilterBarProps) {
	const { data: categories } = useQuery({
		queryKey: ["public", "categories"],
		queryFn: api.getCategories,
	});

	const { data: seriesList } = useQuery({
		queryKey: ["public", "series"],
		queryFn: api.getPublicSeries,
	});

	return (
		<div className="mb-6 flex flex-col gap-3 lg:hidden">
			{/* Category pills */}
			<div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
				<button
					onClick={() => onCategoryChange(null)}
					className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
						!activeCategory
							? "bg-accent text-bg-page"
							: "border border-border-default bg-bg-surface text-text-secondary hover:text-text-primary"
					}`}
				>
					Latest
				</button>
				{categories?.map((cat) => (
					<button
						key={cat.id}
						onClick={() => onCategoryChange(cat.slug)}
						className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider transition-colors ${
							activeCategory === cat.slug
								? "bg-accent text-bg-page"
								: "border border-border-default bg-bg-surface text-text-secondary hover:text-text-primary"
						}`}
					>
						{cat.name}
					</button>
				))}
			</div>

			{/* Series pills — only shown if series exist */}
			{seriesList && seriesList.length > 0 && (
				<div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
					<Layers size={10} className="mt-1.5 shrink-0 text-text-tertiary" />
					{seriesList.map((s) => (
						<button
							key={s.id}
							onClick={() =>
								onSeriesChange(activeSeries === s.slug ? null : s.slug)
							}
							className={`shrink-0 cursor-pointer rounded-full px-3 py-1.5 font-mono text-[0.65rem] tracking-wider transition-colors ${
								activeSeries === s.slug
									? "bg-accent text-bg-page"
									: "border border-border-default bg-bg-surface text-text-secondary hover:text-text-primary"
							}`}
						>
							{s.title}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

import type { Metadata } from "next";
import Link from "next/link";
import { Layers, ArrowLeft } from "lucide-react";
import { getPublicSeries } from "@/services/api";

export const metadata: Metadata = {
	title: "Series — d3jusdevspace",
	description: "Browse all blog series on d3jusdevspace.",
	openGraph: {
		title: "Series — d3jusdevspace",
		description: "Browse all blog series.",
	},
};

export default async function SeriesIndexPage() {
	let series;

	try {
		series = await getPublicSeries();
	} catch {
		return (
			<div className="flex h-[50vh] flex-col items-center justify-center text-center">
				<h1 className="mb-4 font-display text-2xl font-bold text-danger">
					Failed to load series
				</h1>
				<p className="text-text-secondary">
					There was an error connecting to the server.
				</p>
			</div>
		);
	}

	return (
		<main className="mx-auto w-full max-w-4xl px-4 py-16 lg:px-8">
			<nav className="mb-8 flex items-center gap-2 text-xs font-mono text-text-tertiary">
				<Link
					href="/blog"
					className="flex items-center gap-1 transition-colors hover:text-accent"
				>
					<ArrowLeft size={12} />
					Home
				</Link>
			</nav>
			<div className="mb-12 text-center">
				<h1 className="mb-3 font-display text-h2 font-bold text-text-primary">
					Series
				</h1>
				<p className="text-text-secondary">
					Deep dives and multi-part stories, collected in one place.
				</p>
			</div>

			{series.length === 0 ? (
				<div className="rounded-xl border border-border-subtle bg-bg-surface p-12 text-center">
					<Layers
						size={40}
						className="mx-auto mb-4 text-text-tertiary"
					/>
					<p className="font-display text-lg font-semibold text-text-primary">
						No series yet
					</p>
					<p className="mt-1 text-sm text-text-secondary">
						Check back later for new multi-part content.
					</p>
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2">
					{series.map((s) => (
						<Link
							key={s.id}
							href={`/series/${s.slug}`}
							className="group rounded-xl border border-border-subtle bg-bg-surface p-6 transition-colors hover:border-accent hover:bg-bg-elevated"
						>
							<div className="mb-3 flex items-center gap-2">
								<Layers
									size={14}
									className="text-accent"
								/>
								<span className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
									Series
								</span>
							</div>
							<h2 className="mb-2 font-display text-lg font-semibold text-text-primary transition-colors group-hover:text-accent">
								{s.title}
							</h2>
							{s.description && (
								<p className="mb-3 line-clamp-2 text-sm text-text-secondary">
									{s.description}
								</p>
							)}
							<div className="font-mono text-xs text-text-tertiary">
								{s.post_count} {s.post_count === 1 ? "post" : "posts"}
							</div>
						</Link>
					))}
				</div>
			)}
		</main>
	);
}

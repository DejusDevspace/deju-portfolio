import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layers, ChevronRight, Clock, FileText } from "lucide-react";
import { getSeriesBySlug } from "@/services/api";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;

	try {
		const series = await getSeriesBySlug(slug);
		return {
			title: `${series.title} — Series — d3jusdevspace`,
			description: series.description || `Browse the ${series.title} series.`,
			openGraph: {
				title: `${series.title} — Series`,
				description: series.description || undefined,
			},
		};
	} catch {
		return {
			title: "Series Not Found — d3jusdevspace",
		};
	}
}

function estimateReadingTime(text: string): number {
	const wordsPerMinute = 200;
	const words = text.split(/\s+/).length;
	return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function formatDate(dateStr: string | null): string {
	if (!dateStr) return "";
	return new Date(dateStr).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export default async function SeriesDetailPage({ params }: PageProps) {
	const { slug } = await params;

	let series;
	try {
		series = await getSeriesBySlug(slug);
	} catch (error: any) {
		if (error?.status === 404 || error?.response?.status === 404) {
			notFound();
		}
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

	const publishedPosts = series.posts
		.filter((p) => p.status === "published")
		.sort((a, b) => (a.series_order ?? 0) - (b.series_order ?? 0));

	return (
		<main className="mx-auto w-full max-w-3xl px-4 py-16 lg:px-8">
			{/* Breadcrumb */}
			<nav className="mb-8 flex items-center gap-2 text-xs font-mono text-text-tertiary">
				<Link
					href="/blog"
					className="transition-colors hover:text-accent"
				>
					Home
				</Link>
				<ChevronRight size={12} />
				<Link
					href="/blog/series"
					className="transition-colors hover:text-accent"
				>
					Series
				</Link>
				<ChevronRight size={12} />
				<span className="text-text-secondary">{series.title}</span>
			</nav>

			{/* Series Header */}
			<div className="mb-4 flex items-center gap-2">
				<Layers size={16} className="text-accent" />
				<span className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
					Series
				</span>
			</div>
			<h1 className="mb-4 font-display text-h2 font-bold text-text-primary">
				{series.title}
			</h1>
			{series.description && (
				<p className="mb-8 text-lg text-text-secondary">
					{series.description}
				</p>
			)}

			{/* Post List */}
			{publishedPosts.length === 0 ? (
				<div className="mt-12 rounded-xl border border-border-subtle bg-bg-surface p-12 text-center">
					<FileText
						size={36}
						className="mx-auto mb-3 text-text-tertiary"
					/>
					<p className="font-display text-lg font-semibold text-text-primary">
						No published posts yet
					</p>
					<p className="mt-1 text-sm text-text-secondary">
						Posts in this series are being written.
					</p>
				</div>
			) : (
				<div className="space-y-2">
					{publishedPosts.map((post, index) => (
						<Link
							key={post.id}
							href={`/blog/posts/${post.slug}`}
							className="group flex items-start gap-4 rounded-lg border border-border-subtle bg-bg-surface p-5 transition-colors hover:border-accent hover:bg-bg-elevated"
						>
							{/* Order Number */}
							<span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-muted font-mono text-sm font-bold text-accent">
								{post.series_order ?? index + 1}
							</span>

							{/* Content */}
							<div className="min-w-0 flex-1">
								<h2 className="font-display text-base font-semibold text-text-primary transition-colors group-hover:text-accent">
									{post.title}
								</h2>
								<div className="mt-1.5 flex items-center gap-3 text-xs text-text-tertiary">
									{post.published_at && (
										<span>{formatDate(post.published_at)}</span>
									)}
								</div>
							</div>

							<ChevronRight
								size={16}
								className="mt-1 shrink-0 text-text-tertiary transition-colors group-hover:text-accent"
							/>
						</Link>
					))}
				</div>
			)}
		</main>
	);
}

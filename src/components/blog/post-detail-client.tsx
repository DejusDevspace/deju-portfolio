"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
	Calendar,
	Clock,
	ChevronLeft,
	ChevronRight,
	Layers,
} from "lucide-react";
import type { Post, SeriesResponse } from "@/types";
import { useSeriesDetail } from "@/hooks/use-api";
import MarkdownRenderer from "./markdown-renderer";
import PostToc from "./post-toc";
import PostComments from "./post-comments";

interface PostDetailClientProps {
	post: Post;
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
	// Fetch full series data if the post belongs to a series.
	const { data: seriesData } = useSeriesDetail(post.series?.slug || "", {
		enabled: !!post.series?.slug,
	});

	return (
		<div className="mx-auto w-full max-w-300 px-4 pb-24 pt-16 lg:px-8">
			{/* Breadcrumb */}
			<div className="mb-8 font-mono text-xs uppercase text-text-tertiary">
				<Link href="/blog" className="hover:text-accent transition-colors">
					Home
				</Link>
				<span className="mx-2">/</span>
				<Link href="/blog" className="hover:text-accent transition-colors">
					Blog
				</Link>
				<span className="mx-2">/</span>
				<span>{post.category?.name || "Uncategorized"}</span>
			</div>

			<div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
				{/* Left content area (max-width 720px) */}
				<main className="w-full lg:max-w-180 lg:mx-auto xl:ml-0 xl:mr-auto">
					{/* Post Hero */}
					<header className="mb-10">
						{/* Badge Row */}
						<div className="mb-4 flex flex-wrap gap-2">
							{post.category && (
								<span className="tag uppercase">{post.category.name}</span>
							)}
							{post.is_agent_authored && (
								<span className="badge-agent uppercase">✦ Agent</span>
							)}
							{post.series && (
								<span className="inline-flex items-center gap-1 rounded-md border border-accent-border bg-accent-muted px-2 py-0.5 font-mono text-[0.6rem] text-accent">
									<Layers size={9} />
									{post.series.series_order
										? `Part ${post.series.series_order}`
										: ""}{" "}
									of {post.series.title}
								</span>
							)}
						</div>

						{/* Title */}
						<h1 className="mb-6 font-display text-display font-bold leading-tight text-text-primary">
							{post.title}
						</h1>

						{/* Meta Row */}
						<div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-[0.65rem] uppercase text-text-secondary">
							{post.published_at && (
								<div className="flex items-center gap-1.5">
									<Calendar className="h-3.5 w-3.5" />
									<time dateTime={post.published_at}>
										{format(new Date(post.published_at), "MMM d, yyyy")}
									</time>
								</div>
							)}
							<span>·</span>
							<div className="flex items-center gap-1.5">
								<Clock className="h-3.5 w-3.5" />
								<span>{post.reading_time_mins || 5} min read</span>
							</div>
							{post.is_agent_authored && (
								<>
									<span>·</span>
									<span className="text-accent">Written by AI agent</span>
								</>
							)}
						</div>

						{/* Tags */}
						{post.tags && post.tags.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<span key={tag.id} className="tag text-[0.65rem]">
										#{tag.slug}
									</span>
								))}
							</div>
						)}

						<hr className="my-8 border-border-subtle" />
					</header>

					{/* Markdown Body */}
					<article>
						<MarkdownRenderer content={post.content} />
					</article>

					{/* Series Navigation */}
					{seriesData && (
						<SeriesNav series={seriesData} currentPostId={post.id} />
					)}

					{/* Comments Section */}
					<PostComments postId={post.id} postSlug={post.slug} />
				</main>

				{/* Right TOC Sidebar (sticky, width 260px) */}
				<PostToc content={post.content} />
			</div>
		</div>
	);
}

/* ============================================================================
  Series Navigation Component
============================================================================ */

interface SeriesNavProps {
	series: SeriesResponse;
	currentPostId: string;
}

function SeriesNav({ series, currentPostId }: SeriesNavProps) {
	// Only include published posts, sorted by series_order.
	const posts = series.posts
		.filter((p) => p.status === "published")
		.sort((a, b) => (a.series_order ?? 0) - (b.series_order ?? 0));

	const currentIndex = posts.findIndex((p) => p.id === currentPostId);
	const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
	const nextPost =
		currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

	if (posts.length <= 1) return null;

	return (
		<div className="mt-16 rounded-xl border border-border-subtle bg-bg-surface p-6">
			{/* Series Header */}
			<div className="mb-4 flex items-center gap-2">
				<Layers size={14} className="text-accent" />
				<h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
					Series
				</h3>
			</div>
			<Link
				href={`/series/${series.slug}`}
				className="mb-5 block font-display text-lg font-semibold text-text-primary transition-colors hover:text-accent"
			>
				{series.title}
			</Link>

			{/* Post List */}
			<ol className="mb-6 flex flex-col gap-1 border-l-2 border-border-subtle pl-4">
				{posts.map((p) => {
					const isCurrent = p.id === currentPostId;
					return (
						<li key={p.id}>
							{isCurrent ? (
								<span className="flex items-center gap-2 rounded px-2 py-1.5 font-mono text-xs font-bold text-accent bg-accent-muted border-l-2 border-accent -ml-4.5 pl-3.5">
									{p.series_order && (
										<span className="text-accent/60">{p.series_order}.</span>
									)}
									{p.title}
								</span>
							) : (
								<Link
									href={`/blog/posts/${p.slug}`}
									className="flex items-center gap-2 rounded px-2 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:text-text-primary hover:bg-bg-elevated"
								>
									{p.series_order && (
										<span className="text-text-tertiary">
											{p.series_order}.
										</span>
									)}
									{p.title}
								</Link>
							)}
						</li>
					);
				})}
			</ol>

			{/* Prev / Next */}
			<div className="flex items-stretch gap-3">
				{prevPost ? (
					<Link
						href={`/blog/posts/${prevPost.slug}`}
						className="flex flex-1 items-center gap-2 rounded-lg border border-border-subtle px-4 py-3 font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
					>
						<ChevronLeft size={14} className="shrink-0" />
						<div className="flex flex-col overflow-hidden">
							<span className="text-[0.6rem] uppercase text-text-tertiary">
								Previous
							</span>
							<span className="truncate font-medium">{prevPost.title}</span>
						</div>
					</Link>
				) : (
					<div className="flex-1" />
				)}
				{nextPost ? (
					<Link
						href={`/blog/posts/${nextPost.slug}`}
						className="flex flex-1 items-center justify-end gap-2 rounded-lg border border-border-subtle px-4 py-3 text-right font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent"
					>
						<div className="flex flex-col overflow-hidden">
							<span className="text-[0.6rem] uppercase text-text-tertiary">
								Next
							</span>
							<span className="truncate font-medium">{nextPost.title}</span>
						</div>
						<ChevronRight size={14} className="shrink-0" />
					</Link>
				) : (
					<div className="flex-1" />
				)}
			</div>
		</div>
	);
}

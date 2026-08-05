"use client";

import { useCallback } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { Clock, Layers } from "lucide-react";
import { queryKeys } from "@/hooks/use-api";
import { getPostBySlug } from "@/services/api";
import type { PostListItem } from "@/types";

interface PostCardProps {
	post: PostListItem;
}

export default function PostCard({ post }: PostCardProps) {
	const queryClient = useQueryClient();

	// Prefetch the full post on hover so the detail page loads instantly
	const prefetchPost = useCallback(() => {
		queryClient.prefetchQuery({
			queryKey: queryKeys.posts.detail(post.slug),
			queryFn: () => getPostBySlug(post.slug),
			staleTime: 10 * 60 * 1000, // 10 minutes — matches the usePost hook
		});
	}, [queryClient, post.slug]);

	return (
		<Link
			href={`/blog/posts/${post.slug}`}
			onMouseEnter={prefetchPost}
			onFocus={prefetchPost}
			className="group flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-default hover:shadow-lg"
		>
			{/* Top Row: Badges & Date */}
			<div className="flex items-start justify-between gap-4">
				<div className="flex flex-wrap items-center gap-2">
					{post.category && (
						<span className="tag uppercase">{post.category.name}</span>
					)}
					{post.is_agent_authored && (
						<span className="badge-agent uppercase tracking-wider">
							✦ AGENT
						</span>
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
				{post.published_at && (
					<time
						dateTime={post.published_at}
						className="shrink-0 font-mono text-[0.65rem] uppercase text-text-tertiary"
					>
						{format(new Date(post.published_at), "MMM d, yyyy")}
					</time>
				)}
			</div>

			{/* Title & Excerpt */}
			<div>
				<h2 className="mb-2 line-clamp-2 font-display text-h4 font-semibold text-text-primary transition-colors group-hover:text-accent">
					{post.title}
				</h2>
				<p className="line-clamp-3 font-body text-sm leading-relaxed text-text-secondary">
					{post.excerpt}
				</p>
			</div>

			{/* Divider */}
			<hr className="border-border-subtle" />

			{/* Bottom Row: Read Time & Tags */}
			<div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[0.65rem] uppercase text-text-tertiary">
				<div className="flex items-center gap-1.5">
					<Clock className="h-3.5 w-3.5" />
					<span>{post.reading_time_mins || 5} min read</span>
				</div>

				{post.tags && post.tags.length > 0 && (
					<div className="flex flex-wrap items-center gap-1.5">
						<span>#</span>
						{post.tags.slice(0, 3).map((tag, index) => (
							<span key={tag.id}>
								{tag.slug}
								{index < Math.min(post.tags!.length, 3) - 1 ? ", " : ""}
							</span>
						))}
						{post.tags.length > 3 && <span>, +{post.tags.length - 3}</span>}
					</div>
				)}
			</div>
		</Link>
	);
}

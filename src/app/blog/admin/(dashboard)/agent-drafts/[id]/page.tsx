"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
	useAdminPost,
	useAdminUpdatePost,
	useAdminDeletePost,
} from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import {
	ChevronLeft,
	Loader2,
	TrashIcon,
	CheckCircle2,
	Edit3,
} from "lucide-react";
import { useState } from "react";
import ConfirmModal from "@/components/ui/confirm-modal";

export default function AgentDraftReviewPage() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const toast = useToast();

	const { data: post, isLoading } = useAdminPost(params.id);
	const updatePost = useAdminUpdatePost();
	const deletePost = useAdminDeletePost();
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const handlePublish = async () => {
		try {
			await updatePost.mutateAsync({
				postId: params.id,
				payload: { status: "published" },
			});
			toast.success("Draft published");
			router.push("/blog/admin");
		} catch (err: any) {
			toast.error(err?.detail || "Failed to publish draft");
		}
	};

	const handleDelete = async () => {
		try {
			await deletePost.mutateAsync(params.id);
			toast.success("Draft deleted");
			router.push("/blog/admin/agent-drafts");
		} catch (err: any) {
			toast.error(err?.detail || "Failed to delete draft");
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col gap-8 max-w-(--breakpoint-lg) mx-auto w-full">
				<div className="skeleton h-6 w-40 rounded" />
				<div className="skeleton h-8 w-96 rounded" />
				<div className="skeleton h-64 w-full rounded-lg" />
			</div>
		);
	}

	if (!post) {
		return (
			<div className="flex flex-col gap-4 max-w-(--breakpoint-lg) mx-auto w-full">
				<Link
					href="/blog/admin/agent-drafts"
					className="inline-flex items-center gap-1 font-display text-body-sm text-accent hover:underline no-underline"
				>
					<ChevronLeft size={14} />
					Back to Agent Drafts
				</Link>
				<div className="rounded-lg border border-border-subtle bg-bg-surface p-10 text-center">
					<p className="m-0 font-display text-body-sm text-text-secondary">
						Draft not found.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-0 max-w-(--breakpoint-lg) mx-auto w-full p-6">
			{/* Back link */}
			<Link
				href="/admin/agent-drafts"
				className="inline-flex items-center gap-1 font-display text-body-sm text-accent hover:underline no-underline mb-6"
			>
				<ChevronLeft size={14} />
				Back to Agent Drafts
			</Link>

			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<h1 className="m-0 font-display text-h2 font-bold text-text-primary">
					Review Draft
				</h1>
				<span className="rounded-sm bg-accent-muted px-2 py-0.5 font-mono text-xs capitalize text-accent">
					draft
				</span>
			</div>

			{/* Meta bar */}
			<div className="flex items-center gap-4 flex-wrap mb-6">
				{post.category && (
					<span className="rounded-sm bg-bg-elevated px-2 py-0.5 font-mono text-xs text-text-secondary">
						{post.category.name}
					</span>
				)}
				{post.reading_time_mins && (
					<span className="font-mono text-xs text-text-tertiary">
						{post.reading_time_mins} min read
					</span>
				)}
				<span className="font-mono text-xs text-text-tertiary">
					Created {new Date(post.created_at).toLocaleDateString()}
				</span>
				{post.tags?.map((t) => (
					<span
						key={t.id}
						className="rounded-sm border border-border-subtle px-2 py-0.5 font-mono text-xs text-text-tertiary"
					>
						{t.name}
					</span>
				))}
			</div>

			{/* Content preview */}
			<div className="rounded-lg border border-border-subtle bg-bg-surface p-6 mb-6">
				<div className="prose prose-sm max-w-none dark:prose-invert">
					<pre className="m-0 whitespace-pre-wrap font-display text-body-sm text-text-primary leading-relaxed">
						{post.content}
					</pre>
				</div>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-3 pb-8">
				<button
					type="button"
					onClick={handlePublish}
					disabled={updatePost.isPending}
					className="btn-primary cursor-pointer inline-flex items-center gap-2"
				>
					{updatePost.isPending ? (
						<Loader2 size={16} className="animate-spin" />
					) : (
						<CheckCircle2 size={16} />
					)}
					<span>{updatePost.isPending ? "Publishing..." : "Publish"}</span>
				</button>
				<Link
					href={`/blog/admin/posts/${post.id}/edit`}
					className="btn-ghost inline-flex items-center gap-2 no-underline"
				>
					<Edit3 size={16} />
					Edit
				</Link>
				<button
					type="button"
					onClick={() => setShowDeleteConfirm(true)}
					disabled={deletePost.isPending}
					className="btn-ghost cursor-pointer inline-flex items-center gap-2 text-danger hover:bg-danger-muted"
				>
					{deletePost.isPending ? (
						<Loader2 size={16} className="animate-spin" />
					) : (
						<TrashIcon size={16} />
					)}
					<span>{deletePost.isPending ? "Deleting..." : "Delete"}</span>
				</button>
			</div>

			{showDeleteConfirm && (
				<ConfirmModal
					isOpen={showDeleteConfirm}
					onClose={() => setShowDeleteConfirm(false)}
					title="Delete draft?"
					message="This action cannot be undone. The draft will be permanently deleted."
					confirmText="Delete"
					variant="danger"
					onConfirm={handleDelete}
				/>
			)}
		</div>
	);
}

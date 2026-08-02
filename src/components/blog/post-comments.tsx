"use client";

import { useState } from "react";
import { usePostComments, useSubmitComment } from "@/hooks/use-api";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";

interface PostCommentsProps {
	postId: string;
	postSlug: string;
}

export default function PostComments({ postId, postSlug }: PostCommentsProps) {
	const { data: comments, isLoading, error } = usePostComments(postSlug);
	const submitComment = useSubmitComment();

	const [isAnonymous, setIsAnonymous] = useState(false);
	const [name, setName] = useState("");
	const [body, setBody] = useState("");
	const [honeypot, setHoneypot] = useState("");
	const [submitError, setSubmitError] = useState("");
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitError("");
		setSubmitSuccess(false);

		if (!body.trim()) {
			setSubmitError("Comment body is required.");
			return;
		}

		try {
			await submitComment.mutateAsync({
				post_id: postId,
				display_name: isAnonymous ? null : name.trim() || null,
				body: body.trim(),
				honeypot: honeypot || undefined,
			});
			setBody("");
			setName("");
			setIsAnonymous(false);
			setSubmitSuccess(true);
			setTimeout(() => setSubmitSuccess(false), 5000);
		} catch (err) {
			const errorMsg =
				err instanceof Error ? err.message : "Failed to post comment.";
			setSubmitError(errorMsg);
		}
	};

	return (
		<section className="mt-16 pt-8 border-t border-border-subtle">
			{/* Header */}
			<div className="mb-8 flex items-center gap-3">
				<MessageSquare className="h-6 w-6 text-accent" />
				<h2 className="font-display text-h3 font-semibold text-text-primary">
					Discussions
				</h2>
			</div>

			{/* Comment List */}
			<div className="mb-12 flex flex-col gap-6">
				{isLoading ? (
					<div className="space-y-4">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="flex gap-4 border-b border-border-subtle pb-6 last:border-0 last:pb-0"
							>
								<div className="skeleton h-8 w-8 rounded-full" />
								<div className="flex-1 space-y-2">
									<div className="skeleton h-4 w-1/4 rounded" />
									<div className="skeleton h-16 w-full rounded" />
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<p className="text-danger">Failed to load comments.</p>
				) : comments?.length === 0 ? (
					<div className="text-center py-8">
						<p className="text-text-tertiary">No comments yet</p>
						<p className="text-sm text-text-secondary">
							Be the first to leave one.
						</p>
					</div>
				) : (
					comments?.map((comment) => {
						const displayName = comment.display_name || "Anonymous";
						const initials = displayName.substring(0, 2).toUpperCase();

						return (
							<div
								key={comment.id}
								className="flex gap-4 border-b border-border-subtle pb-6 last:border-0 last:pb-0"
							>
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated font-mono text-sm font-medium text-text-secondary">
									{comment.display_name ? initials : "?"}
								</div>
								<div className="flex-1">
									<div className="mb-2 flex items-baseline gap-3">
										<span
											className={`font-medium ${!comment.display_name ? "italic text-text-tertiary" : "text-text-primary"}`}
										>
											{displayName}
										</span>
										<span className="font-mono text-[0.65rem] uppercase text-text-tertiary">
											{formatDistanceToNow(new Date(comment.created_at))} ago
										</span>
									</div>
									<p className="text-sm leading-relaxed text-text-secondary whitespace-pre-wrap">
										{comment.body}
									</p>
								</div>
							</div>
						);
					})
				)}
			</div>

			{/* Comment Form */}
			<div className="rounded-xl border border-border-subtle bg-bg-surface p-6 md:p-8">
				<p className="mb-6 font-body text-sm text-text-primary">
					Join the conversation
				</p>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex items-center justify-between gap-4">
						{!isAnonymous ? (
							<input
								type="text"
								placeholder="Your Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="input w-full md:max-w-xs"
								maxLength={50}
							/>
						) : (
							<div className="flex items-center px-3 py-2 bg-bg-subtle border border-border-default rounded-md opacity-50 w-full md:max-w-xs text-sm">
								Posting as Anonymous
							</div>
						)}
						<label className="flex items-center gap-2 font-mono text-xs uppercase text-text-secondary cursor-pointer shrink-0">
							<input
								type="checkbox"
								checked={isAnonymous}
								onChange={(e) => setIsAnonymous(e.target.checked)}
								className="accent-accent h-4 w-4 rounded bg-bg-subtle border-border-default"
							/>
							POST ANONYMOUSLY
						</label>
					</div>

					<textarea
						rows={4}
						placeholder="Share your thoughts on the architecture..."
						value={body}
						onChange={(e) => setBody(e.target.value)}
						className="input resize-y"
						required
					/>

					{/* Honeypot */}
					<input
						type="text"
						name="website"
						tabIndex={-1}
						aria-hidden="true"
						style={{ display: "none" }}
						value={honeypot}
						onChange={(e) => setHoneypot(e.target.value)}
					/>

					{submitError && <p className="text-sm text-danger">{submitError}</p>}
					{submitSuccess && (
						<p className="text-sm text-success">Comment posted!</p>
					)}

					<div className="mt-2">
						<button
							type="submit"
							disabled={submitComment.isPending}
							className="btn-primary cursor-pointer text-xs uppercase disabled:opacity-50"
						>
							{submitComment.isPending ? "Posting..." : "POST COMMENT"}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}

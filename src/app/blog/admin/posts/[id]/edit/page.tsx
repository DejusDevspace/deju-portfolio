"use client";

import { useParams, useRouter } from "next/navigation";
import PostEditorClient from "@/components/editor/post-editor-client";
import { useAdminPost, useAdminUpdatePost } from "@/hooks/use-api";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function EditPostPage() {
	const params = useParams();
	const router = useRouter();
	const postId = params.id as string;

	const { data: post, isLoading, error } = useAdminPost(postId);
	const updatePostMutation = useAdminUpdatePost();

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center bg-bg-page">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="flex h-screen flex-col items-center justify-center gap-4 bg-bg-page text-center">
				<h2 className="font-display text-2xl font-bold text-danger">
					Error Loading Post
				</h2>
				<p className="text-text-secondary">
					Could not find the requested post.
				</p>
				<button className="btn-ghost" onClick={() => router.push("/blog/admin")}>
					Back to Dashboard
				</button>
			</div>
		);
	}

	const handleSave = async (data: any) => {
		try {
			await updatePostMutation.mutateAsync({
				postId,
				payload: {
					title: data.title,
					content: data.content,
					slug: data.slug,
					category_id: data.category_id || undefined,
					tags: data.tag_names || [],
					series_id: data.series_id || null,
					series_order: data.series_order || null,
					status: data.status,
				},
			});
			// Optionally show a toast here.
		} catch (error) {
			console.error("Error updating post:", error);
			throw error;
		}
	};

	return (
		<PostEditorClient
			isNew={false}
			initialData={{
				title: post.title,
				content: post.content,
				slug: post.slug,
				category_id: post.category?.id || "",
				tag_names: post.tags?.map((t) => t.name) || [],
				series_id: post.series?.id || "",
				series_order: post.series?.series_order ?? null,
				status: post.status,
				is_agent_authored: post.is_agent_authored,
			}}
			onSave={handleSave}
			onPublish={handleSave}
		/>
	);
}

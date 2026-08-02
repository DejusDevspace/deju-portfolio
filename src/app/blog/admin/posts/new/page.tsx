"use client";

import { useRouter } from "next/navigation";
import PostEditorClient from "@/components/editor/post-editor-client";
import { useAdminCreatePost } from "@/hooks/use-api";

export default function NewPostPage() {
	const router = useRouter();
	const createPostMutation = useAdminCreatePost();

	const handleSave = async (data: any) => {
		try {
			const newPost = await createPostMutation.mutateAsync({
				title: data.title || "Untitled",
				content: data.content,
				category_id: data.category_id || undefined,
				series_id: data.series_id || null,
				series_order: data.series_order || null,
				tags: data.tag_names || [],
				status: data.status,
			});

			// On success, redirect to the edit page to avoid creating duplicates on subsequent saves
			router.push(`/blog/admin/posts/${newPost.id}/edit`);
		} catch (error) {
			console.error("Error creating post:", error);
			throw error;
		}
	};

	return (
		<PostEditorClient
			isNew={true}
			initialData={{}}
			onSave={handleSave}
			onPublish={handleSave}
		/>
	);
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
	useAdminPosts,
	useAdminCategories,
	useAdminDeletePost,
	useAdminStats,
} from "@/hooks/use-api";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
	Database,
	CheckCircle2,
	Edit3,
	Sparkles,
	Search,
	MoreVertical,
	ChevronLeft,
	ChevronRight,
	Plus,
	EyeIcon,
	TrashIcon,
	PenIcon,
} from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import { useToast } from "@/hooks/use-toast";
import ConfirmModal from "@/components/ui/confirm-modal";

export default function AdminDashboardPage() {
	const [page, setPage] = useState(1);
	const [statusFilter, setStatusFilter] = useState("All");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [postToDelete, setPostToDelete] = useState<{
		id: string;
		title: string;
	} | null>(null);

	const toast = useToast();
	const deletePostMutation = useAdminDeletePost();

	const { data: postsData, isLoading: isLoadingPosts } = useAdminPosts({
		page,
		limit: 10,
		...(statusFilter !== "All" && { status: statusFilter.toLowerCase() }),
	});

	const { data: categories } = useAdminCategories();

	const { data: stats } = useAdminStats();

	// Client-side filtering for search and category, as they aren't explicitly supported by the admin list endpoint yet.
	// TODO: Update backend `adminListPosts` to accept `search` and `category` query params for server-side filtering.
	const filteredItems = (postsData?.items || []).filter((post) => {
		const matchesSearch = post.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			categoryFilter === "All" || post.category.name === categoryFilter;
		return matchesSearch && matchesCategory;
	});

	const handleDelete = async () => {
		if (!postToDelete) return;

		try {
			await deletePostMutation.mutateAsync(postToDelete.id);
			toast.success(`Post "${postToDelete.title}" deleted`);
		} catch (error) {
			console.error("Delete failed", error);
			toast.error("Failed to delete post");
		} finally {
			setPostToDelete(null);
		}
	};

	return (
		<div className="flex flex-col gap-8 p-6 lg:p-10">
			{/* Stats Row */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{/* Card: Total Posts */}
				<div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-bg-surface p-5">
					<div className="flex h-10 w-10 items-center justify-center rounded-md border border-accent-border bg-accent-muted text-accent">
						<Database size={20} />
					</div>
					<div>
						<h3 className="m-0 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-text-tertiary">
							Total Posts
						</h3>
						<div className="font-display text-h2 font-bold text-text-primary">
							{stats?.total_posts ?? "—"}
						</div>
					</div>
				</div>

				{/* Card: Published */}
				<div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-bg-surface p-5">
					<div className="flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.1)] text-[#00ff88]">
						<CheckCircle2 size={20} />
					</div>
					<div>
						<h3 className="m-0 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-text-tertiary">
							Published
						</h3>
						<div className="font-display text-h2 font-bold text-text-primary">
							{stats?.published_posts ?? "—"}
						</div>
					</div>
				</div>

				{/* Card: Drafts */}
				<div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-bg-surface p-5">
					<div className="flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(255,204,0,0.2)] bg-[rgba(255,204,0,0.1)] text-[#ffcc00]">
						<Edit3 size={20} />
					</div>
					<div>
						<h3 className="m-0 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-text-tertiary">
							Drafts
						</h3>
						<div className="font-display text-h2 font-bold text-text-primary">
							{stats?.draft_posts ?? "—"}
						</div>
					</div>
				</div>

				{/* Card: Agent Pending */}
				<div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-bg-surface p-5">
					<div className="flex h-10 w-10 items-center justify-center rounded-md border border-accent-border bg-accent-muted text-accent [box-shadow:0_0_15px_rgba(0,229,255,0.2)]">
						<Sparkles size={20} />
					</div>
					<div>
						<h3 className="m-0 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-text-tertiary">
							Agent Pending
						</h3>
						<div className="font-display text-(length:(--text-h2) font-bold text-accent text-shadow-(--shadow-neon-accent)">
							{stats?.agent_pending_posts ?? "—"}
						</div>
					</div>
				</div>
			</div>

			{/* Posts Table Section */}
			<div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-bg-surface">
				{/* Section Header & Filters */}
				<div className="flex flex-col gap-4 border-b border-border-subtle p-5 md:flex-row md:items-center md:justify-between">
					<div className="flex items-center justify-between gap-4 md:justify-start">
						<h2 className="m-0 font-display text-(length:--text-h4) font-medium text-text-primary">
							All posts
						</h2>
						<Link
							href="/blog/admin/posts/new"
							className="flex items-center gap-2 rounded-md border border-accent-border bg-accent-muted px-3 py-1.5 font-mono text-xs font-medium text-accent transition-colors hover:bg-accent/20 hover:scale-105 hover:text-bg-base"
						>
							<Plus size={14} />
							<span>New Post</span>
						</Link>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						{/* Search Input */}
						<div className="relative flex items-center">
							<Search
								size={14}
								className="pointer-events-none absolute left-3 text-text-tertiary"
							/>
							<input
								type="text"
								placeholder="Filter posts..."
								className="w-full min-w-50 rounded-md border border-border-subtle bg-bg-elevated py-1.5 pl-8 pr-3 font-mono text-xs text-text-primary outline-none transition-colors focus:border-accent"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>

						{/* Status Filter */}
						<CustomSelect
							value={statusFilter}
							onChange={setStatusFilter}
							className="min-w-40"
							options={[
								{ value: "All", label: "Status: All" },
								{ value: "Published", label: "Published" },
								{ value: "Draft", label: "Draft" },
								{ value: "Agent_Draft", label: "Agent Draft" },
							]}
						/>

						{/* Category Filter */}
						<CustomSelect
							value={categoryFilter}
							onChange={setCategoryFilter}
							className="min-w-40"
							options={[
								{ value: "All", label: "Category: All" },
								...(categories?.map((cat) => ({
									value: cat.name,
									label: cat.name,
								})) || []),
							]}
						/>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full min-w-175 border-collapse text-left">
						<thead>
							<tr className="border-b border-border-subtle bg-bg-elevated/50 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-text-tertiary">
								<th className="p-4 pl-5">Title</th>
								<th className="p-4">Status</th>
								<th className="p-4">Category</th>
								<th className="p-4">Last Updated</th>
								<th className="p-4 pr-5 text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="font-mono text-xs text-text-secondary">
							{isLoadingPosts ? (
								<tr>
									<td colSpan={5} className="p-8 text-center">
										<LoadingSpinner size="md" />
									</td>
								</tr>
							) : filteredItems.length === 0 ? (
								<tr>
									<td colSpan={5} className="p-8 text-center">
										No posts found.
									</td>
								</tr>
							) : (
								filteredItems.map((post) => (
									<tr
										key={post.id}
										className="border-b border-border-subtle transition-colors hover:bg-bg-elevated/30"
									>
										<td className="p-4 pl-5">
											<div className="flex flex-col gap-1">
												<Link href={`/blog/posts/${post.slug}`}>
													<span className="font-medium text-text-primary transition-colors hover:text-accent cursor-pointer">
														{post.title}
													</span>
												</Link>
												<span className="text-[0.65rem] text-text-tertiary">
													slug: {post.slug}
												</span>
											</div>
										</td>
										<td className="p-4">
											{post.status === "published" ? (
												<span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.1)] px-2.5 py-0.5 text-[0.65rem] text-[#00ff88]">
													<span className="h-1 w-1 rounded-full bg-[#00ff88]" />
													Published
												</span>
											) : post.status === "agent_draft" ? (
												<span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-muted px-2.5 py-0.5 text-[0.65rem] text-accent">
													<Sparkles size={10} />
													Agent Draft
												</span>
											) : (
												<span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,204,0,0.3)] bg-[rgba(255,204,0,0.1)] px-2.5 py-0.5 text-[0.65rem] text-[#ffcc00]">
													Draft
												</span>
											)}
										</td>
										<td className="p-4">{post.category.name}</td>
										<td className="p-4">
											{new Date(post.updated_at).toISOString().split("T")[0]}
										</td>
										<td className="p-4 pr-5 text-right">
											{post.status === "agent_draft" ? (
												<Link
													href={`/admin/agent-drafts/${post.id}`}
													className="inline-block rounded-md border border-accent-border px-3 py-1 font-mono text-[0.65rem] font-bold text-accent hover:bg-accent-muted transition-colors"
												>
													REVIEW
												</Link>
											) : (
												<div className="flex items-center justify-end gap-2">
													<Link
														href={`/blog/posts/${post.slug}`}
														className="cursor-pointer border-none bg-transparent p-1 text-text-tertiary transition-colors hover:text-text-primary"
													>
														<EyeIcon size={16} aria-label="View" />
													</Link>
													<Link
														href={`/blog/admin/posts/${post.id}/edit`}
														className="cursor-pointer border-none bg-transparent p-1 text-text-tertiary transition-colors hover:text-accent-hover"
													>
														<PenIcon size={16} aria-label="Edit" />
													</Link>
													<button
														className="cursor-pointer border-none bg-transparent p-1 text-text-tertiary transition-colors hover:text-danger"
														onClick={() =>
															setPostToDelete({
																id: post.id,
																title: post.title,
															})
														}
													>
														<TrashIcon size={16} aria-label="Delete" />
													</button>
												</div>
											)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination Footer */}
				{!isLoadingPosts && (
					<div className="flex items-center justify-between border-t border-border-subtle p-4 font-mono text-xs text-text-tertiary">
						<span>
							Showing {filteredItems.length > 0 ? (page - 1) * 10 + 1 : 0}-
							{Math.min(page * 10, (postsData?.total ?? 0))} of{" "}
							{postsData?.total ?? 0} posts
						</span>
						<div className="flex items-center gap-1">
							<button
								className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-border-subtle bg-transparent text-text-secondary transition-colors hover:bg-bg-elevated disabled:cursor-not-allowed disabled:opacity-50"
								disabled={page === 1}
								onClick={() => setPage((p) => Math.max(1, p - 1))}
							>
								<ChevronLeft size={14} aria-label="Previous" />
							</button>
							<button className="flex h-7 w-7 items-center justify-center rounded-md border border-accent bg-accent-muted font-bold text-accent">
								{page}
							</button>
							<button
								className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-border-subtle bg-transparent text-text-secondary transition-colors hover:bg-bg-elevated disabled:cursor-not-allowed disabled:opacity-50"
								disabled={page >= (postsData?.pages || 1)}
								onClick={() => setPage((p) => p + 1)}
							>
								<ChevronRight size={14} aria-label="Next" />
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Deletion Confirmation Modal */}
			<ConfirmModal
				isOpen={!!postToDelete}
				onClose={() => setPostToDelete(null)}
				onConfirm={handleDelete}
				title="Delete Post"
				message={`Are you sure you want to delete "${postToDelete?.title}"? This action cannot be undone.`}
				confirmText="Delete"
				variant="danger"
			/>
		</div>
	);
}

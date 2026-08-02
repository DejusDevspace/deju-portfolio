"use client";

import { useState, useMemo, useEffect } from "react";
import {
	useAdminCategories,
	useTags,
	useAdminCreateCategory,
	useAdminUpdateCategory,
	useAdminDeleteCategory,
	useAdminCreateTag,
	useAdminUpdateTag,
	useAdminDeleteTag,
} from "@/hooks/use-api";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
	Plus,
	Edit3,
	TrashIcon,
	Tag as TagIcon,
	FolderOpen,
	Search,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import ConfirmModal from "@/components/ui/confirm-modal";
import { useToast } from "@/hooks/use-toast";

export default function TaxonomyPage() {
	const [activeTab, setActiveTab] = useState<"categories" | "tags">(
		"categories",
	);
	const toast = useToast();

	const { data: categories, isLoading: isLoadingCategories } =
		useAdminCategories();
	const { data: tags, isLoading: isLoadingTags } = useTags();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<{
		id?: string;
		name: string;
	} | null>(null);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 10;

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, activeTab]);

	const createCategory = useAdminCreateCategory();
	const updateCategory = useAdminUpdateCategory();
	const deleteCategory = useAdminDeleteCategory();

	const createTag = useAdminCreateTag();
	const updateTag = useAdminUpdateTag();
	const deleteTag = useAdminDeleteTag();

	const handleSave = async () => {
		if (!editingItem?.name.trim()) return;

		try {
			if (activeTab === "categories") {
				if (editingItem.id) {
					await updateCategory.mutateAsync({
						categoryId: editingItem.id,
						payload: { name: editingItem.name },
					});
					toast.success("Category updated successfully");
				} else {
					await createCategory.mutateAsync({ name: editingItem.name });
					toast.success("Category created successfully");
				}
			} else {
				if (editingItem.id) {
					await updateTag.mutateAsync({
						tagId: editingItem.id,
						payload: { name: editingItem.name },
					});
					toast.success("Tag updated successfully");
				} else {
					await createTag.mutateAsync({ name: editingItem.name });
					toast.success("Tag created successfully");
				}
			}
			setIsModalOpen(false);
		} catch (error: any) {
			toast.error(error.message || `Failed to save ${activeTab.slice(0, -1)}`);
		}
	};

	const handleDelete = async () => {
		if (!itemToDelete) return;

		try {
			if (activeTab === "categories") {
				await deleteCategory.mutateAsync(itemToDelete.id);
				toast.success("Category deleted successfully");
			} else {
				await deleteTag.mutateAsync(itemToDelete.id);
				toast.success("Tag deleted successfully");
			}
			setItemToDelete(null);
		} catch (error: any) {
			toast.error(
				error.message || `Failed to delete ${activeTab.slice(0, -1)}`,
			);
		}
	};

	const openCreateModal = () => {
		setEditingItem({ name: "" });
		setIsModalOpen(true);
	};

	const openEditModal = (item: { id: string; name: string }) => {
		setEditingItem(item);
		setIsModalOpen(true);
	};

	const renderTable = (type: "categories" | "tags") => {
		const isLoading =
			type === "categories" ? isLoadingCategories : isLoadingTags;
		const rawData = type === "categories" ? categories : tags;

		const filteredData = useMemo(() => {
			if (!rawData) return [];
			return rawData.filter(
				(item: any) =>
					item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.slug.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}, [rawData, searchQuery]);

		const totalPages = Math.max(
			1,
			Math.ceil(filteredData.length / ITEMS_PER_PAGE),
		);
		const paginatedData = filteredData.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			currentPage * ITEMS_PER_PAGE,
		);

		if (isLoading) {
			return (
				<div className="flex justify-center p-10">
					<LoadingSpinner size="md" />
				</div>
			);
		}

		if (!rawData || rawData.length === 0) {
			return (
				<div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border-subtle bg-bg-surface p-12 text-center">
					{type === "categories" ? (
						<FolderOpen size={32} className="text-text-tertiary" />
					) : (
						<TagIcon size={32} className="text-text-tertiary" />
					)}
					<div className="flex flex-col gap-1">
						<h3 className="font-display text-lg font-bold text-text-primary">
							No {type} found
						</h3>
						<p className="font-mono text-xs text-text-secondary">
							Create your first {type.slice(0, -1)} to start organizing content.
						</p>
					</div>
					<button onClick={openCreateModal} className="btn-primary mt-2">
						Create {type.slice(0, -1)}
					</button>
				</div>
			);
		}

		return (
			<div className="flex flex-col gap-4">
				<div className="relative w-full md:w-64">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-tertiary">
						<Search size={16} />
					</div>
					<input
						type="text"
						className="input w-full pl-9!"
						placeholder={`Search ${type}...`}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				{filteredData.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-surface p-8 text-center">
						<p className="font-mono text-xs text-text-secondary">
							No {type} match your search.
						</p>
					</div>
				) : (
					<div className="overflow-x-auto rounded-lg border border-border-subtle bg-bg-surface">
						<table className="w-full text-left font-mono text-sm">
							<thead>
								<tr className="border-b border-border-subtle bg-bg-elevated text-xs uppercase tracking-wider text-text-tertiary">
									<th className="px-6 py-4 font-semibold">Name</th>
									<th className="px-6 py-4 font-semibold">Slug</th>
									{type === "tags" && (
										<th className="px-6 py-4 font-semibold">Post Count</th>
									)}
									<th className="px-6 py-4 text-right font-semibold">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border-subtle">
								{paginatedData.map((item: any, i: number) => (
									<tr
										key={item.id}
										className={`transition-colors hover:bg-bg-elevated ${
											i % 2 === 0 ? "bg-bg-page/20" : ""
										}`}
									>
										<td className="px-6 py-4 font-body font-bold text-text-primary">
											{item.name}
										</td>
										<td className="px-6 py-4 text-text-secondary">
											{item.slug}
										</td>
										{type === "tags" && (
											<td className="px-6 py-4">
												<span className="inline-flex items-center rounded-sm bg-accent-muted px-2 py-0.5 text-xs font-bold text-accent">
													{item.post_count || 0}
												</span>
											</td>
										)}
										<td className="px-6 py-4 text-right">
											<div className="flex justify-end gap-2">
												<button
													onClick={() =>
														openEditModal({ id: item.id, name: item.name })
													}
													className="cursor-pointer border-none bg-transparent p-1 text-text-tertiary transition-colors hover:text-text-primary"
													aria-label="Edit"
												>
													<Edit3 size={16} />
												</button>
												<button
													onClick={() =>
														setItemToDelete({ id: item.id, name: item.name })
													}
													className="cursor-pointer border-none bg-transparent p-1 text-text-tertiary transition-colors hover:text-danger"
													aria-label="Delete"
												>
													<TrashIcon size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{filteredData.length > 0 && (
					<div className="flex items-center justify-between border-t border-border-subtle pt-4">
						<p className="font-mono text-xs text-text-secondary">
							Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
							{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of{" "}
							{filteredData.length} entries
						</p>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={currentPage === 1}
								className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-border-subtle bg-bg-surface text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
							>
								<ChevronLeft size={16} />
							</button>
							<span className="font-mono text-xs font-medium text-text-primary">
								Page {currentPage} of {totalPages}
							</span>
							<button
								onClick={() =>
									setCurrentPage((p) => Math.min(totalPages, p + 1))
								}
								disabled={currentPage === totalPages}
								className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-border-subtle bg-bg-surface text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
							>
								<ChevronRight size={16} />
							</button>
						</div>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-8 p-6 lg:p-10">
			<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<div className="flex flex-col gap-2">
					<h1 className="m-0 font-display text-h2 font-bold text-text-primary">
						Taxonomy
					</h1>
					<p className="font-mono text-xs text-text-secondary">
						Manage categories and tags used to organize your content.
					</p>
				</div>
				<button
					onClick={openCreateModal}
					className="btn-primary cursor-pointer flex items-center gap-2"
				>
					<Plus size={16} />
					<span>Create {activeTab}</span>
				</button>
			</div>

			{/* Tabs */}
			<div className="flex gap-2 border-b border-border-subtle pb-px">
				<button
					onClick={() => setActiveTab("categories")}
					className={`border-b-2 px-4 py-2 font-mono cursor-pointer text-sm font-semibold transition-colors ${
						activeTab === "categories"
							? "border-accent text-accent"
							: "border-transparent text-text-tertiary hover:text-text-primary"
					}`}
				>
					Categories
				</button>
				<button
					onClick={() => setActiveTab("tags")}
					className={`border-b-2 px-4 py-2 font-mono cursor-pointer text-sm font-semibold transition-colors ${
						activeTab === "tags"
							? "border-accent text-accent"
							: "border-transparent text-text-tertiary hover:text-text-primary"
					}`}
				>
					Tags
				</button>
			</div>

			{/* Content */}
			{renderTable(activeTab)}

			{/* Creation/Edit Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-110 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
						onClick={() => setIsModalOpen(false)}
					/>
					<div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border-subtle bg-bg-surface p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
						<h3 className="mb-6 font-display text-lg font-bold text-text-primary">
							{editingItem?.id ? "Edit" : "Create"}{" "}
							{activeTab === "categories" ? "Category" : "Tag"}
						</h3>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<label className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
									Name
								</label>
								<input
									type="text"
									className="input w-full"
									value={editingItem?.name || ""}
									onChange={(e) =>
										setEditingItem((prev) =>
											prev
												? { ...prev, name: e.target.value }
												: { name: e.target.value },
										)
									}
									placeholder={`e.g. ${activeTab === "categories" ? "Engineering" : "nextjs"}`}
									autoFocus
								/>
							</div>
							<div className="mt-4 flex items-center justify-end gap-3">
								<button
									onClick={() => setIsModalOpen(false)}
									className="btn-ghost cursor-pointer"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className="btn-primary cursor-pointer flex items-center gap-2"
									disabled={
										!editingItem?.name.trim() ||
										createCategory.isPending ||
										updateCategory.isPending ||
										createTag.isPending ||
										updateTag.isPending
									}
								>
									{createCategory.isPending ||
									updateCategory.isPending ||
									createTag.isPending ||
									updateTag.isPending
										? "Saving..."
										: "Save"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Delete Confirmation */}
			<ConfirmModal
				isOpen={!!itemToDelete}
				onClose={() => setItemToDelete(null)}
				onConfirm={handleDelete}
				title={`Delete ${activeTab === "categories" ? "Category" : "Tag"}`}
				message={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
				confirmText="Delete"
				variant="danger"
			/>
		</div>
	);
}

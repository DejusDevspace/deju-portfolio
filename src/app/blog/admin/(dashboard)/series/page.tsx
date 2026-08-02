"use client";

import { useState, useMemo, useEffect } from "react";
import {
	useAdminSeries,
	useAdminCreateSeries,
	useAdminUpdateSeries,
	useAdminDeleteSeries,
} from "@/hooks/use-api";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
	Plus,
	Edit3,
	TrashIcon,
	Layers,
	Search,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import ConfirmModal from "@/components/ui/confirm-modal";
import { useToast } from "@/hooks/use-toast";

export default function SeriesPage() {
	const toast = useToast();
	const { data: seriesList, isLoading } = useAdminSeries();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<{
		id?: string;
		title: string;
		description: string;
	} | null>(null);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		title: string;
	} | null>(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 10;

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const filteredData = useMemo(() => {
		if (!seriesList) return [];
		return seriesList.filter(
			(item: any) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(item.description &&
					item.description.toLowerCase().includes(searchQuery.toLowerCase())),
		);
	}, [seriesList, searchQuery]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredData.length / ITEMS_PER_PAGE),
	);
	const paginatedData = filteredData.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const createSeries = useAdminCreateSeries();
	const updateSeries = useAdminUpdateSeries();
	const deleteSeries = useAdminDeleteSeries();

	const handleSave = async () => {
		if (!editingItem?.title.trim()) return;

		try {
			if (editingItem.id) {
				await updateSeries.mutateAsync({
					seriesId: editingItem.id,
					payload: {
						title: editingItem.title,
						description: editingItem.description || null,
					},
				});
				toast.success("Series updated successfully");
			} else {
				await createSeries.mutateAsync({
					title: editingItem.title,
					description: editingItem.description || null,
				});
				toast.success("Series created successfully");
			}
			setIsModalOpen(false);
		} catch (error: any) {
			toast.error(error.message || "Failed to save series");
		}
	};

	const handleDelete = async () => {
		if (!itemToDelete) return;

		try {
			await deleteSeries.mutateAsync(itemToDelete.id);
			toast.success("Series deleted successfully");
			setItemToDelete(null);
		} catch (error: any) {
			toast.error(error.message || "Failed to delete series");
		}
	};

	const openCreateModal = () => {
		setEditingItem({ title: "", description: "" });
		setIsModalOpen(true);
	};

	const openEditModal = (item: {
		id: string;
		title: string;
		description: string;
	}) => {
		setEditingItem(item);
		setIsModalOpen(true);
	};

	return (
		<div className="flex flex-col gap-8 p-6 lg:p-10">
			<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<div className="flex flex-col gap-2">
					<h1 className="m-0 font-display text-h2 font-bold text-text-primary">
						Series
					</h1>
					<p className="font-mono text-xs text-text-secondary">
						Manage post series to group related content together.
					</p>
				</div>
				<button
					onClick={openCreateModal}
					className="btn-primary cursor-pointer flex items-center gap-2"
				>
					<Plus size={16} />
					<span>Create series</span>
				</button>
			</div>

			{isLoading ? (
				<div className="flex justify-center p-10">
					<LoadingSpinner size="md" />
				</div>
			) : !seriesList || seriesList.length === 0 ? (
				<div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border-subtle bg-bg-surface p-12 text-center">
					<Layers size={32} className="text-text-tertiary" />
					<div className="flex flex-col gap-1">
						<h3 className="font-display text-lg font-bold text-text-primary">
							No series found
						</h3>
						<p className="font-mono text-xs text-text-secondary">
							Create your first series to start grouping related posts.
						</p>
					</div>
					<button
						onClick={openCreateModal}
						className="btn-primary mt-2 cursor-pointer"
					>
						Create series
					</button>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					<div className="relative w-full md:w-64">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-tertiary">
							<Search size={16} />
						</div>
						<input
							type="text"
							className="input w-full pl-9!"
							placeholder="Search series..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{filteredData.length === 0 ? (
						<div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-surface p-8 text-center">
							<p className="font-mono text-xs text-text-secondary">
								No series match your search.
							</p>
						</div>
					) : (
						<div className="overflow-x-auto rounded-lg border border-border-subtle bg-bg-surface">
							<table className="w-full text-left font-mono text-sm">
								<thead>
									<tr className="border-b border-border-subtle bg-bg-elevated text-xs uppercase tracking-wider text-text-tertiary">
										<th className="px-6 py-4 font-semibold">Title</th>
										<th className="px-6 py-4 font-semibold hidden md:table-cell">
											Description
										</th>
										<th className="px-6 py-4 font-semibold">Posts</th>
										<th className="px-6 py-4 text-right font-semibold">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border-subtle">
									{paginatedData.map((series, i) => (
										<tr
											key={series.id}
											className={`transition-colors hover:bg-bg-elevated ${
												i % 2 === 0 ? "bg-bg-page/20" : ""
											}`}
										>
											<td className="px-6 py-4 font-body font-bold text-text-primary">
												{series.title}
											</td>
											<td className="px-6 py-4 text-text-secondary hidden md:table-cell">
												<div className="max-w-xs truncate">
													{series.description || "—"}
												</div>
											</td>
											<td className="px-6 py-4">
												<span className="inline-flex items-center rounded-sm bg-accent-muted px-2 py-0.5 text-xs font-bold text-accent">
													{series.post_count || 0}
												</span>
											</td>
											<td className="px-6 py-4 text-right">
												<div className="flex justify-end gap-2">
													<button
														onClick={() =>
															openEditModal({
																id: series.id,
																title: series.title,
																description: series.description || "",
															})
														}
														className="cursor-pointer border-none bg-transparent p-1 text-text-tertiary transition-colors hover:text-text-primary"
														aria-label="Edit"
													>
														<Edit3 size={16} />
													</button>
													<button
														onClick={() =>
															setItemToDelete({
																id: series.id,
																title: series.title,
															})
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
			)}

			{/* Creation/Edit Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-110 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
						onClick={() => setIsModalOpen(false)}
					/>
					<div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border-subtle bg-bg-surface p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
						<h3 className="mb-6 font-display text-lg font-bold text-text-primary">
							{editingItem?.id ? "Edit" : "Create"} Series
						</h3>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<label className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
									Title
								</label>
								<input
									type="text"
									className="input w-full"
									value={editingItem?.title || ""}
									onChange={(e) =>
										setEditingItem((prev) =>
											prev
												? { ...prev, title: e.target.value }
												: { title: e.target.value, description: "" },
										)
									}
									placeholder="e.g. Building an AI Agent"
									autoFocus
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
									Description (Optional)
								</label>
								<textarea
									className="input w-full resize-none min-h-100px"
									value={editingItem?.description || ""}
									onChange={(e) =>
										setEditingItem((prev) =>
											prev
												? { ...prev, description: e.target.value }
												: { title: "", description: e.target.value },
										)
									}
									placeholder="A brief overview of what this series covers..."
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
										!editingItem?.title.trim() ||
										createSeries.isPending ||
										updateSeries.isPending
									}
								>
									{createSeries.isPending || updateSeries.isPending
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
				title="Delete Series"
				message={`Are you sure you want to delete "${itemToDelete?.title}"? Posts inside this series will NOT be deleted, but they will be removed from the series.`}
				confirmText="Delete"
				variant="danger"
			/>
		</div>
	);
}

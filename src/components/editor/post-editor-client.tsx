"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
	ChevronLeft,
	Loader2,
	Check,
	Circle,
	SlidersHorizontal,
	Eye,
	Plus,
	X,
	Sparkles,
	Layers,
} from "lucide-react";
import {
	useAdminCategories,
	useAdminSeries,
	useAdminCreateSeries,
} from "@/hooks/use-api";
import type { PostStatus } from "@/types";
import TagSelector from "./tag-selector";
import CustomSelect from "@/components/ui/custom-select";
import { useToast } from "@/hooks/use-toast";
import ConfirmModal from "@/components/ui/confirm-modal";

// Dynamically import BlockNote to avoid SSR issues
const BlockNoteEditor = dynamic(() => import("./blocknote-editor"), {
	ssr: false,
	loading: () => (
		<div className="flex h-64 items-center justify-center">
			<span className="font-mono text-sm text-text-tertiary animate-pulse">
				Loading Editor...
			</span>
		</div>
	),
});

interface EditorData {
	title: string;
	content: string;
	slug: string;
	category_id: string;
	tag_names: string[]; // Simplification: we'll handle tag IDs at the API boundary
	series_id: string;
	series_order: number | null;
	status: PostStatus;
}

interface PostEditorClientProps {
	initialData: Partial<EditorData> & { is_agent_authored?: boolean };
	isNew?: boolean;
	onSave: (data: EditorData) => Promise<void>;
	onPublish?: (data: EditorData) => Promise<void>;
}

export default function PostEditorClient({
	initialData,
	isNew = false,
	onSave,
	onPublish,
}: PostEditorClientProps) {
	const [data, setData] = useState<EditorData>({
		title: initialData.title || "",
		content: initialData.content || "",
		slug: initialData.slug || "",
		category_id: initialData.category_id || "",
		tag_names: initialData.tag_names || [],
		series_id: initialData.series_id || "",
		series_order: initialData.series_order ?? null,
		status: initialData.status || "draft",
	});

	const [isSaving, setIsSaving] = useState(false);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile
	const [showPublishModal, setShowPublishModal] = useState(false);
	const [showNewSeries, setShowNewSeries] = useState(false);
	const [newSeriesTitle, setNewSeriesTitle] = useState("");

	const toast = useToast();

	const { data: categories } = useAdminCategories();
	const { data: seriesList } = useAdminSeries();
	const createSeriesMutation = useAdminCreateSeries();

	// Auto-slugify title if new and slug hasn't been manually touched much
	useEffect(() => {
		if (isNew && data.title && !hasUnsavedChanges) {
			const autoSlug = data.title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)+/g, "");
			setData((prev) => ({ ...prev, slug: autoSlug }));
		}
	}, [data.title, isNew, hasUnsavedChanges]);

	// Auto-save to localStorage
	useEffect(() => {
		const DRAFT_KEY = isNew
			? "draft-new"
			: `draft-${initialData.slug || "edit"}`;

		// Load draft on mount
		if (!hasUnsavedChanges && typeof window !== "undefined") {
			const savedDraft = localStorage.getItem(DRAFT_KEY);
			if (savedDraft) {
				try {
					const parsed = JSON.parse(savedDraft);
					if (
						window.confirm(
							`You have unsaved local changes from ${new Date(parsed.timestamp).toLocaleString()}. Restore them?`,
						)
					) {
						setData(parsed.data);
						setHasUnsavedChanges(true);
					} else {
						localStorage.removeItem(DRAFT_KEY);
					}
				} catch (e) {
					console.error("Failed to parse local draft", e);
				}
			}
		}

		// Interval to save draft every 30 seconds
		const interval = setInterval(() => {
			if (hasUnsavedChanges) {
				localStorage.setItem(
					DRAFT_KEY,
					JSON.stringify({ data, timestamp: Date.now() }),
				);
			}
		}, 30000);

		return () => clearInterval(interval);
	}, [hasUnsavedChanges, data, isNew, initialData.slug]);

	const handleChange = (field: keyof EditorData, value: any) => {
		setData((prev) => ({ ...prev, [field]: value }));
		setHasUnsavedChanges(true);
	};

	const handleRemoveTag = (tagToRemove: string) => {
		handleChange(
			"tag_names",
			data.tag_names.filter((t) => t !== tagToRemove),
		);
	};

	const handleCreateSeries = async () => {
		if (!newSeriesTitle.trim()) return;
		try {
			const created = await createSeriesMutation.mutateAsync({
				title: newSeriesTitle.trim(),
				status: "draft",
			});
			handleChange("series_id", created.id);
			setNewSeriesTitle("");
			setShowNewSeries(false);
		} catch (error) {
			console.error("Failed to create series", error);
		}
	};

	const handleSaveDraft = async () => {
		setIsSaving(true);
		try {
			await onSave({ ...data, status: "draft" });
			setHasUnsavedChanges(false);
			const DRAFT_KEY = isNew
				? "draft-new"
				: `draft-${initialData.slug || "edit"}`;
			localStorage.removeItem(DRAFT_KEY);
			toast.success("Draft saved successfully");
		} catch (error) {
			console.error("Save failed", error);
			toast.error("Failed to save draft.");
		} finally {
			setIsSaving(false);
		}
	};

	const handlePublish = () => {
		setShowPublishModal(true);
	};

	const confirmPublish = async () => {
		setIsSaving(true);
		try {
			if (onPublish) {
				await onPublish({ ...data, status: "published" });
			} else {
				await onSave({ ...data, status: "published" });
			}
			setHasUnsavedChanges(false);
			const DRAFT_KEY = isNew
				? "draft-new"
				: `draft-${initialData.slug || "edit"}`;
			localStorage.removeItem(DRAFT_KEY);
			toast.success(
				data.status === "published"
					? "Post updated successfully"
					: "Post published successfully!",
			);
		} catch (error) {
			console.error("Publish failed", error);
			toast.error("Failed to publish post.");
		} finally {
			setIsSaving(false);
		}
	};

	// Auto-calculate word count and reading time
	const wordCount = useMemo(() => {
		return data.content.trim() ? data.content.trim().split(/\s+/).length : 0;
	}, [data.content]);

	const readTime = Math.ceil(wordCount / 200) || 1;

	return (
		<div className="flex h-[calc(100vh-var(--admin-topbar))] flex-col bg-bg-page">
			{/* TOP BAR */}
			<header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border-subtle bg-bg-surface px-4 lg:px-6">
				<div className="flex items-center gap-4">
					<Link
						href="/blog/admin"
						className="text-text-tertiary transition-colors hover:text-text-primary"
					>
						<ChevronLeft size={20} />
					</Link>
					<div className="hidden font-mono text-sm text-text-secondary sm:block">
						Posts /{" "}
						<span className="text-text-primary">
							Editing: {data.title || "Untitled"}
						</span>
					</div>
				</div>

				<div className="flex items-center gap-4">
					{/* Auto-save Status */}
					<div className="hidden items-center gap-2 font-mono text-xs sm:flex">
						{isSaving ? (
							<>
								<Loader2
									size={12}
									className="animate-spin text-text-tertiary"
								/>
								<span className="text-text-tertiary">Saving...</span>
							</>
						) : hasUnsavedChanges ? (
							<>
								<div className="h-2 w-2 rounded-full bg-warning"></div>
								<span className="text-warning">Unsaved changes</span>
							</>
						) : (
							<>
								<Check size={12} className="text-success" />
								<span className="text-success">Saved</span>
							</>
						)}
					</div>

					<button
						className="btn-ghost cursor-pointer flex items-center lg:hidden"
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						<SlidersHorizontal size={16} />
					</button>

					<button
						className="btn-ghost cursor-pointer"
						onClick={handleSaveDraft}
						disabled={isSaving}
					>
						Save draft
					</button>
					<button
						className="btn-primary cursor-pointer"
						onClick={handlePublish}
						disabled={isSaving}
					>
						{data.status === "published" ? "Update" : "Publish"}
					</button>
				</div>
			</header>

			{/* MAIN LAYOUT */}
			<div className="relative flex flex-1 overflow-hidden">
				{/* EDITOR COLUMN */}
				<div className="flex-1 overflow-y-auto px-4 py-10 lg:px-20">
					<div className="mx-auto max-w-(--content-max)">
						{/* Post Title Input */}
						<input
							type="text"
							className="mb-8 w-full border-none bg-transparent font-display text-4xl font-bold text-text-primary outline-none placeholder:text-text-tertiary sm:text-5xl"
							placeholder="Post title..."
							value={data.title}
							onChange={(e) => handleChange("title", e.target.value)}
						/>

						{/* BlockNote */}
						<div className="min-h-125">
							<BlockNoteEditor
								initialMarkdown={initialData.content}
								onChange={(markdown) => handleChange("content", markdown)}
							/>
						</div>
					</div>
				</div>

				{/* SIDEBAR (Settings Panel) */}
				<aside
					className={`absolute right-0 top-0 z-20 h-full w-70 shrink-0 border-l border-border-subtle bg-bg-surface p-5 transition-transform duration-300 lg:relative lg:translate-x-0 ${
						sidebarOpen
							? "translate-x-0 shadow-lg"
							: "translate-x-full shadow-none"
					}`}
				>
					<div className="flex h-full flex-col gap-8 overflow-y-auto pb-10 hide-scrollbar">
						{/* Agent Banner */}
						{initialData.is_agent_authored && (
							<div className="flex flex-col gap-1 rounded-md border border-accent-border bg-accent-muted p-4 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
								<div className="flex items-center gap-2 font-mono text-xs font-bold text-accent">
									<Sparkles size={12} />
									WRITTEN BY AI AGENT
								</div>
								<div className="font-mono text-[0.65rem] text-text-secondary">
									Model: Gemini Flash v1.5
								</div>
							</div>
						)}

						{/* Status */}
						<div className="flex flex-col gap-2">
							<label className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
								Status
							</label>
							<div className="flex items-center">
								{data.status === "published" ? (
									<span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.1)] px-3 py-1 font-mono text-xs text-[#00ff88]">
										<div className="h-1.5 w-1.5 rounded-full bg-[#00ff88]"></div>
										Published
									</span>
								) : data.status === "agent_draft" ? (
									<span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-muted px-3 py-1 font-mono text-xs text-accent">
										<div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
										Agent Draft
									</span>
								) : (
									<span className="inline-flex items-center gap-1.5 rounded-full border border-border-default bg-bg-subtle px-3 py-1 font-mono text-xs text-text-secondary">
										<div className="h-1.5 w-1.5 rounded-full bg-text-tertiary"></div>
										Draft
									</span>
								)}
							</div>
						</div>

						{/* Category */}
						<div className="flex flex-col gap-2">
							<label className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
								Category
							</label>
							<CustomSelect
								placeholder="Select category..."
								value={data.category_id}
								onChange={(val) => handleChange("category_id", val)}
								options={
									categories?.map((cat) => ({
										value: cat.id,
										label: cat.name,
									})) || []
								}
							/>
						</div>

						{/* Series */}
						<div className="flex flex-col gap-2">
							<label className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
								<span className="flex items-center gap-1.5">
									<Layers size={10} />
									Series
								</span>
							</label>
							<CustomSelect
								placeholder="No series"
								value={data.series_id || ""}
								onChange={(val) => {
									handleChange("series_id", val || null);
									if (!val) handleChange("series_order", null);
								}}
								options={[
									{ value: "", label: "No series" },
									...(seriesList?.map((s) => ({
										value: s.id,
										label: `${s.title} (${s.post_count} posts)`,
									})) || []),
								]}
							/>

							{/* Series order — only shown when a series is selected */}
							{data.series_id && (
								<div className="flex items-center gap-2">
									<label className="font-mono text-[0.65rem] text-text-tertiary whitespace-nowrap">
										Position
									</label>
									<input
										type="number"
										className="input h-8 w-20 font-mono text-sm text-center"
										placeholder="#"
										min={1}
										value={data.series_order ?? ""}
										onChange={(e) =>
											handleChange(
												"series_order",
												e.target.value ? parseInt(e.target.value, 10) : null,
											)
										}
									/>
								</div>
							)}

							{/* Create new series inline */}
							{!showNewSeries ? (
								<button
									type="button"
									onClick={() => setShowNewSeries(true)}
									className="flex items-center gap-1.5 font-mono text-[0.65rem] text-text-tertiary transition-colors hover:text-accent"
								>
									<Plus size={10} />
									Create new series
								</button>
							) : (
								<div className="flex flex-col gap-2 rounded-md border border-border-subtle bg-bg-elevated p-3">
									<input
										type="text"
										className="input h-8 text-sm"
										placeholder="Series title..."
										value={newSeriesTitle}
										onChange={(e) => setNewSeriesTitle(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												handleCreateSeries();
											}
										}}
										autoFocus
									/>
									<div className="flex gap-2">
										<button
											type="button"
											className="btn-primary h-7 flex-1 text-[0.65rem]"
											onClick={handleCreateSeries}
											disabled={
												!newSeriesTitle.trim() || createSeriesMutation.isPending
											}
										>
											{createSeriesMutation.isPending ? (
												<Loader2 size={10} className="animate-spin" />
											) : (
												"Create"
											)}
										</button>
										<button
											type="button"
											className="btn-ghost h-7 flex-1 text-[0.65rem]"
											onClick={() => {
												setShowNewSeries(false);
												setNewSeriesTitle("");
											}}
										>
											Cancel
										</button>
									</div>
								</div>
							)}
						</div>

						{/* Tags */}
						<TagSelector
							selectedTags={data.tag_names}
							onAddTag={(tag) => {
								if (!data.tag_names.includes(tag)) {
									handleChange("tag_names", [...data.tag_names, tag]);
								}
							}}
							onRemoveTag={handleRemoveTag}
						/>

						{/* Slug */}
						<div className="flex flex-col gap-2">
							<label className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
								Post Slug
							</label>
							<input
								type="text"
								className="input font-mono text-sm"
								value={data.slug}
								onChange={(e) => handleChange("slug", e.target.value)}
							/>
							<div className="font-mono text-[0.65rem] text-text-tertiary">
								https://dejusdevspace.vercel.app/blog/posts/{data.slug || "..."}
							</div>
						</div>

						<hr className="my-2 border-border-subtle" />

						{/* Bottom Stats & Actions */}
						<div className="mt-auto flex flex-col gap-6">
							<div className="flex items-center justify-between font-mono text-xs">
								<div className="flex flex-col gap-1">
									<span className="text-text-tertiary">Word Count</span>
									<span className="font-bold text-text-primary">
										{wordCount.toLocaleString()}
									</span>
								</div>
								<div className="flex flex-col gap-1 text-right">
									<span className="text-text-tertiary">Read Time</span>
									<span className="font-bold text-text-primary">
										{readTime} min
									</span>
								</div>
							</div>

							<button className="flex w-full items-center justify-center gap-2 rounded-md border border-border-default bg-transparent py-2.5 font-mono text-xs font-bold text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary">
								<Eye size={16} />
								Preview Post
							</button>
						</div>
					</div>
				</aside>

				{/* Mobile Overlay */}
				{sidebarOpen && (
					<div
						className="absolute inset-0 z-10 bg-black/50 lg:hidden"
						onClick={() => setSidebarOpen(false)}
					/>
				)}
			</div>
			{/* Confirmation Modals */}
			<ConfirmModal
				isOpen={showPublishModal}
				onClose={() => setShowPublishModal(false)}
				onConfirm={confirmPublish}
				title={data.status === "published" ? "Update Post" : "Publish Post"}
				message={
					data.status === "published"
						? "Are you sure you want to update this post? The changes will be live immediately."
						: "Are you sure you want to publish this post? It will be visible to the public immediately."
				}
				confirmText={data.status === "published" ? "Update" : "Publish"}
			/>
		</div>
	);
}

"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, Check, Plus, Tag as TagIcon } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useTags } from "@/hooks/use-api";

interface TagSelectorProps {
	selectedTags: string[];
	onAddTag: (tag: string) => void;
	onRemoveTag: (tag: string) => void;
}

export default function TagSelector({
	selectedTags,
	onAddTag,
	onRemoveTag,
}: TagSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const { data: allTags, isLoading } = useTags();

	const filteredTags = useMemo(() => {
		if (!allTags) return [];
		const normalizedQuery = query.toLowerCase().trim();

		// Filter out tags already selected
		const availableTags = allTags.filter(
			(tag) => !selectedTags.includes(tag.name),
		);

		if (!normalizedQuery) return availableTags.slice(0, 10);

		return availableTags.filter((tag) =>
			tag.name.toLowerCase().includes(normalizedQuery),
		);
	}, [allTags, query, selectedTags]);

	const showCreateOption = useMemo(() => {
		const normalizedQuery = query.trim();
		if (!normalizedQuery) return false;

		const existsInSelected = selectedTags.some(
			(t) => t.toLowerCase() === normalizedQuery.toLowerCase(),
		);
		const existsInAll = allTags?.some(
			(t) => t.name.toLowerCase() === normalizedQuery.toLowerCase(),
		);

		return !existsInSelected && !existsInAll;
	}, [query, selectedTags, allTags]);

	const totalOptions = filteredTags.length + (showCreateOption ? 1 : 0);

	useEffect(() => {
		setHighlightedIndex(0);
	}, [query]);

	// Handle click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelectTag = (tagName: string) => {
		onAddTag(tagName);
		setQuery("");
		setIsOpen(false);
		inputRef.current?.focus();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setIsOpen(true);
			setHighlightedIndex((prev) => (prev + 1) % totalOptions);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setIsOpen(true);
			setHighlightedIndex((prev) => (prev - 1 + totalOptions) % totalOptions);
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (!isOpen) {
				setIsOpen(true);
				return;
			}

			if (highlightedIndex < filteredTags.length) {
				handleSelectTag(filteredTags[highlightedIndex].name);
			} else if (showCreateOption) {
				handleSelectTag(query.trim());
			}
		} else if (e.key === "Escape") {
			setIsOpen(false);
		}
	};

	return (
		<div className="flex flex-col gap-3" ref={containerRef}>
			<label className="font-mono text-xs font-bold uppercase tracking-widest text-text-tertiary">
				Tags
			</label>

			{/* Selected Tags Pills */}
			{selectedTags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{selectedTags.map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center gap-1.5 rounded-md bg-accent-muted border border-accent-border px-2 py-1 font-mono text-xs text-accent transition-all hover:border-accent"
						>
							<TagIcon size={10} />
							{tag}
							<button
								onClick={() => onRemoveTag(tag)}
								className="ml-0.5 text-accent/60 hover:text-danger transition-colors"
							>
								<X size={12} />
							</button>
						</span>
					))}
				</div>
			)}

			{/* Search Input Container */}
			<div className="relative">
				<div className="group relative">
					<div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent transition-colors">
						{isLoading ? (
							<LoadingSpinner size="sm" inline />
						) : (
							<Search size={14} />
						)}
					</div>
					<input
						ref={inputRef}
						type="text"
						className="input pl-10! h-10 w-full font-mono text-sm"
						placeholder={
							selectedTags.length === 0
								? "Search or create tags..."
								: "Add another tag..."
						}
						value={query}
						onFocus={() => setIsOpen(true)}
						onChange={(e) => {
							setQuery(e.target.value);
							setIsOpen(true);
						}}
						onKeyDown={handleKeyDown}
					/>
				</div>

				{/* Dropdown Menu */}
				{isOpen && (totalOptions > 0 || isLoading) && (
					<div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-lg border border-border-default bg-bg-surface p-1 shadow-xl shadow-black/50 animate-in fade-in zoom-in duration-200">
						{isLoading ? (
							<div className="flex items-center justify-center p-4 text-text-tertiary font-mono text-xs">
								<LoadingSpinner size="sm" inline />
								Loading tags...
							</div>
						) : (
							<>
								{filteredTags.map((tag, index) => (
									<button
										key={tag.id}
										onClick={() => handleSelectTag(tag.name)}
										onMouseEnter={() => setHighlightedIndex(index)}
										className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors ${
											highlightedIndex === index
												? "bg-accent-muted text-accent"
												: "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
										}`}
									>
										<div className="flex items-center gap-2">
											<TagIcon
												size={12}
												className={
													highlightedIndex === index
														? "text-accent"
														: "text-text-tertiary"
												}
											/>
											<span className="font-mono text-xs">{tag.name}</span>
										</div>
										{selectedTags.includes(tag.name) && (
											<Check size={12} className="text-accent" />
										)}
									</button>
								))}

								{showCreateOption && (
									<button
										onClick={() => handleSelectTag(query.trim())}
										onMouseEnter={() =>
											setHighlightedIndex(filteredTags.length)
										}
										className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ${
											highlightedIndex === filteredTags.length
												? "bg-accent-muted text-accent"
												: "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
										}`}
									>
										<Plus size={12} className="text-accent" />
										<div className="flex flex-col">
											<span className="font-mono text-xs font-bold">
												Create "{query.trim()}"
											</span>
											<span className="text-[10px] opacity-60">New tag</span>
										</div>
									</button>
								)}

								{totalOptions === 0 && query && !showCreateOption && (
									<div className="p-3 text-center text-text-tertiary font-mono text-xs italic">
										No matches found
									</div>
								)}
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAdminContext, useAdminUpdateContext } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";

const MAX_BIO = 800;
const MAX_LEARNING = 500;
const MAX_LIFESTYLE = 600;
const MAX_INTERESTS = 30;

function SkeletonBlock({ rows }: { rows: number }) {
	return (
		<div className="flex flex-col gap-2">
			<div className="skeleton h-5 w-32 rounded" />
			<div className="skeleton h-4 w-3/4 rounded" />
			<div
				className="skeleton mt-1 w-full rounded"
				style={{ height: `${rows * 1.5 + 1.5}rem` }}
			/>
		</div>
	);
}

export default function ContextFormClient() {
	const { data, isLoading } = useAdminContext();
	const updateContext = useAdminUpdateContext();
	const toast = useToast();

	const [bio, setBio] = useState("");
	const [interests, setInterests] = useState<string[]>([]);
	const [learningFocus, setLearningFocus] = useState("");
	const [lifestyleContext, setLifestyleContext] = useState("");
	const [interestInput, setInterestInput] = useState("");

	const [originalData, setOriginalData] = useState<typeof data | null>(null);
	const interestsInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (data && data !== originalData) {
			setBio(data.bio ?? "");
			setInterests(data.interests ?? []);
			setLearningFocus(data.learning_focus ?? "");
			setLifestyleContext(data.lifestyle_context ?? "");
			setOriginalData(data);
		}
	}, [data, originalData]);

	const isDirty =
		data &&
		(bio !== (data.bio ?? "") ||
			interests.join(",") !== (data.interests ?? []).join(",") ||
			learningFocus !== (data.learning_focus ?? "") ||
			lifestyleContext !== (data.lifestyle_context ?? ""));

	const addInterest = useCallback(
		(value: string) => {
			const trimmed = value.trim();
			if (!trimmed) return;
			if (interests.length >= MAX_INTERESTS) return;
			if (interests.includes(trimmed)) return;
			setInterests((prev) => [...prev, trimmed]);
		},
		[interests],
	);

	const removeInterest = useCallback((index: number) => {
		setInterests((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addInterest(interestInput);
			setInterestInput("");
		}
	};

	const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.endsWith(",")) {
			addInterest(value.slice(0, -1));
			setInterestInput("");
		} else {
			setInterestInput(value);
		}
	};

	const handleSave = async () => {
		try {
			await updateContext.mutateAsync({
				bio: bio || null,
				interests,
				learning_focus: learningFocus || null,
				lifestyle_context: lifestyleContext || null,
			});
			toast.success("Context saved successfully");
		} catch (err: any) {
			toast.error(err?.detail || "Failed to save context. Try again.");
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col gap-8 max-w-(--breakpoint-md) mx-auto w-full">
				<div className="flex flex-col gap-2">
					<div className="skeleton h-8 w-48 rounded" />
					<div className="skeleton h-4 w-96 rounded" />
				</div>
				<SkeletonBlock rows={6} />
				<SkeletonBlock rows={3} />
				<SkeletonBlock rows={4} />
				<SkeletonBlock rows={5} />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-0 max-w-(--breakpoint-md) mx-auto w-full">
			<div className="flex flex-col gap-2 mb-8">
				<h1 className="m-0 font-display text-h2 font-bold text-text-primary">
					My Context
				</h1>
				<p className="m-0 font-display text-body-sm text-text-secondary">
					This is what the AI agent knows about you. Keep it current for better
					drafts.
				</p>
			</div>

			{/* Bio */}
			<section className="py-8 border-b border-border-subtle">
				<h2 className="m-0 font-display text-h4 font-semibold text-text-primary">
					About me
				</h2>
				<p className="mt-1 mb-3 font-display text-body-sm text-text-secondary">
					A short description of who you are, what you do, and what you
					currently work on. The agent uses this to contextualise post
					introductions and tailor the content to your background.
				</p>
				<textarea
					className="input w-full resize-y min-h-32"
					rows={6}
					maxLength={MAX_BIO}
					value={bio}
					onChange={(e) => setBio(e.target.value)}
					placeholder="e.g. I'm a mid-level AI Software Engineer based in Abuja. I build full-stack AI systems, enjoy working across the agent, backend, and frontend stacks, and I'm currently focused on multi-agent architectures and RAG systems."
				/>
				<p className="text-right font-mono text-xs text-text-tertiary mt-1">
					{bio.length} / {MAX_BIO}
				</p>
			</section>

			{/* Interests */}
			<section className="py-8 border-b border-border-subtle">
				<h2 className="m-0 font-display text-h4 font-semibold text-text-primary">
					Interests &amp; topics
				</h2>
				<p className="mt-1 mb-3 font-display text-body-sm text-text-secondary">
					Topics you want the agent to write about. These feed directly into
					topic selection on each agent run. Be specific, the more specific the
					topic, the more focused the draft.
				</p>
				<div className="flex flex-wrap items-center gap-2 p-3 border border-border-subtle rounded-lg bg-bg-surface min-h-10">
					{interests.map((interest, i) => (
						<span
							key={i}
							className="inline-flex items-center gap-1 rounded-sm bg-accent-muted px-2 py-0.5 font-mono text-xs text-accent"
						>
							{interest}
							<button
								type="button"
								onClick={() => removeInterest(i)}
								className="cursor-pointer border-none bg-transparent p-0 text-accent hover:text-danger transition-colors"
								aria-label={`Remove ${interest}`}
							>
								<X size={12} />
							</button>
						</span>
					))}
					<input
						ref={interestsInputRef}
						type="text"
						className="flex-1 min-w-30 border-none bg-transparent p-0 font-mono text-xs text-text-primary outline-none placeholder:text-text-tertiary"
						placeholder={
							interests.length >= MAX_INTERESTS
								? "Max 30 topics"
								: "Add a topic..."
						}
						value={interestInput}
						onChange={handleInterestChange}
						onKeyDown={handleInterestKeyDown}
						disabled={interests.length >= MAX_INTERESTS}
					/>
				</div>
				<p className="text-right font-mono text-xs text-text-tertiary mt-1">
					{interests.length} / {MAX_INTERESTS}
				</p>
			</section>

			{/* Learning Focus */}
			<section className="py-8 border-b border-border-subtle">
				<h2 className="m-0 font-display text-h4 font-semibold text-text-primary">
					What I'm currently learning
				</h2>
				<p className="mt-1 mb-3 font-display text-body-sm text-text-secondary">
					Technologies, concepts, or skills you're actively studying or
					exploring right now. The agent prioritises these for post topics.
					Writing about what you're learning produces more authentic content.
				</p>
				<textarea
					className="input w-full resize-y min-h-24"
					rows={4}
					maxLength={MAX_LEARNING}
					value={learningFocus}
					onChange={(e) => setLearningFocus(e.target.value)}
					placeholder="e.g. I'm currently going deep on LangGraph for stateful multi-agent systems, learning Rust for performance-critical side projects, and exploring how knowledge graphs can augment RAG pipelines."
				/>
				<p className="text-right font-mono text-xs text-text-tertiary mt-1">
					{learningFocus.length} / {MAX_LEARNING}
				</p>
			</section>

			{/* Lifestyle */}
			<section className="py-8 border-b border-border-subtle">
				<h2 className="m-0 font-display text-h4 font-semibold text-text-primary">
					Lifestyle &amp; personal context
				</h2>
				<p className="mt-1 mb-3 font-display text-body-sm text-text-secondary">
					Anything personal that gives the agent cultural or lifestyle context.
					For example, your background, where you're from, things you care about
					beyond tech. This is what makes the writing feel like it's from a
					person, not a bot.
				</p>
				<textarea
					className="input w-full resize-y min-h-28"
					rows={5}
					maxLength={MAX_LIFESTYLE}
					value={lifestyleContext}
					onChange={(e) => setLifestyleContext(e.target.value)}
					placeholder="e.g. Nigerian software engineer. Grew up in Lagos, currently based in Abuja. Music lover — Afrobeats and alternative R&B. Fitness-focused. I prefer directness over corporate speak and I have a dry sense of humour."
				/>
				<p className="text-right font-mono text-xs text-text-tertiary mt-1">
					{lifestyleContext.length} / {MAX_LIFESTYLE}
				</p>
			</section>

			{/* Save */}
			<div className="flex items-center gap-4 py-8">
				<button
					onClick={handleSave}
					className="btn-primary cursor-pointer flex items-center gap-2 min-w-40"
					disabled={!isDirty || updateContext.isPending}
				>
					{updateContext.isPending ? (
						<Loader2 size={16} className="animate-spin" />
					) : null}
					<span>{updateContext.isPending ? "Saving..." : "Save changes"}</span>
				</button>
			</div>
		</div>
	);
}

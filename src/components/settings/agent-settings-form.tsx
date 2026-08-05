"use client";

import { useState, useEffect } from "react";
import {
	useAdminAgentSchedule,
	useAdminUpdateAgentSchedule,
	useAdminAgentRuns,
	useAdminTriggerAgent,
} from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Play } from "lucide-react";

const SCHEDULE_PRESETS = [
	{ label: "Daily", sublabel: "Every day", cron: "0 9 * * *" },
	{ label: "Weekly", sublabel: "Once a week (Monday)", cron: "0 9 * * 1" },
	{
		label: "Bi-weekly",
		sublabel: "Twice a week (Mon & Thu)",
		cron: "0 9 * * 1,4",
	},
	{ label: "Custom", sublabel: "Set cron expression", cron: "" },
] as const;

function detectPreset(cron: string): number {
	const idx = SCHEDULE_PRESETS.findIndex(
		(p) => p.cron === cron && p.label !== "Custom",
	);
	return idx >= 0 ? idx : 3;
}

function cronToHuman(cron: string): string {
	if (!cron.trim()) return "";
	const parts = cron.trim().split(/\s+/);
	if (parts.length !== 5) return "";

	const [, hour, , , dayOfWeek] = parts;
	const h = parseInt(hour, 10);
	const hourStr = `${h.toString().padStart(2, "0")}:00`;

	if (dayOfWeek === "*") return `Every day at ${hourStr}`;
	if (dayOfWeek === "1") return `Every Monday at ${hourStr}`;
	if (dayOfWeek === "1,4") return `Every Monday and Thursday at ${hourStr}`;
	return `Cron: ${cron}`;
}

function formatRelative(iso: string | null): string {
	if (!iso) return "—";
	const diff = Date.now() - new Date(iso).getTime();
	const mins = Math.floor(diff / 60000);
	if (mins < 1) return "Just now";
	if (mins < 60) return `${mins}m ago`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	if (days < 30) return `${days}d ago`;
	return new Date(iso).toLocaleDateString();
}

function formatDuration(start: string, end: string | null): string {
	if (!end) return "—";
	const ms = new Date(end).getTime() - new Date(start).getTime();
	const secs = Math.floor(ms / 1000);
	if (secs < 60) return `${secs}s`;
	const m = Math.floor(secs / 60);
	const s = secs % 60;
	return `${m}m ${s}s`;
}

export default function AgentSettingsForm() {
	const toast = useToast();

	const { data: schedule, isLoading: scheduleLoading } =
		useAdminAgentSchedule();
	const updateSchedule = useAdminUpdateAgentSchedule();
	const triggerAgent = useAdminTriggerAgent();
	const { data: runsData } = useAdminAgentRuns({ limit: 1 });

	const [presetIndex, setPresetIndex] = useState(1);
	const [customCron, setCustomCron] = useState("0 9 * * 1");
	const [isActive, setIsActive] = useState(true);
	const [isDirty, setIsDirty] = useState(false);

	const lastRun = runsData?.items?.[0] ?? null;

	useEffect(() => {
		if (schedule) {
			const idx = detectPreset(schedule.cron_expr);
			setPresetIndex(idx);
			setCustomCron(schedule.cron_expr);
			setIsActive(schedule.is_active);
			setIsDirty(false);
		}
	}, [schedule]);

	const effectiveCron = SCHEDULE_PRESETS[presetIndex].cron || customCron;
	const humanReadable = cronToHuman(effectiveCron);

	const handlePresetSelect = (idx: number) => {
		setPresetIndex(idx);
		setIsDirty(true);
	};

	const handleCustomChange = (value: string) => {
		setCustomCron(value);
		setPresetIndex(3);
		setIsDirty(true);
	};

	const handleToggleActive = () => {
		setIsActive((prev) => {
			setIsDirty(true);
			return !prev;
		});
	};

	const handleSave = async () => {
		try {
			await updateSchedule.mutateAsync({
				cron_expr: effectiveCron,
				is_active: isActive,
			});
			setIsDirty(false);
			toast.success("Agent settings saved");
		} catch (err: any) {
			toast.error(err?.detail || "Failed to save settings");
		}
	};

	const handleTrigger = async () => {
		try {
			const result = await triggerAgent.mutateAsync();
			toast.success(`Pipeline started (${result.run_id.slice(0, 8)}...)`);
		} catch (err: any) {
			toast.error(err?.detail || "Failed to trigger agent run");
		}
	};

	if (scheduleLoading) {
		return (
			<div className="flex flex-col gap-8 max-w-(--breakpoint-md) mx-auto w-full">
				<div className="flex flex-col gap-2">
					<div className="skeleton h-8 w-48 rounded" />
					<div className="skeleton h-4 w-96 rounded" />
				</div>
				<div className="flex flex-col gap-2">
					<div className="skeleton h-5 w-40 rounded" />
					<div className="skeleton h-4 w-64 rounded" />
					<div className="skeleton mt-4 h-24 rounded-lg" />
				</div>
				<div className="flex flex-col gap-2">
					<div className="skeleton h-5 w-32 rounded" />
					<div className="skeleton h-4 w-56 rounded" />
					<div className="skeleton mt-4 h-12 w-40 rounded" />
				</div>
				<div className="flex flex-col gap-2">
					<div className="skeleton h-5 w-36 rounded" />
					<div className="skeleton mt-4 h-40 rounded-lg" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-0 max-w-(--breakpoint-md) mx-auto w-full">
			{/* Header */}
			<div className="flex flex-col gap-2 mb-8">
				<h1 className="m-0 font-display text-h2 font-bold text-text-primary">
					Agent Settings
				</h1>
				<p className="m-0 font-display text-body-sm text-text-secondary">
					Control when and how the AI agent generates post drafts.
				</p>
			</div>

			{/* Schedule section */}
			<section className="py-8 border-b border-border-subtle">
				<h2 className="m-0 font-display text-h4 font-semibold text-text-primary">
					Generation schedule
				</h2>
				<p className="mt-1 mb-4 font-display text-body-sm text-text-secondary">
					How often the agent should automatically run and generate a new draft.
					Drafts are always saved for your review. Nothing publishes
					automatically.
				</p>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
					{SCHEDULE_PRESETS.map((preset, i) => (
						<button
							key={preset.label}
							type="button"
							onClick={() => handlePresetSelect(i)}
							className={`cursor-pointer rounded-lg border p-4 text-left transition-colors ${
								presetIndex === i
									? "border-accent bg-accent-muted"
									: "border-border-default bg-bg-surface hover:border-text-tertiary"
							}`}
						>
							<p className="m-0 font-display text-body-sm font-semibold text-text-primary">
								{preset.label}
							</p>
							<p className="m-0 font-display text-xs text-text-secondary mt-0.5">
								{preset.sublabel}
							</p>
						</button>
					))}
				</div>

				{presetIndex === 3 && (
					<div className="mt-4">
						<label className="block font-display text-body-sm font-medium text-text-primary mb-1">
							Cron expression
						</label>
						<input
							type="text"
							className="input w-full max-w-64 font-mono"
							placeholder="0 9 * * 1"
							value={customCron}
							onChange={(e) => handleCustomChange(e.target.value)}
						/>
					</div>
				)}

				{humanReadable && (
					<p className="mt-2 font-display text-body-sm text-accent">
						{humanReadable}
					</p>
				)}

				<div className="mt-6 flex items-center justify-between">
					<div>
						<p className="m-0 font-display text-body-sm font-medium text-text-primary">
							Schedule active
						</p>
						{!isActive && (
							<p className="m-0 font-display text-xs text-text-secondary mt-0.5">
								The agent will not run automatically while the schedule is
								paused.
							</p>
						)}
					</div>
					<button
						type="button"
						role="switch"
						aria-checked={isActive}
						onClick={handleToggleActive}
						className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full border-none transition-colors ${
							isActive ? "bg-success" : "bg-border-default"
						}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								isActive ? "translate-x-6" : "translate-x-1"
							}`}
						/>
					</button>
				</div>
			</section>

			{/* Manual trigger section */}
			<section className="py-8 border-b border-border-subtle">
				<h2 className="m-0 font-display text-h4 font-semibold text-text-primary">
					Run now
				</h2>
				<p className="mt-1 mb-4 font-display text-body-sm text-text-secondary">
					Trigger a single agent run immediately. The agent will pick a topic
					from your context, research it, and save a draft for your review.
				</p>

				{lastRun && (
					<div className="mb-4 flex items-center gap-3">
						<span className="font-mono text-xs text-text-secondary">
							Last run: {formatRelative(lastRun.started_at)}
						</span>
						<span
							className={`inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs ${
								lastRun.status === "completed"
									? "bg-success-muted text-success"
									: lastRun.status === "failed"
										? "bg-danger-muted text-danger"
										: "bg-accent-muted text-accent"
							}`}
						>
							{lastRun.status}
						</span>
					</div>
				)}

				<button
					type="button"
					onClick={handleTrigger}
					disabled={triggerAgent.isPending}
					className="btn-primary cursor-pointer inline-flex items-center gap-2"
				>
					{triggerAgent.isPending ? (
						<Loader2 size={16} className="animate-spin" />
					) : (
						<Play size={16} />
					)}
					<span>
						{triggerAgent.isPending ? "Starting..." : "Run agent now"}
					</span>
				</button>
			</section>

			{/* Last run summary */}
			<section className="py-8 border-b border-border-subtle">
				<h2 className="m-0 font-display text-h4 font-semibold text-text-primary mb-4">
					Last agent run
				</h2>

				{lastRun ? (
					<div className="rounded-lg border border-border-subtle bg-bg-surface p-5">
						<div className="grid grid-cols-2 gap-x-6 gap-y-3">
							{[
								["Status", lastRun.status],
								["Topic", lastRun.topic ?? "—"],
								["Triggered by", lastRun.triggered_by],
								["Started", new Date(lastRun.started_at).toLocaleString()],
								[
									"Completed",
									lastRun.completed_at
										? new Date(lastRun.completed_at).toLocaleString()
										: "—",
								],
								[
									"Duration",
									formatDuration(lastRun.started_at, lastRun.completed_at),
								],
							].map(([label, value]) => (
								<div key={label}>
									<p className="m-0 font-mono text-xs uppercase text-text-tertiary">
										{label}
									</p>
									<p className="m-0 font-display text-body-sm text-text-primary mt-0.5">
										{label === "Status" ? (
											<span
												className={`inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs ${
													value === "completed"
														? "bg-success-muted text-success"
														: value === "failed"
															? "bg-danger-muted text-danger"
															: "bg-accent-muted text-accent"
												}`}
											>
												{value}
											</span>
										) : (
											value
										)}
									</p>
								</div>
							))}
							<div>
								<p className="m-0 font-mono text-xs uppercase text-text-tertiary">
									Output
								</p>
								<p className="m-0 font-display text-body-sm mt-0.5">
									{lastRun.output_post_id ? (
										<a
											href={`/blog/admin/agent-drafts`}
											className="text-accent hover:underline"
										>
											View draft &rarr;
										</a>
									) : (
										"—"
									)}
								</p>
							</div>
						</div>
						<div className="mt-4 pt-4 border-t border-border-subtle">
							<a
								href="/blog/admin/agent/runs"
								className="font-display text-body-sm text-accent hover:underline"
							>
								View full run history &rarr;
							</a>
						</div>
					</div>
				) : (
					<div className="rounded-lg border border-border-subtle bg-bg-surface p-5 text-center">
						<p className="m-0 font-display text-body-sm text-text-secondary">
							No runs yet. Trigger your first run above.
						</p>
					</div>
				)}
			</section>

			{/* Save */}
			<div className="flex items-center gap-4 py-8">
				<button
					onClick={handleSave}
					className="btn-primary cursor-pointer flex items-center gap-2 min-w-40"
					disabled={!isDirty || updateSchedule.isPending}
				>
					{updateSchedule.isPending ? (
						<Loader2 size={16} className="animate-spin" />
					) : null}
					<span>
						{updateSchedule.isPending ? "Saving..." : "Save settings"}
					</span>
				</button>
			</div>
		</div>
	);
}

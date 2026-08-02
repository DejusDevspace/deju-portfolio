"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useAdminAgentRuns } from "@/hooks/use-api";
import { Loader2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

function formatRelative(iso: string | null): string {
	if (!iso) return "—";
	const diff = Date.now() - new Date(iso).getTime();
	const mins = Math.floor(diff / 60000);
	if (mins < 1) return "Just now";
	if (mins < 60) return `${mins}m ago`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `${days}d ago`;
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

function StatusBadge({ status }: { status: string }) {
	const colors: Record<string, string> = {
		running: "bg-accent-muted text-accent",
		completed: "bg-success-muted text-success",
		failed: "bg-danger-muted text-danger",
	};
	return (
		<span
			className={`inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs capitalize ${
				colors[status] ?? "bg-bg-elevated text-text-secondary"
			}`}
		>
			{status === "running" && (
				<Loader2 size={10} className="mr-1 animate-spin" />
			)}
			{status}
		</span>
	);
}

export default function AgentRunLogPage() {
	const [page, setPage] = useState(1);
	const limit = 20;

	const { data, isLoading } = useAdminAgentRuns({ page, limit });

	const totalPages = data?.pages ?? 1;

	const hasPrev = page > 1;
	const hasNext = page < totalPages;

	const handlePrev = useCallback(() => {
		setPage((p) => Math.max(1, p - 1));
	}, []);

	const handleNext = useCallback(() => {
		setPage((p) => Math.min(totalPages, p + 1));
	}, [totalPages]);

	const runItems = data?.items ?? [];
	const noRuns = !isLoading && runItems.length === 0;

	return (
		<div className="flex flex-col gap-0 max-w-(--breakpoint-lg) mx-auto w-full p-6">
			{/* Header */}
			<div className="flex flex-col gap-2 mb-8">
				<h1 className="m-0 font-display text-h2 font-bold text-text-primary">
					Run Log
				</h1>
				<p className="m-0 font-display text-body-sm text-text-secondary">
					History of all agent pipeline runs.
				</p>
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="flex flex-col gap-3">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="skeleton h-12 w-full rounded-lg" />
					))}
				</div>
			) : noRuns ? (
				<div className="rounded-lg border border-border-subtle bg-bg-surface p-10 text-center">
					<p className="m-0 font-display text-body-sm text-text-secondary">
						No runs yet. Trigger a run from{" "}
						<Link
							href="/blog/admin/settings/agent"
							className="text-accent hover:underline"
						>
							Agent Settings
						</Link>
						.
					</p>
				</div>
			) : (
				<>
					<div className="overflow-x-auto rounded-lg border border-border-subtle">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-border-subtle bg-bg-elevated">
									{[
										"Status",
										"Topic",
										"Trigger",
										"Started",
										"Duration",
										"",
									].map((h) => (
										<th
											key={h}
											className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-tertiary"
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{runItems.map((run) => (
									<tr
										key={run.id}
										className="border-b border-border-subtle last:border-b-0 transition-colors hover:bg-bg-elevated/50"
									>
										<td className="px-4 py-3">
											<StatusBadge status={run.status} />
										</td>
										<td className="max-w-64 truncate px-4 py-3 font-display text-body-sm text-text-primary">
											{run.topic ?? (
												<span className="italic text-text-tertiary">—</span>
											)}
										</td>
										<td className="px-4 py-3 font-mono text-xs capitalize text-text-secondary">
											{run.triggered_by}
										</td>
										<td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-text-secondary">
											{formatRelative(run.started_at)}
										</td>
										<td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-text-secondary">
											{formatDuration(run.started_at, run.completed_at)}
										</td>
										<td className="px-4 py-3 text-right">
											<Link
												href={`/admin/agent/runs/${run.id}`}
												className="inline-flex items-center gap-1 font-display text-body-sm text-accent hover:underline no-underline"
											>
												Details
												<ExternalLink size={12} />
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-between mt-4">
							<p className="m-0 font-mono text-xs text-text-secondary">
								Page {page} of {totalPages}
							</p>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={handlePrev}
									disabled={!hasPrev}
									className="btn-ghost cursor-pointer inline-flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
								>
									<ChevronLeft size={14} />
									Previous
								</button>
								<button
									type="button"
									onClick={handleNext}
									disabled={!hasNext}
									className="btn-ghost cursor-pointer inline-flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
								>
									Next
									<ChevronRight size={14} />
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

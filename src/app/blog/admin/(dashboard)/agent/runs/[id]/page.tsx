"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useAdminAgentRun } from "@/hooks/use-api";
import { ChevronLeft, ExternalLink, Loader2 } from "lucide-react";

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

function InfoRow({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div>
			<p className="m-0 font-mono text-xs uppercase tracking-wider text-text-tertiary">
				{label}
			</p>
			<p className="m-0 font-display text-body-sm text-text-primary mt-0.5">
				{children}
			</p>
		</div>
	);
}

export default function AgentRunDetailPage() {
	const params = useParams<{ id: string }>();
	const { data: run, isLoading } = useAdminAgentRun(params.id);

	if (isLoading) {
		return (
			<div className="flex flex-col gap-8 max-w-(--breakpoint-md) mx-auto w-full p-6">
				<div className="skeleton h-6 w-40 rounded" />
				<div className="skeleton h-8 w-64 rounded" />
				<div className="skeleton h-48 w-full rounded-lg" />
				<div className="skeleton h-32 w-full rounded-lg" />
			</div>
		);
	}

	if (!run) {
		return (
			<div className="flex flex-col gap-4 max-w-(--breakpoint-md) mx-auto w-full py-12">
				<Link
					href="/blog/admin/agent/runs"
					className="inline-flex items-center gap-1 font-display text-body-sm text-accent hover:underline no-underline"
				>
					<ChevronLeft size={14} />
					Back to Run Log
				</Link>
				<div className="rounded-lg border border-border-subtle bg-bg-surface p-10 text-center">
					<p className="m-0 font-display text-body-sm text-text-secondary">
						Run not found.
					</p>
				</div>
			</div>
		);
	}

	const runLog = run.run_log as Record<string, unknown> | null;
	const traceUrl = runLog?.langfuse_trace_url as string | undefined;
	const errorMsg = runLog?.error as string | undefined;

	return (
		<div className="flex flex-col gap-0 max-w-(--breakpoint-md) mx-auto w-full p-6">
			{/* Back link */}
			<Link
				href="/admin/agent/runs"
				className="inline-flex items-center gap-1 font-display text-body-sm text-accent hover:underline no-underline mb-6"
			>
				<ChevronLeft size={14} />
				Back to Run Log
			</Link>

			{/* Header row */}
			<div className="flex items-center justify-between mb-8">
				<h1 className="m-0 font-display text-h2 font-bold text-text-primary">
					Run Details
				</h1>
				<StatusBadge status={run.status} />
			</div>

			{/* Metadata card */}
			<div className="rounded-lg border border-border-subtle bg-bg-surface p-5 mb-6">
				<div className="grid grid-cols-2 gap-x-6 gap-y-3">
					<InfoRow label="Run ID">
						<span className="font-mono text-xs">{run.id}</span>
					</InfoRow>
					<InfoRow label="Status">
						<StatusBadge status={run.status} />
					</InfoRow>
					<InfoRow label="Topic">{run.topic ?? "—"}</InfoRow>
					<InfoRow label="Model">{run.model_used ?? "—"}</InfoRow>
					<InfoRow label="Trigger">{run.triggered_by}</InfoRow>
					<InfoRow label="Started">
						{new Date(run.started_at).toLocaleString()}
					</InfoRow>
					<InfoRow label="Completed">
						{run.completed_at
							? new Date(run.completed_at).toLocaleString()
							: "—"}
					</InfoRow>
					<InfoRow label="Duration">
						{formatDuration(run.started_at, run.completed_at)}
					</InfoRow>
				</div>
			</div>

			{/* Error section */}
			{run.status === "failed" && errorMsg && (
				<div className="rounded-lg border border-danger-border bg-danger-muted p-4 mb-6">
					<p className="m-0 font-mono text-xs font-semibold uppercase tracking-wider text-danger">
						Error
					</p>
					<p className="m-0 font-mono text-xs text-danger mt-1 whitespace-pre-wrap">
						{errorMsg}
					</p>
				</div>
			)}

			{/* Links */}
			<div className="rounded-lg border border-border-subtle bg-bg-surface p-5 mb-6">
				<div className="flex flex-wrap gap-4">
					{run.output_post_id && (
						<Link
							href={`/admin/agent-drafts`}
							className="btn-primary inline-flex items-center gap-2 no-underline"
						>
							<ExternalLink size={14} />
							View output post
						</Link>
					)}
					{traceUrl && (
						<a
							href={traceUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-ghost inline-flex items-center gap-2 no-underline"
						>
							<ExternalLink size={14} />
							View in Langfuse
						</a>
					)}
				</div>
			</div>

			{/* Run log JSON */}
			{runLog && (
				<div className="rounded-lg border border-border-subtle bg-bg-surface p-5 mb-6">
					<h2 className="m-0 font-display text-h4 font-semibold text-text-primary mb-4">
						Run Log
					</h2>
					<pre className="m-0 max-h-96 overflow-auto rounded-md bg-bg-page p-4 font-mono text-xs text-text-secondary leading-relaxed">
						{JSON.stringify(runLog, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}

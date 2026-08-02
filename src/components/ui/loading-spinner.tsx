"use client";

import { useState, useEffect } from "react";

export type SpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
	size?: SpinnerSize;
	label?: string;
	fullPage?: boolean;
	inline?: boolean;
}

const LOG_MESSAGES = [
	"INITIALIZING_CORE...",
	"FETCHING_METADATA...",
	"PARSING_FRAGMENTS...",
	"AGENTS_SYNC_ACTIVE",
	"DECRYPTING_PACKETS...",
	"NEURAL_LINK_ESTABLISHED",
	"VALIDATING_STATE...",
	"OPTIMIZING_RENDER...",
];

export default function LoadingSpinner({
	size = "md",
	label = "Loading...",
	fullPage = false,
	inline = false,
}: LoadingSpinnerProps) {
	const [logIndex, setLogIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setLogIndex((prev) => (prev + 1) % LOG_MESSAGES.length);
		}, 800);
		return () => clearInterval(interval);
	}, []);

	const containerClasses = fullPage
		? "fixed inset-0 z-50 flex items-center justify-center bg-bg-page/80 backdrop-blur-sm"
		: inline
			? "inline-flex items-center"
			: "flex items-center justify-center p-4";

	// Small version: Just a blinking cursor and minimal text
	if (size === "sm") {
		return (
			<div className={containerClasses} role="status" aria-label={label}>
				<div className="flex items-center gap-2 font-mono text-[0.65rem] text-accent uppercase tracking-tighter">
					<span>Loading</span>
					<span className="animate-pulse">▊</span>
				</div>
			</div>
		);
	}

	// Medium/Large: The "Active Trace" terminal window
	return (
		<div className={containerClasses} role="status" aria-label={label}>
			<div
				className={`relative overflow-hidden rounded-lg border border-border-subtle bg-bg-surface shadow-2xl animate-in fade-in zoom-in duration-300 ${
					size === "lg" ? "w-72" : "w-60"
				}`}
			>
				{/* Terminal Header */}
				<div className="flex items-center justify-between border-b border-border-subtle bg-bg-elevated px-3 py-2">
					<div className="flex gap-1.5">
						<div className="h-2 w-2 rounded-full bg-danger/50" />
						<div className="h-2 w-2 rounded-full bg-warning/50" />
						<div className="h-2 w-2 rounded-full bg-success/50" />
					</div>
					<span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-text-tertiary">
						trace.log
					</span>
				</div>

				{/* Terminal Body */}
				<div className="flex flex-col gap-1 p-4 font-mono">
					<div className="flex items-center gap-2 text-[0.65rem] text-text-tertiary">
						<span className="text-accent">$</span>
						<span>tail -f /dev/agent/sync</span>
					</div>

					<div className="mt-2 flex flex-col gap-1">
						{/* Previous logs (static-ish) */}
						<div className="text-[0.6rem] text-text-tertiary opacity-40">
							{
								LOG_MESSAGES[
									(logIndex - 1 + LOG_MESSAGES.length) % LOG_MESSAGES.length
								]
							}
						</div>

						{/* Current active log */}
						<div className="flex items-center gap-2 text-[0.65rem] font-bold text-accent">
							<span>{LOG_MESSAGES[logIndex]}</span>
							<span className="animate-pulse">▊</span>
						</div>
					</div>

					{/* Scanline Effect */}
					<div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />
				</div>
			</div>
			<span className="sr-only">{label}</span>
		</div>
	);
}

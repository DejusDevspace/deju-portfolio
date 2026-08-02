"use client";

import { useToast } from "@/hooks/use-toast";
import {
	X,
	CheckCircle2,
	AlertCircle,
	Info,
	AlertTriangle,
} from "lucide-react";
import { ToastType } from "@/context/toast-context";

const TOAST_STYLES: Record<
	ToastType,
	{ icon: any; className: string; iconClass: string }
> = {
	success: {
		icon: CheckCircle2,
		className:
			"border-success-muted bg-bg-surface text-text-primary shadow-lg shadow-success/10",
		iconClass: "text-success",
	},
	error: {
		icon: AlertCircle,
		className:
			"border-danger-muted bg-bg-surface text-text-primary shadow-lg shadow-danger/10",
		iconClass: "text-danger",
	},
	warning: {
		icon: AlertTriangle,
		className:
			"border-warning-muted bg-bg-surface text-text-primary shadow-lg shadow-warning/10",
		iconClass: "text-warning",
	},
	info: {
		icon: Info,
		className:
			"border-info-muted bg-bg-surface text-text-primary shadow-lg shadow-info/10",
		iconClass: "text-info",
	},
};

export default function ToastContainer() {
	const { toasts, removeToast } = useToast();

	return (
		<div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3 pointer-events-none">
			{toasts.map((toast) => {
				const Style = TOAST_STYLES[toast.type];
				const Icon = Style.icon;

				return (
					<div
						key={toast.id}
						className={`pointer-events-auto group relative flex items-center gap-3 overflow-hidden rounded-lg border px-4 py-3 backdrop-blur-md transition-all animate-in slide-in-from-right-full duration-300 ${Style.className}`}
					>
						<Icon size={18} className={`shrink-0 ${Style.iconClass}`} />
						<p className="font-mono text-xs font-medium tracking-tight">
							{toast.message}
						</p>
						<button
							onClick={() => removeToast(toast.id)}
							className="ml-2 text-text-tertiary transition-colors hover:text-text-primary"
						>
							<X size={14} />
						</button>

						{/* Progress Bar */}
						{toast.duration && (
							<div
								className="absolute bottom-0 left-0 h-0.5 bg-current opacity-20"
								style={{
									width: "100%",
									animation: `shrink-width ${toast.duration}ms linear forwards`,
								}}
							/>
						)}
					</div>
				);
			})}

			<style jsx global>{`
				@keyframes shrink-width {
					from {
						width: 100%;
					}
					to {
						width: 0%;
					}
				}
			`}</style>
		</div>
	);
}

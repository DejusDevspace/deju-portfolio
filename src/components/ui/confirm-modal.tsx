"use client";

import { useEffect, useRef } from "react";
import { X, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	variant?: "danger" | "primary" | "warning";
}

export default function ConfirmModal({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = "Confirm",
	cancelText = "Cancel",
	variant = "primary",
}: ConfirmModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "auto";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const variantStyles = {
		primary:
			"text-accent border-accent-border bg-accent-muted hover:bg-accent/20",
		danger: "text-danger border-danger/20 bg-danger/10 hover:bg-danger/20",
		warning: "text-warning border-warning/20 bg-warning/10 hover:bg-warning/20",
	};

	return (
		<div className="fixed inset-0 z-110 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
				onClick={onClose}
			/>

			{/* Modal Body */}
			<div
				ref={modalRef}
				className="relative w-full max-w-md overflow-hidden rounded-xl border border-border-subtle bg-bg-surface p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200"
			>
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						{variant === "danger" && (
							<AlertTriangle size={18} className="text-danger" />
						)}
						<h3 className="font-display text-lg font-bold text-text-primary">
							{title}
						</h3>
					</div>
					<button
						onClick={onClose}
						className="text-text-tertiary transition-colors hover:text-text-primary"
					>
						<X size={20} />
					</button>
				</div>

				<p className="mb-8 font-body text-sm leading-relaxed text-text-secondary">
					{message}
				</p>

				<div className="flex items-center justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						className="rounded-md px-4 py-2 cursor-pointer font-mono text-xs font-bold text-text-tertiary transition-colors hover:bg-bg-elevated hover:text-text-primary"
					>
						{cancelText}
					</button>
					<button
						type="button"
						onClick={() => {
							onConfirm();
							onClose();
						}}
						className={`rounded-md border px-5 py-2 cursor-pointer font-mono text-xs font-bold transition-all active:scale-95 ${variantStyles[variant]}`}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}

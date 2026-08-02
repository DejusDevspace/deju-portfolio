"use client";

import React, { createContext, useState, useCallback, ReactNode } from "react";
import ToastContainer from "@/components/ui/toast-container";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration?: number;
}

interface ToastContextType {
	toasts: Toast[];
	addToast: (message: string, type: ToastType, duration?: number) => void;
	removeToast: (id: string) => void;
	success: (message: string, duration?: number) => void;
	error: (message: string, duration?: number) => void;
	info: (message: string, duration?: number) => void;
	warning: (message: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
	undefined,
);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const addToast = useCallback(
		(message: string, type: ToastType, duration = 5000) => {
			const id = Math.random().toString(36).substring(2, 9);
			setToasts((prev) => [...prev, { id, message, type, duration }]);

			if (duration > 0) {
				setTimeout(() => {
					removeToast(id);
				}, duration);
			}
		},
		[removeToast],
	);

	const success = useCallback(
		(message: string, duration?: number) =>
			addToast(message, "success", duration),
		[addToast],
	);
	const error = useCallback(
		(message: string, duration?: number) =>
			addToast(message, "error", duration),
		[addToast],
	);
	const info = useCallback(
		(message: string, duration?: number) => addToast(message, "info", duration),
		[addToast],
	);
	const warning = useCallback(
		(message: string, duration?: number) =>
			addToast(message, "warning", duration),
		[addToast],
	);

	return (
		<ToastContext.Provider
			value={{ toasts, addToast, removeToast, success, error, info, warning }}
		>
			{children}
			<ToastContainer />
		</ToastContext.Provider>
	);
}

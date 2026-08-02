"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			const currentScrollY = window.scrollY;
			const scrollHeight = document.body.scrollHeight - window.innerHeight;
			if (scrollHeight > 0) {
				setProgress(Number(((currentScrollY / scrollHeight) * 100).toFixed(2)));
			} else {
				setProgress(0);
			}
		};

		// Initial set
		updateProgress();

		window.addEventListener("scroll", updateProgress, { passive: true });
		return () => window.removeEventListener("scroll", updateProgress);
	}, []);

	return (
		<div
			className="fixed left-0 top-0 z-50 h-0.75 bg-accent transition-[width] duration-75 ease-linear"
			style={{ width: `${progress}%` }}
			aria-hidden="true"
		/>
	);
}

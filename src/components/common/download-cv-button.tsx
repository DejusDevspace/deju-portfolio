"use client";

import { FiDownload } from "react-icons/fi";
import { siteConfig } from "@/data/site-config";

interface DownloadCVButtonProps {
	children?: React.ReactNode;
}

export default function DownloadCVButton({
	children,
}: DownloadCVButtonProps) {
	return (
		<div className="flex flex-col xl:flex-row items-center gap-8 mt-4">
			<a
				href={siteConfig.resumePath}
				download
				className="flex items-center gap-2 bg-black text-accent/90 px-6 py-3 rounded-lg cursor-pointer
              shadow-[var(--shadow-neon)] hover:scale-105 transition-all duration-300"
			>
				<span>Download CV</span>
				<FiDownload className="text-xl" />
			</a>
			{children}
		</div>
	);
}

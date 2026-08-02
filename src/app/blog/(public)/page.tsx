import { Suspense } from "react";
import type { Metadata } from "next";
import HomeFeedClient from "@/components/feed/home-feed-client";

export const metadata: Metadata = {
	title: "d3jusdevspace — AI engineer, builder, thinker",
	description:
		"Personal blog by d3ju. Writing about AI engineering, projects, and thoughts.",
	openGraph: {
		title: "d3jusdevspace",
		description: "Personal blog by d3ju.",
	},
};

export default function HomePage() {
	return (
		<main className="w-full flex flex-col">
			<Suspense
				fallback={
					<div className="p-20 text-center font-mono text-accent">
						Loading...
					</div>
				}
			>
				<HomeFeedClient />
			</Suspense>
		</main>
	);
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/context/theme-provider";
import Providers from "@/lib/providers";
import Toaster from "@/components/layout/toaster";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "Deju",
	description: "Deju Adejo — AI/ML Engineer portfolio",
	icons: { icon: "/deju.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider>
					<Providers>
						{children}
						<Toaster />
						<Analytics />
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}

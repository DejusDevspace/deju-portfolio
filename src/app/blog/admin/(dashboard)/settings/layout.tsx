"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SETTINGS_TABS = [
	{ href: "/admin/settings/context", label: "My Context" },
	{ href: "/admin/settings/agent", label: "Agent Settings" },
];

export default function SettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-0 p-6 lg:p-10">
			<div className="flex gap-2 border-b border-border-subtle pb-px mb-8">
				{SETTINGS_TABS.map((tab) => (
					<Link
						key={tab.href}
						href={tab.href}
						className={`border-b-2 px-4 py-2 font-display text-sm font-medium no-underline transition-colors ${
							pathname === tab.href
								? "border-accent text-accent"
								: "border-transparent text-text-secondary hover:text-text-primary"
						}`}
					>
						{tab.label}
					</Link>
				))}
			</div>

			{children}
		</div>
	);
}

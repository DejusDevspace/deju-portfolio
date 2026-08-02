"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
	Menu,
	X,
	ExternalLink,
	LogOut,
	Layers,
	Plus,
	Sparkles,
	Network,
	SlidersHorizontal,
	TerminalSquare,
	Tag,
} from "lucide-react";
import { useAdminStats } from "@/hooks/use-api";

export default function AdminShell({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { data: stats } = useAdminStats();

	const navGroups = [
		{
			label: "CONTENT",
			items: [
				{ href: "/blog/admin", label: "Posts", icon: Layers },
				{ href: "/blog/admin/posts/new", label: "New Post", icon: Plus },
				{
					href: "/blog/admin/agent-drafts",
					label: "Agent Drafts",
					icon: Sparkles,
					badge: stats?.agent_pending_posts,
				},
			],
		},
		{
			label: "ORGANIZATION",
			items: [
				{ href: "/blog/admin/taxonomy", label: "Taxonomy", icon: Tag },
				{ href: "/blog/admin/series", label: "Series", icon: Layers },
			],
		},
		{
			label: "SETTINGS",
			items: [
				{ href: "/blog/admin/settings/context", label: "My Context", icon: Network },
				{
					href: "/blog/admin/settings/agent",
					label: "Agent Settings",
					icon: SlidersHorizontal,
				},
			],
		},
		{
			label: "ACTIVITY",
			items: [
				{ href: "/blog/admin/agent/runs", label: "Run Log", icon: TerminalSquare },
			],
		},
	];

	const handleLogout = () => {
		signOut({ callbackUrl: "/blog/admin/login" });
	};

	return (
		<div className="flex min-h-screen bg-bg-page font-body text-text-primary antialiased">
			{/* Mobile Backdrop */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed top-0 bottom-0 left-0 z-50 w-(--admin-sidebar) flex flex-col border-r border-border-subtle bg-bg-surface transition-transform duration-300 lg:translate-x-0 ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex h-(--admin-topbar) items-center border-b border-border-subtle px-6">
					<Link
						href="/blog"
						target="_blank"
						className="font-mono text-(length:--text-h4) font-bold text-accent no-underline text-shadow(--shadow-neon-accent)"
					>
						d3jusdevspace
					</Link>
				</div>

				<nav className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 py-6">
					{navGroups.map((group) => (
						<div key={group.label} className="flex flex-col gap-3">
							<h3 className="m-0 pl-2 font-mono text-[0.65rem] font-semibold tracking-widest text-text-tertiary">
								{group.label}
							</h3>
							<ul className="m-0 flex list-none flex-col gap-1 p-0">
								{group.items.map((item) => {
									const isActive = pathname === item.href;
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												className={`flex items-center gap-3 rounded-md px-3 py-2 font-mono text-xs no-underline transition-all duration-150 hover:bg-bg-elevated hover:text-text-primary ${
													isActive
														? "border-l-[3px] border-accent bg-accent-muted pl-2.25 text-accent"
														: "text-text-secondary"
												}`}
												onClick={() => setIsMobileMenuOpen(false)}
											>
												<item.icon
													className={`h-4.5 w-4.5 ${isActive ? "opacity-100" : "opacity-80"}`}
												/>
												<span>{item.label}</span>
												{item.badge && (
													<span className="ml-auto rounded-sm bg-accent-border px-1.5 py-0.5 text-[0.65rem] font-bold text-accent">
														{item.badge}
													</span>
												)}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</nav>

				<div className="border-t border-border-subtle p-4">
					<button
						className="flex w-full cursor-pointer items-center gap-3 rounded-md border-none bg-transparent px-3 py-2 font-mono text-xs text-text-secondary transition-all duration-150 hover:bg-bg-elevated hover:text-text-primary"
						onClick={handleLogout}
					>
						<LogOut size={16} />
						<span>Logout</span>
					</button>
				</div>
			</aside>

			{/* Main Content Area */}
			<div className="flex flex-1 flex-col ml-0 min-w-0 transition-[margin-left] duration-300 lg:ml-(--admin-sidebar)">
				{/* Top Bar */}
				<header className="sticky top-0 z-30 flex h-(--admin-topbar) items-center justify-between border-b border-border-subtle bg-bg-surface px-6">
					<div className="flex items-center">
						<button
							className="-ml-2 flex cursor-pointer items-center justify-center border-none bg-transparent p-0 text-text-secondary lg:hidden"
							onClick={() => setIsMobileMenuOpen(true)}
							aria-label="Open menu"
						>
							<Menu size={24} />
						</button>
					</div>

					<div className="flex items-center gap-4">
						<Link href="/blog" target="_blank" className="btn-ghost hidden md:flex">
							<ExternalLink size={16} />
							<span>View site</span>
						</Link>
						<div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-accent-border bg-accent-muted font-mono text-xs font-bold text-accent">
							OA
						</div>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex flex-1 flex-col">{children}</main>
			</div>
		</div>
	);
}

export default function PublicFooter() {
	return (
		<footer className="w-full border-t border-border-subtle bg-bg-surface py-8">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row lg:px-8">
				{/* Left: Social Links */}
				<div className="flex items-center gap-6 font-mono text-xs uppercase text-text-secondary">
					<a
						href="https://x.com/adejo_deju"
						className="hover:text-accent transition-colors"
					>
						Twitter
					</a>
					<a
						href="https://github.com/DejusDevspace"
						className="hover:text-accent transition-colors"
					>
						GitHub
					</a>
					<a
						href="https://linkedin.com/in/deju-adejo"
						className="hover:text-accent transition-colors"
					>
						LinkedIn
					</a>
				</div>

				{/* Right: Copyright */}
				<div className="font-mono text-xs uppercase text-text-tertiary">
					© {new Date().getFullYear()} D3JUSDEVSPACE // BUILT FOR THE AGENTIC
					AGE
				</div>
			</div>
		</footer>
	);
}

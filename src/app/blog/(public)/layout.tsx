import PublicNavbar from "@/components/layout/public-navbar";
import PublicFooter from "@/components/layout/public-footer";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col bg-bg-page font-body text-text-primary antialiased">
			<PublicNavbar />
			<div className="flex-1">{children}</div>
			<PublicFooter />
		</div>
	);
}

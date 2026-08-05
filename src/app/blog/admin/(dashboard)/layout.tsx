import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminShell } from "@/components/layout";
import { AuthProvider } from "@/components/providers/auth-provider";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/blog/admin/login");
	}

	return (
		<AuthProvider>
			<AdminShell>{children}</AdminShell>
		</AuthProvider>
	);
}

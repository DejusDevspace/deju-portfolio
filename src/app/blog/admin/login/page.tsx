"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, AtSign, Key, Eye, EyeOff, ArrowRight } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Please enter both email and password.");
			return;
		}

		setIsLoading(true);

		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result?.error) {
				setError("Invalid credentials. Access denied.");
				setIsLoading(false);
			} else {
				router.push("/blog/admin");
				router.refresh();
			}
		} catch (err) {
			setError("An unexpected error occurred.");
			setIsLoading(false);
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-bg-page p-4">
			<div className="relative w-full max-w-105 rounded-lg [box-shadow:0_0_40px_rgba(0,229,255,0.08),0_0_80px_rgba(0,229,255,0.04)]">
				<div className="relative z-10 flex flex-col gap-8 rounded-lg border border-border-subtle bg-bg-surface p-8">
					{/* Header */}
					<div className="flex items-center justify-between border-b border-border-subtle pb-4">
						<h1 className="m-0 font-display text-(length:--text-h3) font-medium text-text-primary">
							Admin login
						</h1>
						<div className="flex items-center gap-2 rounded-sm border border-accent-border bg-accent-muted px-3 py-1 font-mono text-xs font-medium text-accent">
							<Lock size={12} />
							<span>ENCRYPTED</span>
						</div>
					</div>

					<form onSubmit={handleLogin} className="flex flex-col gap-6">
						{/* Email Field */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between">
								<label
									htmlFor="email"
									className="font-mono text-xs font-medium tracking-wider text-text-secondary"
								>
									EMAIL
								</label>
								<span className="font-mono text-xs text-accent opacity-80">
									user@node.root
								</span>
							</div>
							<div className="relative flex items-center">
								<AtSign
									size={16}
									className="pointer-events-none absolute left-3 text-text-tertiary"
								/>
								<input
									id="email"
									type="email"
									placeholder="Enter admin email"
									className="w-full rounded-md border border-border-subtle bg-bg-elevated py-3 pl-9 pr-3 font-mono text-(length:--text-body-sm) text-text-primary outline-none transition-all duration-150 placeholder:text-text-tertiary focus:border-accent focus:shadow-[0_0_0_1px_var(--color-accent)]"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						{/* Password Field */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="font-mono text-xs font-medium tracking-wider text-text-secondary"
								>
									PASSWORD
								</label>
								<button
									type="button"
									className="cursor-pointer border-none bg-transparent p-0 font-mono text-xs text-accent text-underline-offset-2 opacity-80 underline transition-opacity hover:opacity-100"
								>
									Recover?
								</button>
							</div>
							<div className="relative flex items-center">
								<Key
									size={16}
									className="pointer-events-none absolute left-3 text-text-tertiary"
								/>
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									className="w-full rounded-md border border-border-subtle bg-bg-elevated py-3 pl-9 pr-3 font-mono text-(length:--text-body-sm) text-text-primary outline-none transition-all duration-150 placeholder:text-text-tertiary focus:border-accent focus:shadow-[0_0_0_1px_var(--color-accent)]"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button
									type="button"
									className="absolute right-3 flex cursor-pointer items-center justify-center border-none bg-transparent p-0 text-text-tertiary transition-colors duration-150 hover:text-text-secondary"
									onClick={() => setShowPassword(!showPassword)}
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
								</button>
							</div>
						</div>

						{error && (
							<div className="rounded-sm border border-danger bg-danger-muted px-3 py-2 font-mono text-xs text-danger">
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={isLoading}
							className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-accent-border bg-accent-muted p-3 font-mono text-(length:--text-body-sm) font-medium text-accent transition-all duration-150 hover:bg-accent-border hover:shadow-[0_0_12px_rgba(0,229,255,0.2)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
						>
							<span>{isLoading ? "Signing In..." : "Sign in"}</span>
							<ArrowRight size={16} />
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}

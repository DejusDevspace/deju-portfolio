/**
 * d3jusdevspace — 404 Not Found
 *
 * Terminal-styled 404 page with glitch effect on the error code,
 * a fake shell prompt, and a "go home" CTA.
 */

import Link from "next/link";
import type { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
	title: "404 — Page Not Found",
};

export default function NotFound() {
	return (
		<main className={styles.page}>
			{/* Scanline overlay for CRT effect */}
			<div className={styles.scanlines} aria-hidden="true" />

			<div className={styles.content}>
				{/* Glitching 404 */}
				<div className={styles.errorBlock}>
					<h1 className={styles.errorCode} data-text="404">
						404
					</h1>
					<div className={styles.glitchLayer} aria-hidden="true">
						404
					</div>
				</div>

				{/* Terminal prompt */}
				<div className={styles.terminal}>
					<div className={styles.terminalBar}>
						<span className={styles.terminalDot} data-color="danger" />
						<span className={styles.terminalDot} data-color="warning" />
						<span className={styles.terminalDot} data-color="success" />
						<span className={styles.terminalTitle}>d3jusdevspace — bash</span>
					</div>

					<div className={styles.terminalBody}>
						<p className={styles.terminalLine}>
							<span className={styles.prompt}>$</span>{" "}
							<span className={styles.command}>
								curl -s https://d3jusdevspace.dev/this-page
							</span>
						</p>
						<p className={styles.terminalOutput}>
							<span className={styles.errorText}>Error 404:</span> The requested
							route could not be resolved.
						</p>
						<p className={styles.terminalOutput}>
							The page you&apos;re looking for has either been moved, deleted,
							or never existed in this dimension.
						</p>
						<p className={styles.terminalLine}>
							<span className={styles.prompt}>$</span>{" "}
							<span className={styles.cursor}>▊</span>
						</p>
					</div>
				</div>

				{/* CTA */}
				<Link href="/blog" className="btn-primary">
					← Back to Home
				</Link>
			</div>
		</main>
	);
}

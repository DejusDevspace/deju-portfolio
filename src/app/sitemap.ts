import { SITE } from "@/lib/constants";

/**
 * Dynamic sitemap generated from published posts.
 *
 * Includes the home page and all public post URLs.
 * Fetches the published post list directly from the backend
 * (server-side only, not through the proxy).
 */
export default async function sitemap() {
	const baseUrl = SITE.url;

	// Static pages.
	const staticRoutes = [
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1,
		},
	];

	// Dynamic post pages — fetch all published slugs from the backend.
	let postRoutes: typeof staticRoutes = [];

	try {
		const backendUrl =
			process.env.BACKEND_URL ?? "http://localhost:8000";
		const res = await fetch(
			`${backendUrl}/api/v1/posts?limit=50&page=1`,
			{ next: { revalidate: 3600 } },
		);

		if (res.ok) {
			const data = await res.json();
			postRoutes = data.items.map(
				(post: { slug: string; updated_at: string }) => ({
					url: `${baseUrl}/blog/posts/${post.slug}`,
					lastModified: new Date(post.updated_at),
					changeFrequency: "weekly" as const,
					priority: 0.8,
				}),
			);
		}
	} catch {
		// If the backend is unreachable, return only static routes.
		// The sitemap will be repopulated on the next revalidation.
	}

	return [...staticRoutes, ...postRoutes];
}

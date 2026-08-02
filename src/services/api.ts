/**
 * d3jusdevspace — API Service Layer
 *
 * All backend calls are defined here as thin wrappers around the API client.
 * Components should never call `apiClient` directly — use these functions
 * or the React Query hooks that wrap them.
 */

import apiClient from "@/lib/api-client";
import type {
  AdminStatsResponse,
  AgentRunListItem,
  AgentRunResponse,
  AgentScheduleResponse,
  AgentScheduleUpdate,
  AgentTriggerResponse,
  Category,
  CategoryCreate,
  CategoryUpdate,
  Comment,
  CommentCreate,
  MessageResponse,
  PaginatedResponse,
  Post,
  PostCreate,
  PostListItem,
  PostUpdate,
  SeriesCreate,
  SeriesListItem,
  SeriesResponse,
  SeriesUpdate,
  Tag,
  TagCreate,
  TagUpdate,
  UserContext,
  UserContextUpdate,
} from "@/types";

/* ============================================================================
  Public — Taxonomy
============================================================================ */

/** Fetch all categories for the public feed. */
export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/categories");
  return data;
}

/** Fetch all tags for the public feed. */
export async function getTags(): Promise<Tag[]> {
  const { data } = await apiClient.get<Tag[]>("/tags");
  return data;
}

/* ============================================================================
  Public — Series
============================================================================ */

/** Fetch all published series with post counts. */
export async function getPublicSeries(): Promise<SeriesListItem[]> {
  const { data } = await apiClient.get<SeriesListItem[]>("/series");
  return data;
}

/** Fetch a single published series by slug with its ordered posts. */
export async function getSeriesBySlug(
  slug: string,
): Promise<SeriesResponse> {
  const { data } = await apiClient.get<SeriesResponse>(`/series/${slug}`);
  return data;
}

/* ============================================================================
  Public — Posts
============================================================================ */

export interface ListPostsParams {
  category?: string;
  tag?: string;
  series?: string;
  page?: number;
  limit?: number;
}

/** Fetch paginated published posts with optional category/tag/series filters. */
export async function listPublishedPosts(
  params: ListPostsParams = {},
): Promise<PaginatedResponse<PostListItem>> {
  const { data } = await apiClient.get<PaginatedResponse<PostListItem>>(
    "/posts",
    { params },
  );
  return data;
}

/** Fetch a single published post by slug. */
export async function getPostBySlug(slug: string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/posts/${slug}`);
  return data;
}

/* ============================================================================
  Public — Search
============================================================================ */

export interface SearchResult {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
  };
  matched_chunk: string;
  similarity: number;
  aggregated_score: number;
  match_type: "hybrid" | "semantic" | "keyword";
  highlighted_snippet?: string | null;
}

export interface SemanticSearchResponse {
  query: string;
  results: SearchResult[];
}

/** Perform semantic search over published posts. */
export async function semanticSearch(
  query: string,
  limit: number = 10,
): Promise<SemanticSearchResponse> {
  const { data } = await apiClient.get<SemanticSearchResponse>(
    "/search/semantic",
    { params: { q: query, limit } },
  );
  return data;
}

/* ============================================================================
  Public — Comments
============================================================================ */

/** Fetch approved comments for a published post (by slug). */
export async function getPostComments(slug: string): Promise<Comment[]> {
  const { data } = await apiClient.get<Comment[]>(
    `/posts/${slug}/comments`,
  );
  return data;
}

/** Submit a new comment on a post. */
export async function submitComment(
  payload: CommentCreate,
): Promise<Comment> {
  const { data } = await apiClient.post<Comment>("/comments", payload);
  return data;
}

/* ============================================================================
  Admin — Posts
============================================================================ */

export interface AdminListPostsParams {
  status?: string;
  is_agent_authored?: boolean;
  page?: number;
  limit?: number;
}

/** (Admin) List all posts with optional status filter. */
export async function adminListPosts(
  params: AdminListPostsParams = {},
): Promise<PaginatedResponse<PostListItem>> {
  const { data } = await apiClient.get<PaginatedResponse<PostListItem>>(
    "/admin/posts",
    { params },
  );
  return data;
}

/** (Admin) Fetch a single post by ID. */
export async function adminGetPostById(postId: string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/admin/posts/${postId}`);
  return data;
}

/** (Admin) Create a new post. */
export async function adminCreatePost(
  payload: PostCreate,
): Promise<Post> {
  const { data } = await apiClient.post<Post>("/admin/posts", payload);
  return data;
}

/** (Admin) Update an existing post. */
export async function adminUpdatePost(
  postId: string,
  payload: PostUpdate,
): Promise<Post> {
  const { data } = await apiClient.patch<Post>(
    `/admin/posts/${postId}`,
    payload,
  );
  return data;
}

/** (Admin) Soft-delete a post. */
export async function adminDeletePost(
  postId: string,
): Promise<MessageResponse> {
  const { data } = await apiClient.delete<MessageResponse>(
    `/admin/posts/${postId}`,
  );
  return data;
}

/* ============================================================================
  Admin — Categories
============================================================================ */

/** (Admin) List all categories. */
export async function adminListCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/admin/categories");
  return data;
}

/** (Admin) Create a new category. */
export async function adminCreateCategory(
  payload: CategoryCreate,
): Promise<Category> {
  const { data } = await apiClient.post<Category>(
    "/admin/categories",
    payload,
  );
  return data;
}

/** (Admin) Update a category. */
export async function adminUpdateCategory(
  categoryId: string,
  payload: CategoryUpdate,
): Promise<Category> {
  const { data } = await apiClient.patch<Category>(
    `/admin/categories/${categoryId}`,
    payload,
  );
  return data;
}

/** (Admin) Delete a category. */
export async function adminDeleteCategory(
  categoryId: string,
): Promise<MessageResponse> {
  const { data } = await apiClient.delete<MessageResponse>(
    `/admin/categories/${categoryId}`,
  );
  return data;
}

/* ============================================================================
  Admin — Series
============================================================================ */

/** (Admin) List all series with post counts. */
export async function adminListSeries(
  params: { status?: string } = {},
): Promise<SeriesListItem[]> {
  const { data } = await apiClient.get<SeriesListItem[]>(
    "/admin/series",
    { params },
  );
  return data;
}

/** (Admin) Create a new series. */
export async function adminCreateSeries(
  payload: SeriesCreate,
): Promise<SeriesResponse> {
  const { data } = await apiClient.post<SeriesResponse>(
    "/admin/series",
    payload,
  );
  return data;
}

/** (Admin) Update a series. */
export async function adminUpdateSeries(
  seriesId: string,
  payload: SeriesUpdate,
): Promise<SeriesResponse> {
  const { data } = await apiClient.patch<SeriesResponse>(
    `/admin/series/${seriesId}`,
    payload,
  );
  return data;
}

/** (Admin) Delete a series. */
export async function adminDeleteSeries(
  seriesId: string,
): Promise<MessageResponse> {
  const { data } = await apiClient.delete<MessageResponse>(
    `/admin/series/${seriesId}`,
  );
  return data;
}

/* ============================================================================
  Admin — Tags
============================================================================ */

/** (Admin) Create a new tag. */
export async function adminCreateTag(
  payload: TagCreate,
): Promise<Tag> {
  const { data } = await apiClient.post<Tag>(
    "/admin/tags",
    payload,
  );
  return data;
}

/** (Admin) Update a tag. */
export async function adminUpdateTag(
  tagId: string,
  payload: TagUpdate,
): Promise<Tag> {
  const { data } = await apiClient.patch<Tag>(
    `/admin/tags/${tagId}`,
    payload,
  );
  return data;
}

/** (Admin) Delete a tag. */
export async function adminDeleteTag(
  tagId: string,
): Promise<MessageResponse> {
  const { data } = await apiClient.delete<MessageResponse>(
    `/admin/tags/${tagId}`,
  );
  return data;
}

/* ============================================================================
  Admin — Comments
============================================================================ */

/** (Admin) Delete a comment. */
export async function adminDeleteComment(
  commentId: string,
): Promise<MessageResponse> {
  const { data } = await apiClient.delete<MessageResponse>(
    `/admin/comments/${commentId}`,
  );
  return data;
}

/* ============================================================================
  Admin — Context
============================================================================ */

/** (Admin) Retrieve the owner's context profile. */
export async function adminGetContext(): Promise<UserContext> {
  const { data } = await apiClient.get<UserContext>("/admin/context");
  return data;
}

/** (Admin) Create or update the owner's context profile. */
export async function adminUpdateContext(
  payload: UserContextUpdate,
): Promise<UserContext> {
  const { data } = await apiClient.put<UserContext>("/admin/context", payload);
  return data;
}

/* ============================================================================
  Admin — Agent
============================================================================ */

/** (Admin) Trigger a manual agent pipeline run. */
export async function adminTriggerAgent(): Promise<AgentTriggerResponse> {
  const { data } = await apiClient.post<AgentTriggerResponse>(
    "/admin/agent/trigger",
  );
  return data;
}

export interface ListAgentRunsParams {
  page?: number;
  limit?: number;
}

/** (Admin) List paginated agent runs. */
export async function adminListAgentRuns(
  params: ListAgentRunsParams = {},
): Promise<PaginatedResponse<AgentRunListItem>> {
  const { data } = await apiClient.get<
    PaginatedResponse<AgentRunListItem>
  >("/admin/agent/runs", { params });
  return data;
}

/** (Admin) Fetch a single agent run by ID. */
export async function adminGetAgentRun(
  runId: string,
): Promise<AgentRunResponse> {
  const { data } = await apiClient.get<AgentRunResponse>(
    `/admin/agent/runs/${runId}`,
  );
  return data;
}

/** (Admin) Fetch the agent schedule config. */
export async function adminGetAgentSchedule(): Promise<AgentScheduleResponse> {
  const { data } = await apiClient.get<AgentScheduleResponse>(
    "/admin/agent/schedule",
  );
  return data;
}

/** (Admin) Update the agent schedule config. */
export async function adminUpdateAgentSchedule(
  payload: AgentScheduleUpdate,
): Promise<AgentScheduleResponse> {
  const { data } = await apiClient.put<AgentScheduleResponse>(
    "/admin/agent/schedule",
    payload,
  );
  return data;
}

/* ============================================================================
  Admin — Uploads
============================================================================ */

/** (Admin) Upload an image to Cloudinary via the backend. */
export async function adminUploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await apiClient.post<{ url: string }>(
    "/admin/uploads/image",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}

/** (Admin) Delete a previously uploaded image from Cloudinary. */
export async function adminDeleteImage(
  url: string,
): Promise<MessageResponse> {
  const { data } = await apiClient.delete<MessageResponse>(
    "/admin/uploads/image",
    { data: { url } },
  );
  return data;
}

/* ============================================================================
  Health
============================================================================ */

/* ============================================================================
  Admin — Stats
============================================================================ */

/** (Admin) Fetch aggregated dashboard statistics. */
export async function adminGetStats(): Promise<AdminStatsResponse> {
  const { data } = await apiClient.get<AdminStatsResponse>(
    "/admin/posts/stats",
  );
  return data;
}

/* ============================================================================
  Health
============================================================================ */

/** Check backend health. */
export async function healthCheck(): Promise<{ status: string }> {
  const { data } = await apiClient.get<{ status: string }>("/health");
  return data;
}

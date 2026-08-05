/**
 * d3jusdevspace — Global API Types
 *
 * These types mirror the backend Pydantic schemas.
 * Keep them in sync when the backend changes.
 */

/* ============================================================================
  Common / Shared
============================================================================ */

/** Generic paginated response wrapper matching backend `PaginatedResponse[T]`. */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/** Simple message response for confirmations and errors. */
export interface MessageResponse {
  detail: string;
}

/** Standard API error shape returned by FastAPI. */
export interface ApiError {
  detail: string;
  status: number;
}

/* ============================================================================
  Category
============================================================================ */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface CategoryCreate {
  name: string;
  description?: string | null;
}

export interface CategoryUpdate {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
}

/* ============================================================================
  Tag
============================================================================ */

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface TagCreate {
  name: string;
}

export interface TagUpdate {
  name: string;
}

/* ============================================================================
  Series
============================================================================ */

/** Minimal series info embedded in post responses. */
export interface PostSeriesInfo {
  id: string;
  title: string;
  slug: string;
  series_order: number | null;
}

/** Series list item with post count (used in feeds and admin list). */
export interface SeriesListItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: string;
  post_count: number;
  created_at: string;
  updated_at: string;
}

/** Minimal post data within a series response. */
export interface SeriesPostItem {
  id: string;
  title: string;
  slug: string;
  series_order: number | null;
  status: string;
  published_at: string | null;
}

/** Full series with ordered posts. */
export interface SeriesResponse {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: string;
  posts: SeriesPostItem[];
  created_at: string;
  updated_at: string;
}

export interface SeriesCreate {
  title: string;
  description?: string | null;
  status?: "draft" | "published";
}

export interface SeriesUpdate {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  status?: string | null;
}

/* ============================================================================
  Post
============================================================================ */

export type PostStatus = "draft" | "published" | "archived" | "agent_draft";

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: Category;
  tags: Tag[];
  series: PostSeriesInfo | null;
  status: PostStatus;
  is_agent_authored: boolean;
  reading_time_mins: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post extends PostListItem {
  content: string;
}

export interface PostCreate {
  title: string;
  content: string;
  category_id: string;
  tags?: string[];
  series_id?: string | null;
  series_order?: number | null;
  status?: "draft" | "published";
}

export interface PostUpdate {
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  category_id?: string | null;
  tags?: string[] | null;
  series_id?: string | null;
  series_order?: number | null;
  status?: PostStatus | null;
}

/* ============================================================================
  Comment
============================================================================ */

export interface Comment {
  id: string;
  post_id: string;
  display_name: string | null;
  body: string;
  created_at: string;
}

export interface CommentCreate {
  post_id: string;
  display_name?: string | null;
  body: string;
  honeypot?: string;
}

/* ============================================================================
  User Context
============================================================================ */

export interface UserContext {
  id: string;
  owner_id: string;
  bio: string | null;
  interests: string[];
  learning_focus: string | null;
  lifestyle_context: string | null;
  updated_at: string;
}

export interface UserContextUpdate {
  bio?: string | null;
  interests?: string[];
  learning_focus?: string | null;
  lifestyle_context?: string | null;
}

/* ============================================================================
  Agent
============================================================================ */

/** Lightweight agent run for list/log views. */
export interface AgentRunListItem {
  id: string;
  topic: string | null;
  status: string;
  triggered_by: string;
  output_post_id: string | null;
  started_at: string;
  completed_at: string | null;
}

/** Full agent run record. */
export interface AgentRunResponse {
  id: string;
  owner_id: string;
  topic: string | null;
  model_used: string | null;
  status: string;
  output_post_id: string | null;
  run_log: Record<string, unknown> | null;
  triggered_by: string;
  started_at: string;
  completed_at: string | null;
}

/** Agent schedule config. */
export interface AgentScheduleResponse {
  id: string;
  owner_id: string;
  cron_expr: string;
  is_active: boolean;
  updated_at: string;
}

/** Update agent schedule. */
export interface AgentScheduleUpdate {
  cron_expr?: string;
  is_active?: boolean;
}

/** Response from triggering the pipeline. */
export interface AgentTriggerResponse {
  run_id: string;
  status: string;
  message: string;
}

/* ============================================================================
  Admin — Stats
============================================================================ */

/** Aggregated dashboard statistics. */
export interface AdminStatsResponse {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  agent_pending_posts: number;
  total_comments: number;
  pending_comments: number;
  total_categories: number;
  total_tags: number;
  agent_runs_total: number;
  agent_runs_failed: number;
  agent_runs_today: number;
}

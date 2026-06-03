declare module "aira-scrapers/scrapers/reddit" {
  import type { SubredditEntry } from "aira-scrapers/types/index";
  export function scrapeReddit(
    entries: SubredditEntry[],
  ): Promise<{ posts: unknown[]; ok: number; failed: number }>;
}

declare module "aira-scrapers/scrapers/tiktok" {
  export function scrapeTikTokTrending(): Promise<unknown[]>;
}

declare module "aira-scrapers/scrapers/pinterest" {
  import type { PinterestSession } from "aira-scrapers/core/session";
  export function scrapeSearch(
    session: PinterestSession,
    query: string,
    maxPins: number,
  ): Promise<unknown[]>;
  export function scrapeTrending(
    session: PinterestSession,
    limit: number,
  ): Promise<unknown[]>;
}

declare module "aira-scrapers/core/session" {
  export class PinterestSession {
    init(): Promise<void>;
  }
}

declare module "aira-scrapers/core/db" {
  export function connectDB(): void;
  export function upsertRedditPosts(
    posts: unknown[],
  ): Promise<{ inserted: number; updated: number }>;
  export function upsertTikTokVideos(
    videos: unknown[],
  ): Promise<{ inserted: number; updated: number }>;
  export function upsertPinterestPins(
    pins: unknown[],
  ): Promise<{ inserted: number; updated: number }>;
  export function upsertGoogleTrends(
    trends: unknown[],
  ): Promise<{ inserted: number; updated: number }>;
}

declare module "aira-scrapers/config/index" {
  export function getSubredditsByTier(tier: string): import("aira-scrapers/types/index").SubredditEntry[];
  export const PINTEREST_QUERIES: string[];
  export const SCRAPE_CONFIG: {
    pinterest: { maxPinsPerQuery: number; delayBetweenQueries: number };
  };
}

declare module "aira-scrapers/types/index" {
  export interface SubredditEntry {
    name: string;
    tier?: string;
  }
}

import { useEffect, useState } from "react";
import { GITHUB_USER, METRICS_API } from "../data/profile";

export type DataForgeMetrics = {
  total_jobs: number;
  new_today: number;
  english_jobs: number;
  remote_counts: { remote: number; hybrid: number; onsite: number };
  jobs_by_source: Record<string, number>;
  pipeline_stats: {
    new_jobs: number;
    updated_jobs: number;
    expired_jobs: number;
    run_at: string;
  };
  data_quality: {
    missing_company_rate: number;
    missing_location_rate: number;
    duplicate_job_id_rate: number;
    schema_validation_pass: boolean;
  };
  last_updated: string;
  top_skills: { skill: string; count: number }[];
  trend: { date: string; count: number }[];
};

export type GithubEvent = {
  id: string;
  type: string;
  repo: string;
  created_at: string;
};

export type LiveState = {
  status: "loading" | "live" | "degraded";
  metrics: DataForgeMetrics | null;
  github: {
    publicRepos: number;
    lastEvent: GithubEvent | null;
    events: GithubEvent[];
  } | null;
};

const FALLBACK: DataForgeMetrics = {
  total_jobs: 9883,
  new_today: 268,
  english_jobs: 5080,
  remote_counts: { remote: 274, hybrid: 582, onsite: 9027 },
  jobs_by_source: {
    ba_api: 6474,
    direct: 1918,
    eures: 1136,
    arbeitnow: 344,
    berlin_startups: 11,
  },
  pipeline_stats: {
    new_jobs: 265,
    updated_jobs: 3,
    expired_jobs: 265,
    run_at: "2026-08-23T20:30:36.027908+00:00",
  },
  data_quality: {
    missing_company_rate: 0,
    missing_location_rate: 0.0223,
    duplicate_job_id_rate: 0,
    schema_validation_pass: true,
  },
  last_updated: "2026-08-23T20:30:36.027908Z",
  top_skills: [
    { skill: "Databricks", count: 229 },
    { skill: "Python", count: 43 },
    { skill: "Aws", count: 35 },
  ],
  trend: [],
};

function mapEvents(raw: unknown): GithubEvent[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 6).map((e) => {
    const item = e as {
      id?: string;
      type?: string;
      repo?: { name?: string };
      created_at?: string;
    };
    return {
      id: item.id ?? crypto.randomUUID(),
      type: (item.type ?? "Event").replace(/Event$/, ""),
      repo: item.repo?.name?.replace(`${GITHUB_USER}/`, "") ?? "repo",
      created_at: item.created_at ?? "",
    };
  });
}

export function useLiveData(): LiveState {
  const [state, setState] = useState<LiveState>({
    status: "loading",
    metrics: null,
    github: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [metricsRes, userRes, eventsRes] = await Promise.all([
          fetch(METRICS_API),
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=6`),
        ]);

        const metrics = metricsRes.ok
          ? ((await metricsRes.json()) as DataForgeMetrics)
          : FALLBACK;
        const user = userRes.ok
          ? ((await userRes.json()) as { public_repos?: number })
          : { public_repos: 6 };
        const events = eventsRes.ok ? mapEvents(await eventsRes.json()) : [];

        if (cancelled) return;
        setState({
          status: metricsRes.ok ? "live" : "degraded",
          metrics,
          github: {
            publicRepos: user.public_repos ?? 6,
            lastEvent: events[0] ?? null,
            events,
          },
        });
      } catch {
        if (cancelled) return;
        setState({
          status: "degraded",
          metrics: FALLBACK,
          github: { publicRepos: 6, lastEvent: null, events: [] },
        });
      }
    }

    void load();
    const id = window.setInterval(() => void load(), 90_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return state;
}

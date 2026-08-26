import { motion } from "framer-motion";
import type { LiveState } from "../hooks/useLiveData";
import { formatInt, timeAgo } from "../lib/format";
import { profile } from "../data/profile";

function Sparkline({ points }: { points: { count: number }[] }) {
  if (points.length < 2) return <div className="spark spark--empty" />;
  const max = Math.max(...points.map((p) => p.count), 1);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 120;
      const y = 28 - (p.count / max) * 24;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg className="spark" viewBox="0 0 120 32" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Telemetry({ live }: { live: LiveState }) {
  const m = live.metrics;
  const sources = m ? Object.keys(m.jobs_by_source).length : 5;
  const remote = m ? m.remote_counts.remote : 0;
  const quality = m?.data_quality.schema_validation_pass ? "Pass" : "—";

  return (
    <section className="section" id="live">
      <div className="section__head">
        <p className="eyebrow">Live telemetry</p>
        <h2>DataForge is running in eu-central-1</h2>
        <p className="lede">
          Numbers below pull from the production Metrics API — the same Gold layer that powers the public dashboard.
        </p>
      </div>
      <div className="telemetry bento-kpis">
        <motion.article className="glass kpi" whileHover={{ y: -4 }}>
          <span>Active jobs</span>
          <strong>{m ? formatInt(m.total_jobs) : "—"}</strong>
          <em>{m ? `+${formatInt(m.new_today)} in latest window` : "hydrating"}</em>
        </motion.article>
        <motion.article className="glass kpi" whileHover={{ y: -4 }}>
          <span>Sources</span>
          <strong>{sources}</strong>
          <em>BA · EURES · ATS · Arbeitnow · Startups</em>
        </motion.article>
        <motion.article className="glass kpi" whileHover={{ y: -4 }}>
          <span>Remote roles</span>
          <strong>{m ? formatInt(remote) : "—"}</strong>
          <em>{m ? `${formatInt(m.english_jobs)} English listings` : ""}</em>
        </motion.article>
        <motion.article className="glass kpi" whileHover={{ y: -4 }}>
          <span>Schema gates</span>
          <strong>{quality}</strong>
          <em>
            {m
              ? `Last gold write ${timeAgo(m.pipeline_stats.run_at)}`
              : live.status === "loading"
                ? "Connecting to API"
                : "Using last snapshot"}
          </em>
        </motion.article>
      </div>
      <div className="telemetry__row">
        <article className="glass feed">
          <header>
            <p>Pipeline pulse</p>
            <span className={`chip ${live.status === "live" ? "chip--live" : ""}`}>
              {live.status === "live" ? "API live" : live.status}
            </span>
          </header>
          <Sparkline points={m?.trend ?? []} />
          <dl className="feed__stats">
            <div>
              <dt>New</dt>
              <dd>{m ? formatInt(m.pipeline_stats.new_jobs) : "—"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{m ? formatInt(m.pipeline_stats.updated_jobs) : "—"}</dd>
            </div>
            <div>
              <dt>Expired</dt>
              <dd>{m ? formatInt(m.pipeline_stats.expired_jobs) : "—"}</dd>
            </div>
          </dl>
        </article>
        <article className="glass feed">
          <header>
            <p>GitHub signal</p>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              @{profile.links.github.split("/").pop()}
            </a>
          </header>
          <ul className="events">
            {(live.github?.events.length ? live.github.events : []).map((e) => (
              <li key={e.id}>
                <span>{e.type}</span>
                <strong>{e.repo}</strong>
                <em>{timeAgo(e.created_at)}</em>
              </li>
            ))}
            {!live.github?.events.length && <li className="events__empty">Waiting for public events…</li>}
          </ul>
        </article>
      </div>
    </section>
  );
}

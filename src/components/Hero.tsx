import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { useBerlinClock } from "../hooks/useBerlinClock";
import type { LiveState } from "../hooks/useLiveData";
import { formatInt, timeAgo } from "../lib/format";

function TypeCycle({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [out, setOut] = useState(false);

  useEffect(() => {
    const word = words[index];
    if (!out) {
      if (text.length < word.length) {
        const t = window.setTimeout(() => setText(word.slice(0, text.length + 1)), 48);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setOut(true), 1500);
      return () => window.clearTimeout(t);
    }
    if (text.length > 0) {
      const t = window.setTimeout(() => setText(text.slice(0, -1)), 24);
      return () => window.clearTimeout(t);
    }
    setOut(false);
    setIndex((i) => (i + 1) % words.length);
    return undefined;
  }, [index, out, text, words]);

  return (
    <span className="type">
      {text}
      <span className="type__caret" aria-hidden="true" />
    </span>
  );
}

export function Hero({ live }: { live: LiveState }) {
  const clock = useBerlinClock();
  const jobs = live.metrics ? formatInt(live.metrics.total_jobs) : "—";
  const last = live.github?.lastEvent;

  return (
    <section className="hero" id="top">
      <motion.div
        className="hero__copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.12 }}
      >
        <p className="eyebrow">
          <span className={`pulse ${live.status === "live" ? "pulse--on" : ""}`} />
          {live.status === "live" ? "Model online" : live.status === "loading" ? "Sampling" : "Cached weights"}
          <span className="sep">/</span>
          {clock.date} · {clock.time} CET
        </p>
        <h1>
          <span>Ritesh</span>
          <span className="hero__last">Jadhav</span>
        </h1>
        <p className="hero__role">
          <TypeCycle words={profile.roles} />
        </p>
        <p className="hero__lede">{profile.headline}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={profile.links.dataforge} target="_blank" rel="noreferrer">
            Launch DataForge
          </a>
          <a className="btn btn--ghost" href="#lab">
            How I build
          </a>
        </div>
        <ul className="hero__meta">
          <li>
            <span>Gold jobs</span>
            <strong>{jobs}</strong>
          </li>
          <li>
            <span>Signal</span>
            <strong>{last ? `${last.type} · ${timeAgo(last.created_at)}` : "ritesh8303"}</strong>
          </li>
          <li>
            <span>Status</span>
            <strong>Available</strong>
          </li>
        </ul>
      </motion.div>

      <motion.aside
        className="model-card glass"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
      >
        <header>
          <span className="pulse pulse--on" />
          <div>
            <p>ritesh-v1</p>
            <em>inference · this page</em>
          </div>
        </header>
        <dl>
          <div>
            <dt>context</dt>
            <dd>live APIs · resume graph</dd>
          </div>
          <div>
            <dt>tools</dt>
            <dd>DataForge · GitHub · mail</dd>
          </div>
          <div>
            <dt>region</dt>
            <dd>eu-central-1 · Berlin</dd>
          </div>
          <div>
            <dt>output</dt>
            <dd>thesis · Werkstudent · intern</dd>
          </div>
        </dl>
        <p className="model-card__hint">
          Press <kbd>Ctrl</kbd>
          <kbd>K</kbd> or tap Ask
        </p>
      </motion.aside>
    </section>
  );
}

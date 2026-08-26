import { motion } from "framer-motion";
import { type MouseEvent, type ReactNode, useRef } from "react";
import { projects } from "../data/profile";

function Tilt({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "rotateX(0) rotateY(0)";
  };

  return (
    <motion.article
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.article>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section className="section" id="work">
      <div className="section__head">
        <p className="eyebrow">Selected work</p>
        <h2>Systems you can click, not just slide decks.</h2>
      </div>
      {featured && (
        <Tilt className="glass project project--feature">
          <div>
            <p className="project__tag">{featured.tag}</p>
            <h3>{featured.title}</h3>
            <p>{featured.blurb}</p>
            <ul>
              {featured.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="project__links">
              {featured.live && (
                <a className="btn btn--primary" href={featured.live} target="_blank" rel="noreferrer">
                  Live dashboard
                </a>
              )}
              <a className="btn btn--ghost" href={featured.code} target="_blank" rel="noreferrer">
                Source
              </a>
            </div>
          </div>
          <div className="project__stack">
            <p>{featured.period}</p>
            <div className="chips">
              {featured.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Tilt>
      )}
      <div className="project-grid">
        {rest.map((p) => (
          <Tilt key={p.title} className="glass project">
            <p className="project__tag">{p.tag}</p>
            <h3>{p.title}</h3>
            <p>{p.blurb}</p>
            <div className="chips">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            <a href={p.code} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

import { experience, skills } from "../data/profile";

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="split">
        <div>
          <p className="eyebrow">Path</p>
          <h2>From research QA to AI-ready platforms.</h2>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.org} className="glass">
                <p className="timeline__period">{job.period}</p>
                <h3>
                  {job.title}
                  <span>
                    {job.org} · {job.place}
                  </span>
                </h3>
                <ul>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="eyebrow">Stack</p>
          <h2>Tools I ship with.</h2>
          <div className="skill-grid">
            {skills.map((g) => (
              <article key={g.group} className="glass">
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

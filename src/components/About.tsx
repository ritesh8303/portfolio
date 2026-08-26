import { motion } from "framer-motion";
import { certs, education, languages, profile } from "../data/profile";

export function About() {
  return (
    <section className="section" id="about">
      <div className="about">
        <motion.div
          className="about__portrait"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <img src={profile.avatar} alt={profile.name} />
          <div className="about__badge">
            <span className="pulse pulse--on" />
            {profile.location}
          </div>
        </motion.div>
        <div>
          <p className="eyebrow">About</p>
          <h2>AI-era builder. Warehouse-first.</h2>
          <p className="lede">{profile.summary}</p>
          <p className="body">
            Models are cheap. Trusted data is not. I care about contracts at ingest, history you can audit, and agents that
            read the same Gold layer a human would. DataForge is the proof: five feeds, Pydantic gates, SCD Type 2, twelve
            Gold datasets, Terraform, CI — still inside the AWS Free Tier.
          </p>
          <div className="chips">
            {certs.map((c) => (
              <span key={c} className="chip">
                {c.replace("AWS Academy Graduate — ", "AWS · ")}
              </span>
            ))}
            {languages.map((l) => (
              <span key={l.name} className="chip">
                {l.name} · {l.level}
              </span>
            ))}
          </div>
          <div className="edu">
            {education.map((e) => (
              <article key={e.school}>
                <h3>{e.degree}</h3>
                <p>
                  {e.school} · {e.place}
                </p>
                <em>
                  {e.period} — {e.note}
                </em>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

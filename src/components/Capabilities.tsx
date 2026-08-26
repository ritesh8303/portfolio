const ITEMS = [
  {
    k: "01",
    title: "Pipelines that actually run",
    body: "Four times a day, five European feeds, serverless medallion — not a notebook you demo once.",
  },
  {
    k: "02",
    title: "Quality before the model",
    body: "Contracts at ingest. If the warehouse is wrong, the agent is theatre. Schema gates are live on this page.",
  },
  {
    k: "03",
    title: "AI on Gold, not vibes",
    body: "Retrieval and enrichment only where a human can audit the same table. Thesis-shaped work, production habits.",
  },
  {
    k: "04",
    title: "Cheap enough to keep on",
    body: "Terraform + Free Tier + CI. A system that dies when the credit card is removed is not a system.",
  },
];

export function Capabilities() {
  return (
    <section className="section" id="lab">
      <div className="section__head">
        <p className="eyebrow">Operating system</p>
        <h2>Built for the AI era — grounded in a warehouse you can trust.</h2>
      </div>
      <div className="bento">
        {ITEMS.map((item) => (
          <article key={item.k} className="glass bento__card">
            <span>{item.k}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

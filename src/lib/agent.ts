export type AgentHit = { title: string; body: string };

const KB: { keys: string[]; title: string; body: string }[] = [
  {
    keys: ["who", "about", "yourself", "profile", "intro"],
    title: "Who I am",
    body: "Ritesh Rakesh Jadhav — M.Sc. Data Science at the University of Europe for Applied Sciences in Potsdam. I build serverless AWS pipelines and automated data quality. Based in Berlin. Open for a company Master's thesis, Werkstudent, or internship.",
  },
  {
    keys: ["dataforge", "lakehouse", "jobs", "pipeline", "gold", "bronze"],
    title: "DataForge",
    body: "DataForge is my live European job-intelligence lakehouse. Five sources (BA Jobsuche, EURES, Arbeitnow, ATS, Berlin startups) land in Bronze, get SCD Type 2 history in Silver, and publish Gold analytics plus REST APIs. It runs 4× daily on Lambda / S3 / EventBridge, with Pydantic gates, Terraform, and GitHub Actions — still on the AWS Free Tier. Live dashboard: ritesh8303.github.io/dataforge",
  },
  {
    keys: ["quality", "pydantic", "scd", "validation", "audit"],
    title: "Data quality",
    body: "I treat quality as a contract, not a dashboard afterthought. Pydantic rejects malformed payloads before Bronze. Silver keeps an SCD Type 2 audit trail (create / update / expire). Gold includes completeness, uniqueness, freshness, and schema-pass metrics that the portfolio reads live from the Metrics API.",
  },
  {
    keys: ["aws", "cloud", "lambda", "terraform", "stack", "tech"],
    title: "Stack",
    body: "AWS: Lambda, S3, EventBridge, API Gateway, RDS PostgreSQL, CloudWatch, SNS, SQS DLQ. Python, Pandas, SQL, DuckDB. IaC with Terraform. CI with GitHub Actions and Moto. Analytics in Power BI / Streamlit. Building toward LangChain, RAG, and agents on top of real warehouse data — not toy notebooks.",
  },
  {
    keys: ["thesis", "werkstudent", "intern", "hire", "available", "open"],
    title: "Availability",
    body: "Open now for a 6-month company Master's thesis, a Werkstudent role (≤20h/week), or an internship in Germany. Strongest fit: data engineering, data quality, cloud data platforms, or AI engineering that sits on real pipelines. Non-EU student visa in Germany.",
  },
  {
    keys: ["experience", "jp", "research", "marva", "work"],
    title: "Experience",
    body: "Data Scientist at JP Research India (Jan–Jun 2024): Python pipelines that automated 15+ hours of weekly QA, Power BI health dashboards, anomaly detection on crash-research data. AI/CV intern at Marva.AI (Jun–Aug 2023): OpenCV face-recognition workflows and model validation.",
  },
  {
    keys: ["education", "university", "degree", "potsdam", "study"],
    title: "Education",
    body: "M.Sc. Data Science, University of Europe for Applied Sciences, Potsdam (since Mar 2025). B.Sc. Data Science, Symbiosis Skills and Professional University, Pune (2021–2024). AWS Academy: Cloud Data Pipeline Builder + Data Engineering.",
  },
  {
    keys: ["contact", "email", "phone", "linkedin", "github"],
    title: "Contact",
    body: "Email riteshjadhav359@gmail.com · +49 176 22920991 · LinkedIn riteshjadhav8303 · GitHub ritesh8303. Berlin / Potsdam.",
  },
  {
    keys: ["mulank", "infinity", "saturn", "numerology", "number 8"],
    title: "Mulank 8",
    body: "Mulank 8 is mine — Saturn, cycles, systems that keep running. On this site it shows up as ∞: the loop around the neural core, under the 3D twin, and in the nav. Same idea as a pipeline: ingest, gold, repeat.",
  },
  {
    keys: ["ai", "llm", "agent", "rag", "langchain", "ml"],
    title: "AI direction",
    body: "I am not a prompt-only profile. The thesis I want sits on DataForge: retrieval over live job data, LLM enrichment with evals, or AI-ready data quality. Computer vision internship at Marva.AI plus a multilingual medical-report summarization project. Agents only earn a place if they read the same Gold layer a human would trust.",
  },
];

export const SUGGESTIONS = [
  "What is DataForge?",
  "Are you open for a thesis?",
  "What is your AWS stack?",
  "How do you handle data quality?",
];

export function answerPrompt(q: string): AgentHit {
  const n = q.toLowerCase();
  const scored = KB.map((row) => ({
    row,
    score: row.keys.reduce((s, k) => s + (n.includes(k) ? 1 : 0), 0),
  })).sort((a, b) => b.score - a.score);

  if (scored[0].score === 0) {
    return {
      title: "Try a sharper prompt",
      body: "I retrieve locally from this page — no cloud LLM. Ask about DataForge, AWS, data quality, thesis / Werkstudent, experience, or how to contact me.",
    };
  }
  return { title: scored[0].row.title, body: scored[0].row.body };
}

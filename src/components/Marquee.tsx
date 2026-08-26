const TOKENS = [
  "Python",
  "AWS Lambda",
  "Pydantic",
  "SCD Type 2",
  "Terraform",
  "LangChain",
  "RAG",
  "Agents",
  "SQL",
  "DuckDB",
  "EventBridge",
  "API Gateway",
  "GitHub Actions",
  "OpenCV",
  "Streamlit",
  "Power BI",
  "eu-central-1",
  "Gold layer",
];

export function Marquee() {
  const loop = [...TOKENS, ...TOKENS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((t, i) => (
          <span key={`${t}-${i}`}>
            <i />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

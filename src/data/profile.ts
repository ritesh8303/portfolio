export const profile = {
  name: "Ritesh Rakesh Jadhav",
  shortName: "Ritesh Jadhav",
  monogram: "RJ",
  role: "Data Engineer",
  location: "Berlin / Potsdam, Germany",
  timezone: "Europe/Berlin",
  email: "riteshjadhav359@gmail.com",
  phone: "+49 176 22920991",
  availability: "Open for Master's thesis · Werkstudent · internship",
  summary:
    "M.Sc. Data Science student in Berlin building production-style AWS pipelines, automated data quality, and AI that sits on a warehouse you can audit. Creator of DataForge — a live European job-intelligence lakehouse.",
  headline:
    "I ship live data systems — and the quality layer that keeps AI from hallucinating the warehouse.",
  roles: [
    "Data Engineer",
    "AI Systems Builder",
    "Data Quality × Pipelines",
    "M.Sc. Thesis Candidate",
  ],
  links: {
    github: "https://github.com/ritesh8303",
    linkedin: "https://linkedin.com/in/riteshjadhav8303",
    dataforge: "https://ritesh8303.github.io/dataforge/",
    dataforgeCode: "https://github.com/ritesh8303/dataforge",
  },
  avatar: `${import.meta.env.BASE_URL}avatar.jpg`,
  avatar3d: `${import.meta.env.BASE_URL}avatar-3d.png`,
};

export const education = [
  {
    school: "University of Europe for Applied Sciences",
    place: "Potsdam, Germany",
    degree: "M.Sc. Data Science",
    period: "Mar 2025 — Present",
    note: "Thesis-ready in data quality, pipeline optimization, or AI engineering.",
  },
  {
    school: "Symbiosis Skills and Professional University",
    place: "Pune, India",
    degree: "B.Sc. Data Science",
    period: "2021 — 2024",
    note: "Statistics, Python, and data modeling.",
  },
];

export const experience = [
  {
    title: "Data Scientist",
    org: "JP Research India Private Limited",
    place: "Pune, India",
    period: "Jan 2024 — Jun 2024",
    points: [
      "Built Python pipelines that automated 15+ hours of manual quality checks each week.",
      "Shipped Power BI dashboards for data-health metrics on crash and road-safety research data.",
      "Ran statistical analysis and anomaly detection across complex research datasets.",
    ],
  },
  {
    title: "AI / Computer Vision Intern",
    org: "Marva.AI",
    place: "Pune, India",
    period: "Jun 2023 — Aug 2023",
    points: [
      "Applied Python and OpenCV to face-recognition workflows in a live product setting.",
      "Supported model validation through iterative testing with the product team.",
    ],
  },
];

export const projects = [
  {
    featured: true,
    title: "DataForge",
    tag: "Live production system",
    period: "Apr 2026 — Present",
    blurb:
      "Serverless medallion lakehouse ingesting 10,000+ European job records from five sources, four times a day, with Pydantic gates, SCD Type 2 history, Terraform, and a live dashboard.",
    stack: ["AWS Lambda", "S3", "EventBridge", "API Gateway", "Terraform", "Python", "Pydantic"],
    live: "https://ritesh8303.github.io/dataforge/",
    code: "https://github.com/ritesh8303/dataforge",
    highlights: [
      "Bronze → Silver → Gold on AWS Free Tier",
      "SCD Type 2 audit trail for job create / update / expire",
      "Automated completeness, uniqueness, and freshness report",
    ],
  },
  {
    featured: false,
    title: "Dubai Real Estate Investor Insights",
    tag: "Analytics dashboard",
    period: "2026",
    blurb:
      "Streamlit dashboard turning property market data into investor-facing insights — filters, KPIs, and visual exploration.",
    stack: ["Python", "Streamlit", "Pandas"],
    live: null,
    code: "https://github.com/ritesh8303/Dubai-Real-Estate-Investor-Insights-Dashboard",
    highlights: [],
  },
  {
    featured: false,
    title: "DC Bike Rental Forecast",
    tag: "ML + Streamlit",
    period: "2025",
    blurb:
      "Interactive demand model for Capital Bikeshare-style rentals, with weather and calendar features in a Streamlit app.",
    stack: ["Python", "Streamlit", "scikit-learn"],
    live: null,
    code: "https://github.com/ritesh8303/DC_Bike_Rental_Streamlit.py",
    highlights: [],
  },
  {
    featured: false,
    title: "Data Science Salaries Explorer",
    tag: "Market analytics",
    period: "2025",
    blurb:
      "Salary-market explorer for data roles — compensation vs. experience, location, and job family.",
    stack: ["Python", "Streamlit", "Pandas"],
    live: null,
    code: "https://github.com/ritesh8303/Data-Science-Salaries-streamlit",
    highlights: [],
  },
];

export const skills = [
  {
    group: "Data quality",
    items: ["Pydantic contracts", "Pytest", "SCD Type 2", "Completeness / uniqueness / freshness"],
  },
  {
    group: "Cloud · AWS",
    items: ["Lambda", "S3", "EventBridge", "API Gateway", "RDS PostgreSQL", "CloudWatch", "SNS", "SQS DLQ"],
  },
  {
    group: "Engineering",
    items: ["Python", "Pandas", "SQL", "DuckDB", "Terraform", "GitHub Actions", "Power BI"],
  },
  {
    group: "AI · agents",
    items: ["LangChain / RAG (building)", "Agents on Gold data", "OpenCV", "Anomaly detection", "Streamlit"],
  },
];

export const certs = [
  "AWS Academy Graduate — Cloud Data Pipeline Builder",
  "AWS Academy Graduate — Data Engineering",
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "German", level: "A2" },
];

export const METRICS_API =
  "https://2aww80hwgj.execute-api.eu-central-1.amazonaws.com/";
export const GITHUB_USER = "ritesh8303";

import { useEffect, useState } from "react";
import { InfinityMark } from "./InfinityMark";

const LINES = [
  "loading ritesh-v1 · local weights",
  "retrieving gold layer · eu-central-1",
  "compiling neural field",
  "agent ready · ctrl/k to prompt",
];

export function Loader({ ready }: { ready: boolean }) {
  const [step, setStep] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => Math.min(s + 1, LINES.length));
    }, 260);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!ready || step < LINES.length) return;
    const t = window.setTimeout(() => setHide(true), 380);
    return () => window.clearTimeout(t);
  }, [ready, step]);

  if (hide) return null;

  return (
    <div className={`loader ${ready && step >= LINES.length ? "loader--out" : ""}`}>
      <div className="loader__brand">
        <InfinityMark className="loader__inf" />
        <div className="loader__mark">RJ</div>
      </div>
      <div className="loader__bar">
        <i style={{ width: `${((step + (ready ? 1 : 0)) / (LINES.length + 1)) * 100}%` }} />
      </div>
      <ul className="loader__log">
        {LINES.slice(0, step).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="loader__hint">{ready && step >= LINES.length ? "READY" : "SAMPLING"}</p>
    </div>
  );
}

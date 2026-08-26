import { FormEvent, useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { answerPrompt, SUGGESTIONS } from "../lib/agent";

type Msg = { role: "user" | "assistant"; text: string; title?: string };

const COMMANDS = [
  { id: "chat", label: "Ask the agent", hint: "Local retrieval over this page", run: "chat" as const },
  { id: "work", label: "Open work", hint: "#work", href: "#work" },
  { id: "live", label: "Live telemetry", hint: "DataForge API", href: "#live" },
  { id: "forge", label: "Launch DataForge", hint: "eu-central-1", href: profile.links.dataforge, ext: true },
  { id: "mail", label: "Email Ritesh", hint: profile.email, href: `mailto:${profile.email}` },
  { id: "git", label: "GitHub", hint: "ritesh8303", href: profile.links.github, ext: true },
];

function sleep(ms: number) {
  return new Promise((r) => window.setTimeout(r, ms));
}

export function Agent() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"command" | "chat">("command");
  const [query, setQuery] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      title: "ritesh-v1",
      text: "Local agent. I retrieve from this portfolio — DataForge, stack, thesis fit, contact. No API key, no cloud model.",
    },
  ]);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMode("command");
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onAsk = () => {
      setMode("chat");
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-agent", onAsk);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-agent", onAsk);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => input.current?.focus(), 40);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open, mode]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const ask = async (prompt: string) => {
    const q = prompt.trim();
    if (!q || busy) return;
    setMode("chat");
    setQuery("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setBusy(true);
    const hit = answerPrompt(q);
    await sleep(280);
    let out = "";
    setMsgs((m) => [...m, { role: "assistant", title: hit.title, text: "" }]);
    for (const ch of hit.body) {
      out += ch;
      const snapshot = out;
      setMsgs((m) => {
        const next = [...m];
        next[next.length - 1] = { role: "assistant", title: hit.title, text: snapshot };
        return next;
      });
      await sleep(8);
    }
    setBusy(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "chat") {
      void ask(query);
      return;
    }
    const hit = COMMANDS.find((c) => c.label.toLowerCase().includes(query.toLowerCase())) ?? COMMANDS[0];
    runCommand(hit.id);
  };

  const runCommand = (id: string) => {
    const cmd = COMMANDS.find((c) => c.id === id);
    if (!cmd) return;
    if (cmd.run === "chat") {
      setMode("chat");
      setQuery("");
      return;
    }
    if (cmd.ext && cmd.href) {
      window.open(cmd.href, "_blank", "noreferrer");
      setOpen(false);
      return;
    }
    if (cmd.href?.startsWith("mailto:")) {
      window.location.href = cmd.href;
      setOpen(false);
      return;
    }
    if (cmd.href) {
      document.querySelector(cmd.href)?.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const filtered = COMMANDS.filter((c) =>
    `${c.label} ${c.hint}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <button className="agent-fab" type="button" onClick={() => { setMode("chat"); setOpen(true); }}>
        <span className="agent-fab__orb" />
        Ask
      </button>

      {open && (
        <div className="agent-scrim" onClick={() => setOpen(false)}>
          <div className="agent glass" role="dialog" aria-label="Portfolio agent" onClick={(e) => e.stopPropagation()}>
            <header className="agent__bar">
              <div>
                <p>ritesh-v1</p>
                <span>local retrieval · no GPU</span>
              </div>
              <div className="agent__modes">
                <button type="button" className={mode === "command" ? "is-on" : ""} onClick={() => setMode("command")}>
                  Commands
                </button>
                <button type="button" className={mode === "chat" ? "is-on" : ""} onClick={() => setMode("chat")}>
                  Agent
                </button>
              </div>
            </header>

            {mode === "chat" && (
              <div className="agent__log" ref={log}>
                {msgs.map((m, i) => (
                  <article key={`${m.role}-${i}`} className={`bubble bubble--${m.role}`}>
                    {m.title && <p className="bubble__k">{m.title}</p>}
                    <p>{m.text}{busy && i === msgs.length - 1 && m.role === "assistant" ? "▍" : ""}</p>
                  </article>
                ))}
                <div className="agent__hints">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => void ask(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === "command" && (
              <ul className="agent__cmds">
                {filtered.map((c) => (
                  <li key={c.id}>
                    <button type="button" onClick={() => runCommand(c.id)}>
                      <strong>{c.label}</strong>
                      <span>{c.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <form className="agent__input" onSubmit={onSubmit}>
              <span>{mode === "chat" ? "›" : "/"}</span>
              <input
                ref={input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={mode === "chat" ? "Ask about DataForge, thesis, stack…" : "Jump to a command"}
                autoComplete="off"
              />
              <kbd>esc</kbd>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

import { FormEvent, useState } from "react";
import { profile } from "../data/profile";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="section" id="contact">
      <div className="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let’s build the next pipeline together.</h2>
          <p className="lede">{profile.availability}</p>
          <ul className="contact__links">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <form className="glass form" onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" required autoComplete="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
          </label>
          <label>
            Message
            <textarea name="message" required rows={5} placeholder="Thesis, Werkstudent, or a pipeline you want to talk about…" />
          </label>
          <button className="btn btn--primary" type="submit">
            {sent ? "Opening mail client…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { InfinityMark } from "./InfinityMark";
import { profile } from "../data/profile";

const LINKS = [
  { href: "#lab", label: "System" },
  { href: "#live", label: "Live" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openAgent = () => window.dispatchEvent(new Event("open-agent"));

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <a className="nav__brand" href="#top">
        <span>{profile.monogram}</span>
        <strong>{profile.shortName}</strong>
        <InfinityMark className="nav__inf" />
      </a>
      <nav className="nav__links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav__end">
        <button className="nav__cmd" type="button" onClick={openAgent}>
          Ask <kbd>Ctrl K</kbd>
        </button>
        <a className="nav__cta" href={`mailto:${profile.email}`}>
          Hire
        </a>
      </div>
    </header>
  );
}

import { InfinityMark } from "./InfinityMark";
import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p className="footer__loop">
        <InfinityMark className="footer__inf" />
        Neural scene · local agent · live DataForge gold · Berlin
      </p>
    </footer>
  );
}

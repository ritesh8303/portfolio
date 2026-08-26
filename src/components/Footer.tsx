import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p>Neural scene · local agent · live DataForge gold · Berlin</p>
    </footer>
  );
}

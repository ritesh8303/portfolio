import { useEffect, useState } from "react";
import { berlinNow } from "../lib/format";

export function useBerlinClock() {
  const [clock, setClock] = useState(berlinNow);

  useEffect(() => {
    const id = window.setInterval(() => setClock(berlinNow()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return clock;
}

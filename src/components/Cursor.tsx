import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useMedia";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mobile) return;
    const onMove = (e: MouseEvent) => {
      setVisible(true);
      const x = e.clientX;
      const y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mobile]);

  if (mobile) return null;

  return (
    <>
      <div ref={ring} className={`cursor cursor--ring ${visible ? "is-on" : ""}`} />
      <div ref={dot} className={`cursor cursor--dot ${visible ? "is-on" : ""}`} />
    </>
  );
}

import { About } from "./components/About";
import { Agent } from "./components/Agent";
import { Capabilities } from "./components/Capabilities";
import { Contact } from "./components/Contact";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Loader } from "./components/Loader";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Scene } from "./components/scene/Scene";
import { Telemetry } from "./components/Telemetry";
import { useLiveData } from "./hooks/useLiveData";
import { useState } from "react";

export default function App() {
  const live = useLiveData();
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Cursor />
      <Scene onReady={() => setSceneReady(true)} />
      <div className="aurora" />
      <Loader ready={sceneReady} />
      <div className="grain" />
      <Nav />
      <main>
        <Hero live={live} />
        <Marquee />
        <Capabilities />
        <Telemetry live={live} />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Agent />
    </>
  );
}

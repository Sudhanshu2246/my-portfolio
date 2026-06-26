"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader/Loader";

const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll"),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/cursor/CustomCursor"),
  { ssr: false }
);
const GrainBackground = dynamic(
  () => import("@/components/background/GrainBackground"),
  { ssr: false }
);
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
const Hero = dynamic(() => import("@/components/hero/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/about/About"), { ssr: false });
const Experience = dynamic(
  () => import("@/components/experience/Experience"),
  { ssr: false }
);
const Projects = dynamic(() => import("@/components/projects/Projects"), {
  ssr: false,
});
const TechStack = dynamic(() => import("@/components/tech-stack/TechStack"), {
  ssr: false,
});
const Skills = dynamic(() => import("@/components/skills/Skills"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/contact/Contact"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <SmoothScroll>
        <CustomCursor />
        <GrainBackground />
        <Navbar />

        {/* Horizontal scroll container — each panel is 100vw × 100vh */}
        <main
          className="h-scroll-container"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            height: "100vh",
            width: "fit-content",
            overflowY: "hidden",
          }}
        >
          <section id="home"       className="h-panel"><Hero /></section>
          <section id="about"      className="h-panel"><About /></section>
          <section id="experience" className="h-panel"><Experience /></section>
          <section id="projects"   className="h-panel"><Projects /></section>
          <section id="techstack"  className="h-panel"><TechStack /></section>
          <section id="skills"     className="h-panel"><Skills /></section>
          <section id="contact"    className="h-panel"><Contact /></section>
        </main>
      </SmoothScroll>
    </>
  );
}

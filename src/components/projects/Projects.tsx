"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { PROJECTS, type Project } from "@/lib/constants";
import { usePanels } from "@/lib/panelContext";

// ── Detail Modal ─────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5,5,5,0.88)", backdropFilter: "blur(12px)" }}
      />
      <div
        data-inner-scroll
        data-modal
        className="relative z-10 w-full max-w-[90vw] md:max-w-4xl mt-12 md:mt-20 overflow-hidden rounded-3xl p-8 md:p-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white z-50"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="mb-2 text-[11px] uppercase tracking-[0.3em]" style={{ color: "#8F8F8F" }}>
          {project.category}
        </div>
        <h3 className="font-display text-[32px] font-bold" style={{ color: project.color }}>
          {project.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#8F8F8F" }}>
          {project.shortDescription}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: "#8F8F8F", opacity: 0.5 }}>Problem</div>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(143,143,143,0.8)" }}>{project.problem}</p>
          </div>
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: "#8F8F8F", opacity: 0.5 }}>Solution</div>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(143,143,143,0.8)" }}>{project.solution}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 text-[10px] uppercase tracking-[0.2em]" style={{ color: "#8F8F8F", opacity: 0.5 }}>Key Features</div>
          <div className="flex flex-wrap gap-2">
            {project.keyFeatures.map((f) => (
              <span key={f} className="rounded-full px-3 py-1 text-[11px]" style={{ background: `${project.color}10`, border: `1px solid ${project.color}25`, color: project.color }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 text-[10px] uppercase tracking-[0.2em]" style={{ color: "#8F8F8F", opacity: 0.5 }}>Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="rounded-full border px-3 py-1 text-[11px]" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#8F8F8F" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: "#8F8F8F", opacity: 0.5 }}>Impact</div>
          {project.performance.map((p) => (
            <div key={p} className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(143,143,143,0.8)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.color }} />
              {p}
            </div>
          ))}
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: project.color }}>{project.results}</p>
        </div>

        <div className="mt-6 flex gap-3">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
              className="rounded-full px-5 py-2.5 text-[12px] font-medium text-[#050505] transition-all"
              style={{ background: `linear-gradient(135deg, #C86414, #00E5A8)` }}>
              Live Demo →
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              className="rounded-full border px-5 py-2.5 text-[12px] font-medium text-white transition-all hover:border-white/30"
              style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  total,
  onClick,
}: {
  project: Project;
  index: number;
  total: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="project-card group relative flex h-full w-[340px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-2 md:w-[380px]"
      style={{
        background: "#0D0D0D",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onClick={onClick}
    >
      {/* Image — top 55% */}
      <div className="relative w-full overflow-hidden" style={{ height: "55%" }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="400px"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, rgba(13,13,13,0.95) 100%)`,
          }}
        />
        {/* Status badge */}
        {project.status && (
          <span
            className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: "rgba(0,229,168,0.15)",
              border: "1px solid rgba(0,229,168,0.3)",
              color: "#00E5A8",
            }}
          >
            {project.status}
          </span>
        )}
        {/* Counter */}
        <span className="absolute left-3 top-3 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Content — bottom 45% */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-1 text-[10px] uppercase tracking-[0.25em]" style={{ color: "#8F8F8F", opacity: 0.6 }}>
            {project.category}
          </div>
          <h3
            className="font-display text-[22px] font-bold leading-tight"
            style={{ color: project.color }}
          >
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed" style={{ color: "rgba(143,143,143,0.75)" }}>
            {project.shortDescription}
          </p>
        </div>

        <div>
          {/* Tech tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider"
                style={{
                  background: `${project.color}0D`,
                  border: `1px solid ${project.color}20`,
                  color: project.color,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[12px] font-semibold uppercase tracking-widest text-[#050505] transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${project.color} 0%, #00E5A8 100%)`,
            }}
          >
            View Details
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Projects panel ───────────────────────────────────────────────────────
export default function Projects() {
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const { currentPanel } = usePanels();
  const animated = useRef(false);

  // Entrance animation
  useEffect(() => {
    if (currentPanel !== 3 || animated.current) return;
    animated.current = true;

    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        x: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, panelRef);
    return () => ctx.revert();
  }, [currentPanel]);

  // Drag-to-scroll on the cards track
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <div
        ref={panelRef}
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{ background: "#050505" }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,100,20,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex-shrink-0 px-12 pt-20 pb-8 md:px-20 lg:px-32">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "#C86414" }}>
            Engineering Case Studies
          </div>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-[42px] font-bold uppercase leading-[0.9] tracking-tight text-white md:text-[64px]">
              Projects
            </h2>
            <p className="hidden max-w-xs text-[14px] leading-relaxed md:block" style={{ color: "#8F8F8F" }}>
              Drag to explore — click any card for full details
            </p>
          </div>
          {/* Gradient line */}
          <div
            className="mt-6 h-px"
            style={{
              background: "linear-gradient(90deg, #C86414, #00E5A8 50%, transparent)",
            }}
          />
        </div>

        {/* Scrollable card track */}
        <div
          ref={trackRef}
          data-inner-scroll
          className="relative z-10 flex flex-1 items-center gap-5 overflow-x-auto px-12 pb-8 md:px-20 lg:px-32"
          style={{
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflowY: "hidden",
          }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={PROJECTS.length}
              onClick={() => setActiveProject(project)}
            />
          ))}

          {/* Right fade padding */}
          <div className="w-8 shrink-0" />
        </div>

        {/* Scroll hint dots */}
        <div className="relative z-10 mb-8 flex items-center justify-center gap-2">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === 0 ? "24px" : "8px",
                background:
                  i === 0
                    ? "linear-gradient(90deg, #C86414, #00E5A8)"
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

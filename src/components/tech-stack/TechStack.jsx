"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";
import { usePanels } from "@/lib/panelContext";
// Devicon CDN base URL
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const DEVICON_MAP = {
    // Frontend
    "React": { slug: "react", variant: "original" },
    "Next.js": { slug: "nextjs", variant: "original" },
    "JavaScript": { slug: "javascript", variant: "original" },
    "Tailwind CSS": { slug: "tailwindcss", variant: "original" },
    "React Query": { url: "https://cdn.simpleicons.org/reactquery/white" },
    "GSAP": { url: "https://cdn.simpleicons.org/gsap/white" },
    "Framer Motion": { url: "https://cdn.simpleicons.org/framer/white" },
    "Redux-Toolkit": { slug: "redux", variant: "original" }, // uses standard redux logo
    "Context API": { url: "https://api.iconify.design/logos/react.svg" }, // react logo for context API
    "React Hook Form": { url: "https://cdn.simpleicons.org/reacthookform/white" },
    "Bootstrap": { slug: "bootstrap", variant: "original" },
    "HTML5": { slug: "html5", variant: "original" },
    "CSS3": { slug: "css3", variant: "original" },
    // Backend
    "Node.js": { slug: "nodejs", variant: "original" },
    "Express.js": { slug: "express", variant: "original" },
    "Socket.io": { slug: "socketio", variant: "original" },
    "REST APIs": { url: "https://api.iconify.design/material-symbols/api.svg" },
    "WebSockets": { url: "https://api.iconify.design/mdi/web.svg" },
    // Database
    "MongoDB": { slug: "mongodb", variant: "original" },
    "PostgreSQL": { slug: "postgresql", variant: "original" },
    "Redis": { slug: "redis", variant: "original" },
    "Elasticsearch": { slug: "elasticsearch", variant: "original" },
    "Prisma": { url: "https://cdn.simpleicons.org/prisma/white" },
    // DevOps
    "AWS": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    "Docker": { slug: "docker", variant: "original" },
    "CI/CD": { url: "https://cdn.simpleicons.org/githubactions/white" },
    "Nginx": { slug: "nginx", variant: "original" },
    // Tools
    "Postman": { url: "https://cdn.simpleicons.org/postman/white" },
    "Mongo DB Compass": { url: "https://cdn.simpleicons.org/mongodb/white" },
    "VS Code": { slug: "vscode", variant: "original" },
    "GitHub": { slug: "github", variant: "original" },
};
// Accent colors per category
const CATEGORY_COLORS = {
    Frontend: "#00E5A8",
    Backend: "#C86414",
    Database: "#7DF9FF",
    DevOps: "#E8963C",
    Tools: "#B151FF",
};
const CATEGORIES = ["All", ...Object.keys(TECH_STACK)];
// ── Letter Avatar (fallback) ──────────────────────────────────────────────────
function LetterAvatar({ name, color }) {
    const letters = name
        .split(/[\s.\/]+/)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .slice(0, 2)
        .join("");
    return (<div className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-[18px] font-bold text-white" style={{
            background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
            border: `1px solid ${color}30`,
        }}>
      {letters}
    </div>);
}
// ── Tech Card ─────────────────────────────────────────────────────────────────
function TechCard({ tech, category, index, dragConstraints, onDragEnd, position, setRef, }) {
    const innerRef = useRef(null);
    const iconInfo = DEVICON_MAP[tech];
    const accentColor = CATEGORY_COLORS[category] ?? "#00E5A8";
    const [imgError, setImgError] = useState(false);
    // Reset error state if the icon URL changes
    const prevIconInfo = useRef(iconInfo);
    if (prevIconInfo.current !== iconInfo) {
        setImgError(false);
        prevIconInfo.current = iconInfo;
    }
    // Individual float animation - target the inner div so it doesn't conflict with framer-motion
    useEffect(() => {
        if (!innerRef.current)
            return;
        const delay = (index % 7) * 0.4;
        const duration = 2.6 + (index % 5) * 0.35;
        const tween = gsap.to(innerRef.current, {
            y: index % 2 === 0 ? -6 : 6,
            duration,
            delay,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });
        return () => { tween.kill(); };
    }, [index]);
    return (<motion.div layout ref={setRef} drag dragConstraints={dragConstraints} dragMomentum={false} dragElastic={0} onDragEnd={(e, info) => onDragEnd(tech, info)} animate={{ x: position?.x || 0, y: position?.y || 0 }} whileDrag={{ scale: 1.1, zIndex: 50 }} className="tech-card touch-none" style={{ zIndex: 10, position: "relative" }}>
      <div ref={innerRef} className="group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl p-4 transition-transform duration-300 hover:scale-110" style={{
            width: "100px",
            height: "100px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
        }}>
        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100" style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${accentColor}18 0%, transparent 70%)`,
            boxShadow: `0 0 0 1px ${accentColor}25`,
        }}/>

        {/* Icon */}
        <div className="relative flex h-12 w-12 items-center justify-center pointer-events-none">
          {iconInfo && !imgError ? (<img src={"url" in iconInfo
                ? iconInfo.url
                : `${DEVICON_BASE}/${iconInfo.slug}/${iconInfo.slug}-${iconInfo.variant}.svg`} alt={tech} width={48} height={48} className="h-12 w-12 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_10px_var(--glow)]" style={{ "--glow": accentColor }} onError={() => setImgError(true)}/>) : (<LetterAvatar name={tech} color={accentColor}/>)}
        </div>

        {/* Name */}
        <div className="w-full text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] transition-colors duration-300 group-hover:text-white pointer-events-none" style={{ color: "rgba(143,143,143,0.7)" }}>
          {tech}
        </div>

        {/* Category dot */}
        <div className="h-1 w-1 rounded-full pointer-events-none" style={{ background: accentColor, opacity: 0.5 }}/>
      </div>
    </motion.div>);
}
// ── Main TechStack panel ──────────────────────────────────────────────────────
export default function TechStack() {
    const panelRef = useRef(null);
    const canvasRef = useRef(null);
    const cardRefs = useRef({});
    const [activeCategory, setActiveCategory] = useState("All");
    const [positions, setPositions] = useState({});
    const [techItems, setTechItems] = useState([]);
    const { currentPanel } = usePanels();
    const animated = useRef(false);
    
    // Update techItems when category changes
    useEffect(() => {
        const initialTechs = activeCategory === "All"
            ? Object.entries(TECH_STACK).flatMap(([cat, items]) => items.map((tech) => ({ tech, category: cat })))
            : (TECH_STACK[activeCategory] ?? []).map((tech) => ({ tech, category: activeCategory }));
        setTechItems(initialTechs);
        setPositions({}); // reset drag offsets
    }, [activeCategory]);
    const handleDragEnd = (tech, info) => {
        const card = cardRefs.current[tech];
        if (!card)
            return;
        const cardRect = card.getBoundingClientRect();
        let swappedWith = null;
        // Check for collisions with other cards
        for (const [otherTech, otherCard] of Object.entries(cardRefs.current)) {
            if (tech === otherTech || !otherCard)
                continue;
            // Ensure the other tech is currently visible
            if (!techItems.some(t => t.tech === otherTech))
                continue;
            const otherRect = otherCard.getBoundingClientRect();
            // Calculate intersection area
            const overlapX = Math.max(0, Math.min(cardRect.right, otherRect.right) - Math.max(cardRect.left, otherRect.left));
            const overlapY = Math.max(0, Math.min(cardRect.bottom, otherRect.bottom) - Math.max(cardRect.top, otherRect.top));
            const overlapArea = overlapX * overlapY;
            const cardArea = cardRect.width * cardRect.height;
            // If overlapping more than 40%
            if (overlapArea > cardArea * 0.4) {
                swappedWith = otherTech;
                break;
            }
        }
        
        if (swappedWith) {
            // Swap array positions for layout animation
            setTechItems(prev => {
                const idx1 = prev.findIndex(t => t.tech === tech);
                const idx2 = prev.findIndex(t => t.tech === swappedWith);
                if (idx1 === -1 || idx2 === -1) return prev;
                const next = [...prev];
                const temp = next[idx1];
                next[idx1] = next[idx2];
                next[idx2] = temp;
                return next;
            });
            // Clear their drag offsets so they snap to new grid pos
            setPositions(prev => ({ ...prev, [tech]: {x:0, y:0}, [swappedWith]: {x:0, y:0} }));
        } else {
            // Keep exactly where dropped relative to original pos
            setPositions(prev => {
                const currentPos = prev[tech] || { x: 0, y: 0 };
                return {
                    ...prev,
                    [tech]: {
                        x: currentPos.x + info.offset.x,
                        y: currentPos.y + info.offset.y,
                    }
                };
            });
        }
    };
    // Entrance animation
    useEffect(() => {
        if (currentPanel !== 4 || animated.current)
            return;
        animated.current = true;
        const ctx = gsap.context(() => {
            gsap.from(".tech-card", {
                y: 50,
                opacity: 0,
                duration: 0.7,
                stagger: { amount: 0.8, from: "center" },
                ease: "power3.out",
            });
        }, panelRef);
        return () => ctx.revert();
    }, [currentPanel]);
    // Re-animate on category change
    const isFirstMount = useRef(true);
    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        // Only animate if the panel is actually active, to avoid conflicting with entrance
        if (currentPanel !== 4)
            return;
        const ctx = gsap.context(() => {
            gsap.from(".tech-card", {
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: { amount: 0.4, from: "center" },
                ease: "power2.out",
            });
        }, panelRef);
        return () => ctx.revert();
    }, [activeCategory, currentPanel]);

    // Automatic random card swapping loop
    useEffect(() => {
        if (currentPanel !== 4) return;

        const interval = setInterval(() => {
            setTechItems(prev => {
                if (prev.length < 3) return prev;
                const next = [...prev];
                
                // Pick 3 random unique indices
                const indices = [];
                while (indices.length < 3) {
                    const idx = Math.floor(Math.random() * next.length);
                    if (!indices.includes(idx)) indices.push(idx);
                }
                
                // Swap them: 0->1, 1->2, 2->0
                const temp = next[indices[0]];
                next[indices[0]] = next[indices[2]];
                next[indices[2]] = next[indices[1]];
                next[indices[1]] = temp;
                
                return next;
            });
        }, 1000); // Trigger every 1 second

        return () => clearInterval(interval);
    }, [currentPanel]);

    return (<div ref={panelRef} className="relative flex h-full w-full flex-col overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 55% 60% at 25% 50%, rgba(200,100,20,0.07) 0%, transparent 70%)",
        }}/>
      <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 50% 55% at 80% 60%, rgba(0,229,168,0.05) 0%, transparent 70%)",
        }}/>

      {/* Header */}
      <div className="relative z-10 flex-shrink-0 px-12 pt-20 pb-6 md:px-20 lg:px-28">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: "#C86414" }}>
          My Arsenal
        </div>
        <h2 className="font-display text-[42px] font-bold uppercase leading-[0.9] tracking-tight text-white md:text-[60px]">
          Tech Stack
        </h2>

        {/* Category filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const catColor = cat === "All" ? "#ffffff" : CATEGORY_COLORS[cat] ?? "#00E5A8";
            return (<button key={cat} onClick={() => setActiveCategory(cat)} className="rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-wider transition-all duration-300" style={{
                    background: isActive
                        ? `linear-gradient(135deg, ${catColor}25 0%, ${catColor}10 100%)`
                        : "rgba(255,255,255,0.04)",
                    border: isActive
                        ? `1px solid ${catColor}50`
                        : "1px solid rgba(255,255,255,0.08)",
                    color: isActive ? catColor : "rgba(143,143,143,0.7)",
                }}>
                {cat}
              </button>);
        })}
        </div>

        {/* Gradient line */}
        <div className="mt-5 h-px" style={{
            background: "linear-gradient(90deg, #C86414 0%, #00E5A8 50%, transparent 100%)",
        }}/>
      </div>

      {/* Tech grid (Canvas Area) */}
      <div ref={canvasRef} className="relative z-10 flex-1 overflow-y-auto px-12 pb-8 md:px-20 lg:px-28" style={{ scrollbarWidth: "none" }}>
        <div className="flex flex-wrap gap-4 py-4">
          {techItems.map(({ tech, category }, i) => (<TechCard key={tech} tech={tech} category={category} index={i} dragConstraints={canvasRef} onDragEnd={handleDragEnd} position={positions[tech]} setRef={(el) => {
                if (el) {
                    cardRefs.current[tech] = el;
                }
                else {
                    delete cardRefs.current[tech];
                }
            }}/>))}
        </div>
      </div>
    </div>);
}

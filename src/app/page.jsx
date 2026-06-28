"use client";
import { useState, useEffect, useRef, useCallback, } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Loader from "@/components/loader/Loader";
import { PanelContext, PANEL_COUNT } from "@/lib/panelContext";
// Dynamic imports — all ssr: false so they only run client-side
const GrainBackground = dynamic(() => import("@/components/background/GrainBackground"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
    ssr: false,
});
const Hero = dynamic(() => import("@/components/hero/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/about/About"), { ssr: false });
const Experience = dynamic(() => import("@/components/experience/Experience"), { ssr: false });
const Projects = dynamic(() => import("@/components/projects/Projects"), {
    ssr: false,
});
const TechStack = dynamic(() => import("@/components/tech-stack/TechStack"), { ssr: false });
const Skills = dynamic(() => import("@/components/skills/Skills"), {
    ssr: false,
});
const Contact = dynamic(() => import("@/components/contact/Contact"), {
    ssr: false,
});
// ── Panel wrapper ─────────────────────────────────────────────────────────────
function Panel({ children }) {
    return (<div style={{
            width: "100vw",
            minWidth: "100vw",
            height: "100vh",
            flexShrink: 0,
            overflow: "hidden",
            position: "relative",
        }}>
      {children}
    </div>);
}
// ── Main shell ────────────────────────────────────────────────────────────────
function PanelShell() {
    const [currentPanel, setCurrentPanel] = useState(0);
    const currentRef = useRef(0); // always up-to-date, no re-render lag
    const isAnimating = useRef(false);
    const lastWheelTime = useRef(0);
    const trackRef = useRef(null);
    // Touch tracking
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    // ── Core navigation ──────────────────────────────────────────────────────
    const goToPanel = useCallback((index) => {
        const target = Math.max(0, Math.min(PANEL_COUNT - 1, index));
        if (target === currentRef.current && !isAnimating.current)
            return;
        if (isAnimating.current)
            return;
        isAnimating.current = true;
        currentRef.current = target;
        setCurrentPanel(target);
        gsap.to(trackRef.current, {
            x: -target * window.innerWidth,
            duration: 1.05,
            ease: "power3.inOut",
            onComplete: () => {
                isAnimating.current = false;
            },
        });
    }, []);
    // Recalculate on window resize
    useEffect(() => {
        const onResize = () => {
            gsap.set(trackRef.current, {
                x: -currentRef.current * window.innerWidth,
            });
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    // ── Wheel / trackpad ─────────────────────────────────────────────────────
    useEffect(() => {
        const COOLDOWN = 900; // ms — prevents too-fast double-fires
        const onWheel = (e) => {
            let allowPanelSwitch = false;
            const target = e.target;
            const innerContainer = target.closest("[data-inner-scroll]");
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            if (innerContainer) {
                // Modals trap scroll completely — never switch panels
                if (innerContainer.hasAttribute("data-modal"))
                    return;
                const atLeft = innerContainer.scrollLeft <= 1;
                const atRight = Math.ceil(innerContainer.scrollLeft + innerContainer.clientWidth) >= innerContainer.scrollWidth - 1;
                if (delta < 0 && atLeft) {
                    allowPanelSwitch = true;
                }
                else if (delta > 0 && atRight) {
                    allowPanelSwitch = true;
                }
                else {
                    // Manual horizontal scroll mapping for standard mouse wheels
                    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                        e.preventDefault();
                        innerContainer.scrollLeft += e.deltaY;
                    }
                    return;
                }
            }
            else {
                allowPanelSwitch = true;
            }
            if (!allowPanelSwitch)
                return;
            e.preventDefault();
            const now = Date.now();
            if (now - lastWheelTime.current < COOLDOWN)
                return;
            lastWheelTime.current = now;
            if (Math.abs(delta) < 3)
                return; // ignore tiny micro-movements
            const direction = delta > 0 ? 1 : -1;
            goToPanel(currentRef.current + direction);
        };
        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, [goToPanel]);
    // ── Touch swipe ──────────────────────────────────────────────────────────
    useEffect(() => {
        const onTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
        };
        const onTouchEnd = (e) => {
            const target = e.target;
            const innerContainer = target.closest("[data-inner-scroll]");
            let allowPanelSwitch = false;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            const dy = e.changedTouches[0].clientY - touchStartY.current;
            if (innerContainer) {
                if (innerContainer.hasAttribute("data-modal"))
                    return;
                const atLeft = innerContainer.scrollLeft <= 1;
                const atRight = Math.ceil(innerContainer.scrollLeft + innerContainer.clientWidth) >= innerContainer.scrollWidth - 1;
                // dx > 0 means swipe right (trying to go to previous panel / scroll left)
                if (dx > 0 && atLeft)
                    allowPanelSwitch = true;
                else if (dx < 0 && atRight)
                    allowPanelSwitch = true;
                else
                    return;
            }
            else {
                allowPanelSwitch = true;
            }
            if (!allowPanelSwitch)
                return;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
                goToPanel(currentRef.current + (dx < 0 ? 1 : -1));
            }
        };
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [goToPanel]);
    // ── Keyboard arrow navigation ────────────────────────────────────────────
    useEffect(() => {
        const onKey = (e) => {
            const target = e.target;
            if (target.closest("[data-inner-scroll]"))
                return;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                goToPanel(currentRef.current + 1);
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                goToPanel(currentRef.current - 1);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [goToPanel]);
    return (<PanelContext.Provider value={{ currentPanel, goToPanel }}>
      {/* Fixed overlays — always on top, outside the track */}
      <GrainBackground />
      <Navbar />

      {/* Fixed viewport container — clips everything outside 100vw */}
      <div style={{
            position: "fixed",
            inset: 0,
            overflow: "hidden",
        }}>
        {/* The scrolling track — GSAP animates translateX on this */}
        <div ref={trackRef} style={{
            display: "flex",
            flexWrap: "nowrap",
            height: "100vh",
            width: `${PANEL_COUNT * 100}vw`,
            willChange: "transform",
        }}>
          <Panel><Hero /></Panel>
          <Panel><About /></Panel>
          <Panel><Experience /></Panel>
          <Panel><Projects /></Panel>
          <Panel><TechStack /></Panel>
          <Panel><Skills /></Panel>
          <Panel><Contact /></Panel>
        </div>
      </div>
    </PanelContext.Provider>);
}
// ── Root export ───────────────────────────────────────────────────────────────
export default function Home() {
    const [loading, setLoading] = useState(true);
    return (<>
      {loading && <Loader onComplete={() => setLoading(false)}/>}
      {!loading && <PanelShell />}
    </>);
}

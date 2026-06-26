"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { useLenis } from "@/components/providers/SmoothScroll";

const TABS = [
  { label: "Home",       index: 0 },
  { label: "About",      index: 1 },
  { label: "Experience", index: 2 },
  { label: "Projects",   index: 3 },
  { label: "Tech Stack", index: 4 },
  { label: "Skills",     index: 5 },
  { label: "Contact",    index: 6 },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(true);
  const lastScrollX = useRef(0);
  const { scrollTo } = useLenis();

  // Detect which panel is in view by horizontal scroll position
  const handleScroll = useCallback(() => {
    const sx = window.scrollX;
    const vw = window.innerWidth;
    const idx = Math.round(sx / vw);
    setActiveTab(Math.min(idx, TABS.length - 1));

    // Hide/show navbar on scroll direction
    setVisible(sx < lastScrollX.current || sx < vw * 0.3);
    lastScrollX.current = sx;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goToTab = (index: number) => {
    const target = index * window.innerWidth;
    scrollTo(target, { duration: 1.2 });
    setActiveTab(index);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
        >
          <div
            className="flex items-center gap-1 rounded-full border px-2 py-2"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(10,10,10,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Logo / home button */}
            <button
              onClick={() => goToTab(0)}
              className="mr-2 flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #C86414 0%, #00E5A8 100%)",
                color: "#050505",
              }}
              aria-label="Home"
            >
              SH
            </button>

            {/* Tab links */}
            <div className="hidden items-center gap-0.5 md:flex">
              {TABS.map((tab) => (
                <button
                  key={tab.index}
                  onClick={() => goToTab(tab.index)}
                  className="relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300"
                  style={{
                    color: activeTab === tab.index ? "#FFFFFF" : "#8F8F8F",
                  }}
                >
                  {activeTab === tab.index && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(200,100,20,0.2) 0%, rgba(0,229,168,0.15) 100%)",
                        border: "1px solid rgba(200,100,20,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="ml-1 rounded-full px-5 py-2 text-[13px] font-medium text-[#050505] transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #C86414 0%, #E8963C 50%, #00E5A8 100%)",
                boxShadow: "0 0 20px rgba(200,100,20,0.35)",
              }}
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Progress dots */}
          <div className="mt-3 flex justify-center gap-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.index}
                onClick={() => goToTab(tab.index)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeTab === tab.index ? "20px" : "6px",
                  height: "6px",
                  background:
                    activeTab === tab.index
                      ? "linear-gradient(90deg, #C86414, #00E5A8)"
                      : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Go to ${tab.label}`}
              />
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

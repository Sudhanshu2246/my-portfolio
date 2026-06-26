"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { usePanels } from "@/lib/panelContext";

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
  const { currentPanel, goToPanel } = usePanels();

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
        style={{ pointerEvents: "auto" }}
      >
        <div
          className="flex items-center gap-1 rounded-full border px-2 py-2"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(10,10,10,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.6)",
          }}
        >
          {/* Logo pill */}
          <button
            onClick={() => goToPanel(0)}
            className="mr-2 flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #C86414 0%, #00E5A8 100%)",
              color: "#050505",
            }}
            aria-label="Home"
          >
            SH
          </button>

          {/* Tab buttons */}
          <div className="hidden items-center gap-0.5 md:flex">
            {TABS.map((tab) => {
              const isActive = currentPanel === tab.index;
              return (
                <button
                  key={tab.index}
                  onClick={() => goToPanel(tab.index)}
                  className="relative rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
                  style={{
                    color: isActive ? "#FFFFFF" : "#8F8F8F",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(200,100,20,0.22) 0%, rgba(0,229,168,0.14) 100%)",
                        border: "1px solid rgba(200,100,20,0.35)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="ml-1 rounded-full px-5 py-2 text-[13px] font-medium text-[#050505] transition-all duration-300 hover:opacity-90"
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
        <div className="mt-2.5 flex justify-center gap-1.5">
          {TABS.map((tab) => {
            const isActive = currentPanel === tab.index;
            return (
              <button
                key={tab.index}
                onClick={() => goToPanel(tab.index)}
                className="rounded-full transition-all duration-400"
                style={{
                  width: isActive ? "22px" : "6px",
                  height: "6px",
                  background: isActive
                    ? "linear-gradient(90deg, #C86414, #00E5A8)"
                    : "rgba(255,255,255,0.18)",
                }}
                aria-label={`Go to ${tab.label}`}
              />
            );
          })}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}

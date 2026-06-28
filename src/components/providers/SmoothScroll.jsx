"use client";
import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export const LenisContext = createContext({
    lenis: null,
    scrollTo: () => { },
});
export function useLenis() {
    return useContext(LenisContext);
}
export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);
    useEffect(() => {
        const lenis = new Lenis({
            orientation: "horizontal",
            gestureOrientation: "both",
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2.5,
            wheelMultiplier: 1.2,
            smoothWheel: true,
        });
        lenisRef.current = lenis;
        // Wire Lenis → GSAP ScrollTrigger proxy for horizontal scroll
        ScrollTrigger.scrollerProxy(document.body, {
            scrollLeft() {
                return lenis.animatedScroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
        });
        lenis.on("scroll", ScrollTrigger.update);
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        const rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);
    const scrollTo = (target, opts = {}) => {
        lenisRef.current?.scrollTo(target, opts);
    };
    return (<LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>);
}

"use client";
import { useRef, useCallback } from "react";
export function useMagnetic() {
    const ref = useRef(null);
    const cleanupRef = useRef(() => { });
    const onMouseMove = useCallback((e) => {
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transition = "transform 0.05s ease-out";
        ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    }, []);
    const onMouseLeave = useCallback(() => {
        if (!ref.current)
            return;
        ref.current.style.transition = "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)";
        ref.current.style.transform = "translate(0, 0)";
    }, []);
    return { ref, onMouseMove, onMouseLeave };
}

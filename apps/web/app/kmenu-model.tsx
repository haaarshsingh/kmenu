"use client";

import React, { useEffect, useRef, useState } from "react";

export function KmenuModel() {
  const ref = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);
  const t0Ref = useRef<number | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    let cancelled = false;

    const startLoop = () => {
      const loop = (ts: number) => {
        if (cancelled) return;
        if (t0Ref.current === null) t0Ref.current = ts;
        const secs = (ts - t0Ref.current) / 1000;
        if (ref.current) {
          ref.current.setAttribute(
            "orientation",
            `0deg 0deg ${(secs * 30) % 360}deg`,
          );
        }
        frameIdRef.current = requestAnimationFrame(loop);
      };
      frameIdRef.current = requestAnimationFrame(loop);
    };

    customElements.whenDefined("model-viewer").then(() => {
      if (cancelled) return;
      const el = ref.current;
      if (!el) return;

      if (el.getAttribute("loaded") !== null) {
        startLoop();
      } else {
        el.addEventListener("load", () => startLoop(), { once: true });
      }
    });

    return () => {
      cancelled = true;
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) {
    return <div className="w-[200px] h-[200px] bg-[var(--page-bg)]" />;
  }

  return (
    <div className="w-[200px] h-[200px] bg-[var(--page-bg)]">
      {React.createElement("model-viewer", {
        id: "cmd",
        ref: ref,
        src: "/kmenu.glb",
        exposure: "1",
        style: { width: "100%", height: "100%", backgroundColor: "var(--page-bg)" },
        "camera-target": "0m 0m 0m",
        "camera-orbit": "0deg 90deg auto",
        "min-camera-orbit": "auto 90deg auto",
        "max-camera-orbit": "auto 90deg auto",
        "disable-zoom": true,
        autoplay: true,
      })}
    </div>
  );
}

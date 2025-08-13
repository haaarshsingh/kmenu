"use client";

import React, { useEffect, useRef } from "react";

export function KmenuModel() {
  const ref = useRef<HTMLElement>(null);
  let t0: number | null = null;
  let frameId: number;

  useEffect(() => {
    const loop = (ts: number) => {
      if (t0 === null) t0 = ts;
      const secs = (ts - t0) / 1000;
      if (ref.current) {
        // @ts-ignore - property on the element
        ref.current.orientation = `0deg 0deg ${(secs * 30) % 360}deg`;
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="w-[200px] h-[200px] bg-black">
      {React.createElement("model-viewer", {
        id: "cmd",
        ref: ref as any,
        src: "/kmenu.glb",
        exposure: "1",
        style: { width: "100%", height: "100%", background: "transparent" },
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

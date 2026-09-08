"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 z-[100] h-1 w-full bg-transparent" aria-hidden="true">
      <div 
        className="h-full bg-[var(--color-text-primary)] transition-all duration-150 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }} 
      />
    </div>
  );
}

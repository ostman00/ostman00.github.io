"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export type Card3DVariant = "dots" | "grid" | "particles" | "matrix" | "waves" | "hex";

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADERS: Record<Card3DVariant, string> = {
  // 1: Cyber Dot Matrix (used for cat whoami.txt)
  dots: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uOpacity;
    uniform vec3 uColor;

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      float aspect = uResolution.x / uResolution.y;
      uv.x *= aspect;
      uv += uMouse * 0.05;
      vec2 grid = fract(uv * 46.0);
      vec2 id = floor(uv * 46.0);
      float dist = length(grid - vec2(0.5));
      float pulse = sin(uTime * 1.8 + id.x * 0.25 + id.y * 0.25) * 0.5 + 0.5;
      float radius = 0.08 + pulse * 0.16;
      float alpha = smoothstep(radius, radius - 0.05, dist);
      float depthFade = smoothstep(1.3, 0.2, length(uv - vec2(0.5 * aspect, 0.5)));
      gl_FragColor = vec4(uColor * (0.7 + 0.3 * pulse), alpha * depthFade * uOpacity);
    }
  `,

  // 2: 3D Perspective Wireframe Grid (used for // LATEST_SYSTEM_LOG)
  grid: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uOpacity;
    uniform vec3 uColor;

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
      float horizon = 0.65 + uMouse.y * 0.15;
      float z = 0.5 / (uv.y + horizon);
      if (z <= 0.0 || z > 15.0) {
        gl_FragColor = vec4(0.0);
        return;
      }
      vec2 p = vec2(uv.x * z + uMouse.x * 0.25, z + uTime * 0.7);
      vec2 g = abs(fract(p * 3.5 - 0.5) - 0.5) / fwidth(p * 3.5);
      float line = min(g.x, g.y);
      float gridLine = 1.0 - min(line, 1.0);
      float fade = smoothstep(10.0, 1.0, z) * smoothstep(-horizon, -horizon + 0.3, uv.y);
      gl_FragColor = vec4(uColor * (gridLine * 0.9 + 0.1), gridLine * fade * uOpacity);
    }
  `,

  // 3: Constellation Network Topology (used for // INDEX_DIR: /recent_notes)
  particles: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uOpacity;
    uniform vec3 uColor;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
      uv *= 8.0;
      uv += uMouse * 0.4;
      vec2 gv = fract(uv) - 0.5;
      vec2 id = floor(uv);
      float d = 10.0;
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec2 offs = vec2(float(x), float(y));
          float n = hash(id + offs);
          vec2 p = offs + sin(vec2(uTime * 0.7 + n * 6.28, uTime * 0.5 + n * 3.14)) * 0.35;
          d = min(d, length(gv - p));
        }
      }
      float pt = smoothstep(0.14, 0.04, d);
      float halo = smoothstep(0.35, 0.1, d) * 0.4;
      float alpha = (pt + halo) * uOpacity;
      gl_FragColor = vec4(uColor, alpha);
    }
  `,

  // 4: Hexagonal Diagnostic Shield (used for $ whoami --verbose)
  hex: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uOpacity;
    uniform vec3 uColor;

    vec4 hexCoords(vec2 uv) {
      vec2 r = vec2(1.0, 1.7320508);
      vec2 h = r * 0.5;
      vec2 a = mod(uv, r) - h;
      vec2 b = mod(uv - h, r) - h;
      vec2 gv = dot(a, a) < dot(b, b) ? a : b;
      vec2 id = floor(uv / r);
      return vec4(gv.x, gv.y, id.x, id.y);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
      uv *= 11.0;
      uv += uMouse * 1.2;
      vec4 hc = hexCoords(uv);
      float d = max(abs(hc.x) * 1.7320508 + abs(hc.y), abs(hc.y) * 2.0);
      float edge = smoothstep(0.96, 0.88, d) * smoothstep(0.80, 0.90, d);
      float pulse = sin(uTime * 1.6 + hc.z * 0.4 + hc.w * 0.4) * 0.5 + 0.5;
      float glow = edge * (0.6 + 0.4 * pulse);
      float fade = smoothstep(2.0, 0.3, length(uv * 0.1));
      gl_FragColor = vec4(uColor * (glow + pulse * 0.1), glow * fade * uOpacity);
    }
  `,

  // 5: Digital Code Stream / Data Rain (used for cat resume.json)
  matrix: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uOpacity;
    uniform vec3 uColor;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      float cols = 48.0;
      float col = floor(uv.x * cols);
      float speed = 0.5 + hash(vec2(col, 1.0)) * 0.7;
      float y = fract(uv.y + uTime * speed * 0.25 + hash(vec2(col, 2.0)));
      float trail = pow(1.0 - y, 5.0);
      float lead = smoothstep(0.03, 0.0, y);
      float mouseDist = length(uv - (uMouse * 0.5 + 0.5));
      float ripple = smoothstep(0.35, 0.0, mouseDist) * 0.5;
      float val = (trail * 0.8 + lead * 1.8 + ripple);
      vec3 finalColor = mix(uColor, vec3(0.9, 1.0, 0.9), lead * 0.6);
      gl_FragColor = vec4(finalColor, val * uOpacity * 0.55);
    }
  `,

  // 6: Signal Waveform / Telemetry Wave (used for ./send_message.sh)
  waves: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uOpacity;
    uniform vec3 uColor;

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
      float wave = 0.0;
      for (float i = 1.0; i <= 4.0; i += 1.0) {
        float freq = i * 3.5;
        float spd = uTime * (1.1 * i) + uMouse.x * 1.8;
        float y = sin(uv.x * freq + spd) * (0.12 / i) + (uMouse.y * 0.12);
        float d = abs(uv.y - y);
        wave += 0.012 / (d + 0.008);
      }
      float fade = smoothstep(1.2, 0.15, length(uv));
      float intensity = clamp(wave * fade * uOpacity, 0.0, 1.0);
      gl_FragColor = vec4(uColor * (0.8 + 0.2 * wave), intensity);
    }
  `,
};

interface ThreeTerminalCardProps {
  children: React.ReactNode;
  variant?: Card3DVariant;
  className?: string;
  opacity?: number;
}

export function ThreeTerminalCard({
  children,
  variant = "dots",
  className = "",
  opacity = 0.35,
}: ThreeTerminalCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Helper to read theme color from CSS variables
    const getThemeColor = () => {
      try {
        const computed = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-action-primary")
          .trim();
        if (computed) {
          return new THREE.Color(computed);
        }
      } catch {}
      return new THREE.Color("#37F712");
    };

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2() },
      uOpacity: { value: opacity },
      uColor: { value: getThemeColor() },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADERS[variant] || FRAGMENT_SHADERS.dots,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId = 0;
    let isVisible = true;
    const startTime = performance.now();

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    // Watch for retro theme changes on documentElement
    const themeObserver = new MutationObserver(() => {
      uniforms.uColor.value.copy(getThemeColor());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const renderLoop = (now: number) => {
      if (!isVisible || document.hidden) {
        animationFrameId = 0;
        return;
      }
      mouseRef.current.lerp(targetMouseRef.current, 0.08);
      uniforms.uTime.value = (now - startTime) * 0.001;
      uniforms.uMouse.value.copy(mouseRef.current);
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      if (isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    });
    intersectionObserver.observe(container);

    handleResize();
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [variant, opacity]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    const y = -(((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    targetMouseRef.current.set(x, y);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`relative overflow-hidden border border-[var(--color-border-default)] bg-[var(--color-surface-card)] transition-colors ${className}`}
    >
      {/* 3D WebGL Background Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ zIndex: 1 }}
      />

      {/* Subtle tint overlay to guarantee razor-sharp text contrast */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Foreground Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}

export default ThreeTerminalCard;

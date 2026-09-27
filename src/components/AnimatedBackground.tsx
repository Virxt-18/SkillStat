import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.00015;

      // =====================================================
      // DOT GRID
      // =====================================================

      const spacing = 46;

      ctx.fillStyle = "rgba(79, 70, 229, 0.055)";

      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
// =====================================================
// DECORATIVE BACKGROUND PATCHES
// =====================================================

// -----------------------------
// TOP RIGHT — soft blue patch
// -----------------------------

const topRightGradient = ctx.createRadialGradient(
  width * 0.98,
  height * 0.05,
  0,
  width * 0.98,
  height * 0.05,
  330
);

topRightGradient.addColorStop(
  0,
  "rgba(125, 211, 252, 0.30)"
);

topRightGradient.addColorStop(
  0.55,
  "rgba(186, 230, 253, 0.20)"
);

topRightGradient.addColorStop(
  1,
  "rgba(186, 230, 253, 0)"
);

ctx.fillStyle = topRightGradient;

ctx.beginPath();
ctx.arc(
  width * 0.98,
  height * 0.05,
  330,
  0,
  Math.PI * 2
);
ctx.fill();


// -----------------------------
// BOTTOM LEFT — mint patch
// -----------------------------

const bottomLeftGradient = ctx.createRadialGradient(
  width * 0.02,
  height * 0.96,
  0,
  width * 0.02,
  height * 0.96,
  350
);

bottomLeftGradient.addColorStop(
  0,
  "rgba(94, 234, 212, 0.28)"
);

bottomLeftGradient.addColorStop(
  0.55,
  "rgba(153, 246, 228, 0.18)"
);

bottomLeftGradient.addColorStop(
  1,
  "rgba(204, 251, 241, 0)"
);

ctx.fillStyle = bottomLeftGradient;

ctx.beginPath();
ctx.arc(
  width * 0.02,
  height * 0.96,
  350,
  0,
  Math.PI * 2
);
ctx.fill();


// -----------------------------
// BOTTOM RIGHT — soft blue patch
// -----------------------------

const bottomRightGradient = ctx.createRadialGradient(
  width * 0.98,
  height * 0.96,
  0,
  width * 0.98,
  height * 0.96,
  300
);

bottomRightGradient.addColorStop(
  0,
  "rgba(147, 197, 253, 0.24)"
);

bottomRightGradient.addColorStop(
  0.55,
  "rgba(191, 219, 254, 0.15)"
);

bottomRightGradient.addColorStop(
  1,
  "rgba(219, 234, 254, 0)"
);

ctx.fillStyle = bottomRightGradient;

ctx.beginPath();
ctx.arc(
  width * 0.98,
  height * 0.96,
  300,
  0,
  Math.PI * 2
);
ctx.fill();
      // =====================================================
      // INDIGO DATA FIELD
      // =====================================================

      const indigoX =
        width * 0.16 + Math.sin(t) * 55;

      const indigoY =
        height * 0.22 + Math.cos(t * 1.2) * 35;

      const indigoGradient = ctx.createRadialGradient(
        indigoX,
        indigoY,
        0,
        indigoX,
        indigoY,
        430
      );

      indigoGradient.addColorStop(
        0,
        "rgba(79, 70, 229, 0.10)"
      );

      indigoGradient.addColorStop(
        0.45,
        "rgba(79, 70, 229, 0.045)"
      );

      indigoGradient.addColorStop(
        1,
        "rgba(79, 70, 229, 0)"
      );

      ctx.fillStyle = indigoGradient;

      ctx.beginPath();
      ctx.arc(
        indigoX,
        indigoY,
        430,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // =====================================================
      // TEAL DATA FIELD
      // =====================================================

      const tealX =
        width * 0.83 + Math.cos(t * 0.8) * 60;

      const tealY =
        height * 0.55 + Math.sin(t) * 45;

      const tealGradient = ctx.createRadialGradient(
        tealX,
        tealY,
        0,
        tealX,
        tealY,
        420
      );

      tealGradient.addColorStop(
        0,
        "rgba(13, 148, 136, 0.085)"
      );

      tealGradient.addColorStop(
        0.5,
        "rgba(13, 148, 136, 0.035)"
      );

      tealGradient.addColorStop(
        1,
        "rgba(13, 148, 136, 0)"
      );

      ctx.fillStyle = tealGradient;

      ctx.beginPath();
      ctx.arc(
        tealX,
        tealY,
        420,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // =====================================================
      // SUBTLE AMBER FIELD
      // =====================================================

      const amberX =
        width * 0.68 + Math.sin(t * 0.7) * 40;

      const amberY =
        height * 0.18 + Math.cos(t) * 30;

      const amberGradient = ctx.createRadialGradient(
        amberX,
        amberY,
        0,
        amberX,
        amberY,
        180
      );

      amberGradient.addColorStop(
        0,
        "rgba(245, 158, 11, 0.045)"
      );

      amberGradient.addColorStop(
        1,
        "rgba(245, 158, 11, 0)"
      );

      ctx.fillStyle = amberGradient;

      ctx.beginPath();
      ctx.arc(
        amberX,
        amberY,
        180,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // =====================================================
      // FLOWING DATA LINES
      // =====================================================

      ctx.lineWidth = 1;

      for (let i = 0; i < 7; i++) {
        const baseX =
          width * 0.03 + i * 190;

        const movement =
          Math.sin(t * 0.8 + i) * 25;

        ctx.beginPath();

        ctx.moveTo(
          baseX + movement,
          -50
        );

        ctx.bezierCurveTo(
          baseX + 170,
          height * 0.25,
          baseX - 100,
          height * 0.62,
          baseX + 120,
          height + 50
        );

        ctx.strokeStyle =
          i % 2 === 0
            ? "rgba(79, 70, 229, 0.035)"
            : "rgba(13, 148, 136, 0.03)";

        ctx.stroke();
      }

      // =====================================================
      // SMALL DATA PARTICLES
      // =====================================================

      const particleCount = 38;

      for (let i = 0; i < particleCount; i++) {
        const x =
          (i * 191 + 40) % width;

        const baseY =
          (i * 113 + 20) % height;

        const y =
          baseY +
          Math.sin(t * 1.5 + i) * 15;

        const opacity =
          0.08 +
          (Math.sin(t * 1.3 + i) + 1) * 0.035;

        ctx.fillStyle =
          i % 4 === 0
            ? `rgba(13, 148, 136, ${opacity})`
            : `rgba(79, 70, 229, ${opacity})`;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          i % 8 === 0 ? 2 : 1,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      animationFrame =
        requestAnimationFrame(draw);
    };

    resize();

    animationFrame =
      requestAnimationFrame(draw);

    window.addEventListener(
      "resize",
      resize
    );

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        h-full
        w-full
        opacity-100
      "
      aria-hidden="true"
    />
  );
}
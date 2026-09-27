import React, { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type Particle = {
  x: number;
  y: number;

  startX: number;
  startY: number;

  targetX: number;
  targetY: number;

  vx: number;
  vy: number;

  size: number;
  alpha: number;

  phase: number;
  speed: number;
};

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let animationFrame = 0;

    let particles: Particle[] = [];

    let currentShape = 0;
    let nextShape = 1;

    let shapeStart = performance.now();

    /*
     * Time each shape remains visible.
     */
    const HOLD_TIME = 2600;

    /*
     * Time spent morphing between shapes.
     */
    const MORPH_TIME = 1500;

    /*
     * Number of particles.
     */
    const PARTICLE_COUNT = 1500;

    /*
     * ---------------------------------------------------------
     * SHAPE DRAWING
     * ---------------------------------------------------------
     *
     * Every shape is drawn on an offscreen canvas.
     *
     * We then sample the strokes and turn them into particles.
     */

    const drawStudy = (
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
    ) => {
      const cx = w / 2;
      const cy = h / 2;

      const bookW = Math.min(w * 0.7, 520);
      const bookH = bookW * 0.55;

      const left = cx - bookW / 2;
      const right = cx + bookW / 2;
      const top = cy - bookH * 0.35;
      const bottom = cy + bookH * 0.35;

      context.beginPath();

      // Left page
      context.moveTo(cx, top + 25);
      context.bezierCurveTo(
        cx - bookW * 0.16,
        top,
        cx - bookW * 0.35,
        top + 10,
        left,
        top + 45,
      );

      context.lineTo(left, bottom - 20);

      context.bezierCurveTo(
        cx - bookW * 0.35,
        bottom - 5,
        cx - bookW * 0.15,
        bottom,
        cx,
        bottom + 20,
      );

      // Right page
      context.moveTo(cx, top + 25);
      context.bezierCurveTo(
        cx + bookW * 0.16,
        top,
        cx + bookW * 0.35,
        top + 10,
        right,
        top + 45,
      );

      context.lineTo(right, bottom - 20);

      context.bezierCurveTo(
        cx + bookW * 0.35,
        bottom - 5,
        cx + bookW * 0.15,
        bottom,
        cx,
        bottom + 20,
      );

      // Spine
      context.moveTo(cx, top + 25);
      context.lineTo(cx, bottom + 20);

      context.stroke();

      /*
       * Page lines.
       */
      for (let i = 0; i < 4; i++) {
        const y = top + 80 + i * 35;

        context.beginPath();

        context.moveTo(left + 55, y);

        context.quadraticCurveTo(cx - bookW * 0.2, y - 8, cx - 30, y);

        context.stroke();

        context.beginPath();

        context.moveTo(cx + 30, y);

        context.quadraticCurveTo(cx + bookW * 0.2, y - 8, right - 55, y);

        context.stroke();
      }
    };

    const drawSkill = (
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
    ) => {
      const cx = w / 2;
      const cy = h / 2;

      const radius = Math.min(w, h) * 0.29;

      /*
       * Outer target.
       */
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.stroke();

      context.beginPath();
      context.arc(cx, cy, radius * 0.68, 0, Math.PI * 2);
      context.stroke();

      context.beginPath();
      context.arc(cx, cy, radius * 0.32, 0, Math.PI * 2);
      context.stroke();

      /*
       * Target arrows.
       */
      context.beginPath();

      context.moveTo(cx - radius * 1.35, cy - radius * 0.95);

      context.lineTo(cx - radius * 0.45, cy - radius * 0.65);

      context.lineTo(cx - radius * 0.75, cy - radius * 0.25);

      context.stroke();

      /*
       * Arrow head.
       */
      context.beginPath();

      context.moveTo(cx - radius * 0.45, cy - radius * 0.65);

      context.lineTo(cx - radius * 0.68, cy - radius * 0.7);

      context.moveTo(cx - radius * 0.45, cy - radius * 0.65);

      context.lineTo(cx - radius * 0.52, cy - radius * 0.9);

      context.stroke();

      /*
       * Star in center.
       */
      const starRadius = radius * 0.16;

      context.beginPath();

      for (let i = 0; i < 10; i++) {
        const angle = -Math.PI / 2 + (i * Math.PI) / 5;

        const r = i % 2 === 0 ? starRadius : starRadius * 0.45;

        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.closePath();
      context.stroke();
    };

    const drawAI = (
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
    ) => {
      const cx = w / 2;
      const cy = h / 2;

      const brainW = Math.min(w * 0.65, 480);
      const brainH = brainW * 0.8;

      const left = cx - brainW / 2;
      const top = cy - brainH / 2;

      /*
       * Brain outline.
       */
      context.beginPath();

      context.moveTo(cx, top + 20);

      context.bezierCurveTo(
        cx - 70,
        top - 15,
        left + 20,
        top + 30,
        left + 35,
        top + 95,
      );

      context.bezierCurveTo(
        left - 10,
        top + 150,
        left + 30,
        top + 190,
        left + 75,
        top + 205,
      );

      context.bezierCurveTo(
        left + 30,
        top + 270,
        left + 110,
        top + brainH,
        cx,
        top + brainH - 15,
      );

      context.bezierCurveTo(
        cx - 10,
        top + brainH * 0.65,
        cx - 10,
        top + brainH * 0.35,
        cx,
        top + 20,
      );

      context.stroke();

      /*
       * Right half.
       */
      context.beginPath();

      context.moveTo(cx, top + 20);

      context.bezierCurveTo(
        cx + 70,
        top - 15,
        cx + brainW / 2 - 20,
        top + 30,
        cx + brainW / 2 - 35,
        top + 95,
      );

      context.bezierCurveTo(
        cx + brainW / 2 + 10,
        top + 150,
        cx + brainW / 2 - 30,
        top + 190,
        cx + brainW / 2 - 75,
        top + 205,
      );

      context.bezierCurveTo(
        cx + brainW / 2 - 30,
        top + 270,
        cx + brainW / 2 - 110,
        top + brainH,
        cx,
        top + brainH - 15,
      );

      context.bezierCurveTo(
        cx + 10,
        top + brainH * 0.65,
        cx + 10,
        top + brainH * 0.35,
        cx,
        top + 20,
      );

      context.stroke();

      /*
       * Neural network.
       */
      const nodes = [
        [-110, -70],
        [-55, -10],
        [-100, 70],
        [-20, 35],
        [45, -65],
        [95, -10],
        [70, 75],
        [15, 110],
      ];

      nodes.forEach(([x, y]) => {
        context.beginPath();

        context.arc(cx + x, cy + y, 7, 0, Math.PI * 2);

        context.stroke();
      });

      const connections = [
        [0, 1],
        [1, 2],
        [1, 3],
        [3, 5],
        [4, 5],
        [5, 6],
        [3, 7],
        [6, 7],
        [0, 4],
      ];

      connections.forEach(([a, b]) => {
        const [x1, y1] = nodes[a];
        const [x2, y2] = nodes[b];

        context.beginPath();

        context.moveTo(cx + x1, cy + y1);
        context.lineTo(cx + x2, cy + y2);

        context.stroke();
      });
    };

    const drawLearning = (
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
    ) => {
      const cx = w / 2;
      const cy = h / 2;

      const radius = Math.min(w, h) * 0.27;

      /*
       * Lightbulb.
       */
      context.beginPath();

      context.arc(cx, cy - 30, radius, Math.PI * 0.15, Math.PI * 0.85, true);

      context.bezierCurveTo(
        cx - radius * 0.8,
        cy + radius * 0.55,
        cx - radius * 0.45,
        cy + radius * 0.75,
        cx - radius * 0.4,
        cy + radius,
      );

      context.lineTo(cx + radius * 0.4, cy + radius);

      context.bezierCurveTo(
        cx + radius * 0.45,
        cy + radius * 0.75,
        cx + radius * 0.8,
        cy + radius * 0.55,
        cx + radius * 0.8,
        cy - radius * 0.1,
      );

      context.stroke();

      /*
       * Bulb base.
       */
      context.beginPath();

      context.moveTo(cx - radius * 0.4, cy + radius);

      context.lineTo(cx + radius * 0.4, cy + radius);

      context.moveTo(cx - radius * 0.35, cy + radius * 1.15);

      context.lineTo(cx + radius * 0.35, cy + radius * 1.15);

      context.moveTo(cx - radius * 0.25, cy + radius * 1.3);

      context.lineTo(cx + radius * 0.25, cy + radius * 1.3);

      context.stroke();

      /*
       * Rays.
       */
      const rays = [
        [-1.5, -1.2],
        [-1.9, -0.45],
        [-1.6, 0.45],
        [1.5, -1.2],
        [1.9, -0.45],
        [1.6, 0.45],
        [0, -1.8],
      ];

      rays.forEach(([x, y]) => {
        const startX = cx + x * radius * 0.65;

        const startY = cy - 30 + y * radius * 0.65;

        const endX = cx + x * radius;

        const endY = cy - 30 + y * radius;

        context.beginPath();

        context.moveTo(startX, startY);
        context.lineTo(endX, endY);

        context.stroke();
      });

      /*
       * Small learning spark inside.
       */
      context.beginPath();

      context.arc(cx, cy - 35, radius * 0.25, 0, Math.PI * 2);

      context.stroke();
    };

    /*
     * Draw a shape to an offscreen canvas and
     * extract points from the strokes.
     */
    const generateShape = (shapeIndex: number): Point[] => {
      const offscreen = document.createElement("canvas");

      offscreen.width = width;
      offscreen.height = height;

      const offCtx = offscreen.getContext("2d");

      if (!offCtx) return [];

      /*
       * Make lines thick enough that there are
       * plenty of particle positions.
       */
      offCtx.lineWidth = Math.max(4, Math.min(width, height) * 0.009);

      offCtx.lineCap = "round";
      offCtx.lineJoin = "round";

      offCtx.strokeStyle = "#000";

      if (shapeIndex === 0) {
        drawStudy(offCtx, width, height);
      }

      if (shapeIndex === 1) {
        drawSkill(offCtx, width, height);
      }

      if (shapeIndex === 2) {
        drawAI(offCtx, width, height);
      }

      if (shapeIndex === 3) {
        drawLearning(offCtx, width, height);
      }

      const image = offCtx.getImageData(0, 0, width, height);

      const data = image.data;

      const points: Point[] = [];

      /*
       * Sampling density.
       */
      const gap = Math.max(3, Math.floor(Math.min(width, height) / 150));

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;

          if (data[index + 3] > 80) {
            points.push({ x, y });
          }
        }
      }

      return points;
    };

    /*
     * Make every shape have exactly the same
     * number of points.
     *
     * This makes the morph much smoother.
     */
    const normalizePoints = (points: Point[], count: number): Point[] => {
      if (!points.length) {
        return Array.from({ length: count }, () => ({
          x: width / 2,
          y: height / 2,
        }));
      }

      const result: Point[] = [];

      for (let i = 0; i < count; i++) {
        /*
         * Evenly distribute particles across
         * the shape.
         */
        const index = Math.floor((i / count) * points.length);

        const point = points[Math.min(index, points.length - 1)];

        result.push({
          x: point.x,
          y: point.y,
        });
      }

      return result;
    };

    let shapePoints: Point[][] = [];

    const buildShapes = () => {
      shapePoints = [
        normalizePoints(generateShape(0), PARTICLE_COUNT),

        normalizePoints(generateShape(1), PARTICLE_COUNT),

        normalizePoints(generateShape(2), PARTICLE_COUNT),

        normalizePoints(generateShape(3), PARTICLE_COUNT),
      ];
    };

    /*
     * Create particle system.
     */
    const createParticles = () => {
      const current = shapePoints[currentShape];

      const next = shapePoints[nextShape];

      particles = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const point = current[i];
        const target = next[i];

        particles.push({
          x: point.x,
          y: point.y,

          startX: point.x,
          startY: point.y,

          targetX: target.x,
          targetY: target.y,

          vx: 0,
          vy: 0,

          size: 1.15 + Math.random() * 1.5,

          alpha: 0.45 + Math.random() * 0.45,

          phase: Math.random() * Math.PI * 2,

          speed: 0.5 + Math.random() * 0.7,
        });
      }
    };

    /*
     * Prepare morph to next shape.
     */
    const morphToNextShape = () => {
      const targets = shapePoints[nextShape];

      particles.forEach((particle, index) => {
        particle.startX = particle.x;
        particle.startY = particle.y;

        particle.targetX = targets[index].x;

        particle.targetY = targets[index].y;

        particle.vx = 0;
        particle.vy = 0;
      });

      shapeStart = performance.now();
    };

    /*
     * Resize canvas.
     */
    const resize = () => {
      const rect = container.getBoundingClientRect();

      width = Math.max(1, Math.floor(rect.width));

      height = Math.max(1, Math.floor(rect.height));

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;

      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;

      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildShapes();

      createParticles();

      shapeStart = performance.now();
    };

    /*
     * Gradient particle color.
     *
     * Matches your screenshot:
     *
     * Blue → Indigo → Purple
     */
    const getParticleColor = (x: number, y: number, alpha: number) => {
      const normalized = Math.max(0, Math.min(1, x / width));

      /*
       * Cyan / blue on left,
       * purple on right.
       */
      const r = Math.round(45 + normalized * 75);

      const g = Math.round(110 - normalized * 65);

      const b = Math.round(245 + normalized * 5);

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    /*
     * Animation.
     */
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = time - shapeStart;

      /*
       * After the current shape has been
       * visible long enough, start next morph.
       */
      if (elapsed > HOLD_TIME + MORPH_TIME) {
        currentShape = nextShape;

        nextShape = (nextShape + 1) % shapePoints.length;

        morphToNextShape();
      }

      /*
       * Morph progress.
       */
      let progress = Math.min(1, elapsed / MORPH_TIME);

      /*
       * Smoothstep / ease-in-out.
       */
      progress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      particles.forEach((particle) => {
        /*
         * Interpolate toward target.
         */
        const baseX =
          particle.startX + (particle.targetX - particle.startX) * progress;

        const baseY =
          particle.startY + (particle.targetY - particle.startY) * progress;

        /*
         * Very subtle floating motion.
         */
        const floatX =
          Math.sin(time * 0.0007 * particle.speed + particle.phase) * 0.8;

        const floatY =
          Math.cos(time * 0.0006 * particle.speed + particle.phase) * 0.8;

        /*
         * Spring physics.
         */
        particle.vx += (baseX + floatX - particle.x) * 0.045;

        particle.vy += (baseY + floatY - particle.y) * 0.045;

        particle.vx *= 0.8;
        particle.vy *= 0.8;

        particle.x += particle.vx;

        particle.y += particle.vy;

        /*
         * Draw particle.
         */
        ctx.beginPath();

        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        /*
         * Slightly brighter during
         * morphing.
         */
        const particleAlpha = particle.alpha * (0.7 + progress * 0.3);

        ctx.fillStyle = getParticleColor(particle.x, particle.y, particleAlpha);

        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    /*
     * ResizeObserver makes the canvas
     * automatically responsive.
     */
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    resizeObserver.observe(container);

    resize();

    animationFrame = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {/* Cyan atmospheric glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[70%]
          w-[70%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-200/20
          blur-[90px]
        "
      />

      {/* Indigo atmospheric glow */}
      <div
        className="
          pointer-events-none
          absolute
          right-[5%]
          top-[20%]
          h-[45%]
          w-[45%]
          rounded-full
          bg-indigo-300/15
          blur-[80px]
        "
      />

      <canvas
        ref={canvasRef}
        className="
          relative
          block
          h-full
          w-full
        "
      />
    </div>
  );
};

export default HeroCanvas;

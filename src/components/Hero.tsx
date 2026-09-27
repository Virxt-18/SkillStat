import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

import GapChart from "./GapChart";
import AnimatedBackground from "./AnimatedBackground";

import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

import HeroCanvas from "./HeroCanvas";

interface HeroProps {
  revealed: boolean;
}

export default function Hero({ revealed }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!revealed || !heroRef.current) return;

    const items = Array.from(
      heroRef.current.querySelectorAll<HTMLElement>(".hero-item"),
    );

    if (!items.length) return;

    animate(items, {
      translateY: [25, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(100),
      ease: "outExpo",
    });
  }, [revealed]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="
        relative
        isolate
        w-full
        min-h-screen
        min-w-0
     overflow-hidden 
        bg-[#f7fbff]
        flex justify-center items-center pb-7
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <AnimatedBackground />
      {/* =====================================================
    DECORATIVE ROUND PATCHES
====================================================== */}
      {/* Decorative background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-90px] top-[-70px] z-0 h-[300px] w-[420px] rounded-[48%_52%_60%_40%] bg-gradient-to-br from-cyan-100/80 via-sky-100/70 to-indigo-100/70 blur-[1px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-20px] top-[-20px] z-0 h-[220px] w-[280px] rounded-[60%_40%_45%_55%] bg-gradient-to-bl from-indigo-100/75 via-blue-100/60 to-transparent"
        style={{ transform: "rotate(18deg)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[70px] top-[55px] z-0 h-[150px] w-[190px] rounded-[45%_55%_60%_40%] bg-gradient-to-br from-teal-100/60 via-cyan-100/50 to-transparent"
        style={{ transform: "rotate(-12deg)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-90px] left-[-80px] z-0 h-[280px] w-[430px] rounded-[65%_35%_40%_60%] bg-gradient-to-tr from-teal-100/80 via-cyan-100/65 to-indigo-100/40"
        style={{ transform: "rotate(-8deg)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-55px] right-[-35px] z-0 h-[180px] w-[180px] rounded-full opacity-55 [background-image:radial-gradient(circle,#cbd5e1_1.2px,transparent_1.2px)] [background-size:14px_14px]"
      />
      {/* Top-right pastel patch */}
      <div
        className="
    pointer-events-none
    absolute
    -right-16
    -top-10
    z-0
    h-[190px]
    w-[310px]
    rounded-[55%_45%_60%_40%]
    bg-gradient-to-br
    from-teal-100/70
    via-cyan-100/60
    to-indigo-100/70
  "
      />

      {/* Bottom-left pastel patch */}
      <div
        className="
    pointer-events-none
    absolute
    -bottom-16
    -left-14
    z-0
    h-[190px]
    w-[310px]
    rounded-[60%_40%_45%_55%]
    bg-gradient-to-tr
    from-teal-100/80
    via-cyan-100/60
    to-indigo-50/50
  "
      />

      {/* Bottom-right dotted patch */}
      <div
        className="
    pointer-events-none
    absolute
    bottom-3
    -right-10
    z-0
    h-[155px]
    w-[185px]
    rounded-full
    opacity-60
    [background-image:radial-gradient(circle,#cbd5e1_1.2px,transparent_1.2px)]
    [background-size:14px_14px]
  "
      />

      {/* Ambient indigo glow */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-[-220px]
          z-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-cyan-300/20
          blur-[140px]
        "
      />

      {/* Ambient blue glow */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[8%]
          z-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-blue-300/25
          blur-[150px]
        "
      />

      {/* Bottom violet glow */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-250px]
          left-[35%]
          z-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-violet-300/20
          blur-[160px]
        "
      />

      {/* =====================================================
          FULL WIDTH HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-none
          px-8
          pt-[120px]
          pb-6
          md:px-10
          lg:px-10
          lg:pt-[55px]
          lg:pb-6
          xl:pr-2 xl:pl-16
        "
      >
        {/* ===================================================
            MAIN TWO-COLUMN LAYOUT
        ==================================================== */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            items-start
            gap-10
            lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]
            lg:gap-12
            xl:gap-16
          "
        >
          {/* =================================================
              LEFT HERO CONTENT
          ================================================== */}

          <div
            className="
              hero-item
              w-full
              max-w-[650px]
              pt-20
              
            "
          >
            {/* =================================================
                HEADLINE
            ================================================== */}

            <h1
              className="
                max-w-[650px]
                text-[44px]
                font-bold
                leading-[1.02]
                tracking-[-0.04em]
                text-slate-950
                sm:text-[52px]
                md:text-[58px]
                lg:text-[64px]
                xl:text-[70px]
                italic
              "
            >
              Build skills.
              <br />
              <span
                className="
                  bg-gradient-to-r
                  from-indigo-600
                  via-blue-500
                  to-violet-600
                  bg-clip-text
                  text-transparent
                "
              >
                Close the gap.
              </span>
              <br />
              Grow faster.
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mt-6
                max-w-[590px]
                text-[16px]
                leading-7
                text-slate-600
                md:text-[17px]
              "
            >
              SkillStat identifies competency gaps, personalizes learning paths,
              and enables continuous skill improvement through AI-driven
              assessments.
            </p>

            {/* =================================================
                CTA BUTTONS
            ================================================== */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-4
              "
            >
              {/* Primary CTA */}

              <a
                href="#get-started"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-violet-600
                  px-7
                  py-3.5
                  text-[15px]
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:shadow-blue-500/30
                  active:scale-95
                "
              >
                <span>Start Skill Assessment</span>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </a>

              {/* Secondary CTA */}

              <a
                href="#how-it-works"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-sky-200
                  bg-white/70
                  px-6
                  py-3.5
                  text-[15px]
                  font-semibold
                  text-slate-700
                  shadow-sm
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-teal-300
                  hover:bg-white
                  hover:text-teal-700
                "
              >
                See How It Works
              </a>
            </div>

            {/* =================================================
                TRUST INDICATORS
            ================================================== */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-x-7
                gap-y-3
                border-t
                border-indigo-100/70
                pt-5
                text-xs
              "
            >
              {/* Zero manual surveys */}

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  font-medium
                  text-slate-600
                "
              >
                <CheckCircle2
                  className="
                    h-4
                    w-4
                    text-emerald-500
                  "
                />
                Zero manual surveys
              </span>

              {/* Real-time tracking */}

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  font-medium
                  text-slate-600
                "
              >
                <Zap
                  className="
                    h-4
                    w-4
                    text-indigo-600
                  "
                />
                Real-time tracking
              </span>

              {/* Trusted & secure */}

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  font-medium
                  text-slate-600
                "
              >
                <ShieldCheck
                  className="
                    h-4
                    w-4
                    text-violet-500
                  "
                />
                Trusted & secure
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT DASHBOARD COLUMN
          ================================================== */}
          <div className="relative">
            <img
              src="/bg.png"
              alt=""
              aria-hidden="true"
              className="
                absolute
                right-[7%]
                -top-[100px]
                z-10
                h-[560px]
                w-auto
                max-w-none
                object-contain
                opacity-90
                filter-[brightness(0)_saturate(100%)_invert(18%)_sepia(99%)_saturate(7498%)_hue-rotate(240deg)_brightness(101%)_contrast(145%)]
                sm:h-[650px]
                lg:right-[12%]
                lg:h-[760px]
                xl:h-[820px]
                
              "
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          SUBTLE BOTTOM FADE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-10
          bg-gradient-to-t
          from-[#f8f9ff]
          to-transparent
        "
      />
    </section>
  );
}

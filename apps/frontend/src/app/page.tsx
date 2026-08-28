"use client";

import Link from "next/link";
import GeoScanHero from "@/components/ui/geoscan-hero";

const steps = [
  {
    number: "01",
    title: "UNDERSTAND THE LAND",
    description:
      "GeoScanAI turns geographic data into clear, structured land intelligence.",
  },
  {
    number: "02",
    title: "FROM LOCATION TO DATA",
    description:
      "We bring together satellite, soil, terrain, climate and geographic context.",
  },
  {
    number: "03",
    title: "TURN DATA INTO INSIGHT",
    description:
      "Complex geospatial signals become simple information you can use to make decisions.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#0b0906] text-[#e8dcc3]">
      {/* =========================================================
          HERO
          Keep the existing GeoScanAI animation untouched.
      ========================================================= */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <GeoScanHero fullBleed />

        {/* Minimal branding layer */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center">
          <div className="pointer-events-auto mb-12 text-center sm:mb-16">
            <p
              className="mb-4 text-[9px] tracking-[0.45em] text-[#8a7350] sm:text-[10px]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              AI-POWERED LAND INTELLIGENCE
            </p>

            <h1
              className="text-3xl leading-tight tracking-[0.04em] sm:text-5xl md:text-6xl"
              style={{ fontFamily: '"Bodoni Moda", serif' }}
            >
              READ THE LAND
              <br />
              BEFORE YOU ACT.
            </h1>

            <p
              className="mx-auto mt-5 max-w-md px-6 text-xs leading-6 text-[#8a7350] sm:text-sm"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              Transform location data into clear geographic intelligence.
            </p>

            <div className="mt-8">
              <Link
                href="/scan"
                className="inline-flex items-center gap-3 rounded-full border border-[#8a7350]/50 px-7 py-3 text-[10px] tracking-[0.25em] text-[#e8dcc3] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                START AN ANALYSIS
                <span className="text-sm">→</span>
              </Link>
            </div>

            <div className="mt-10 flex flex-col items-center">
              <span
                className="text-[8px] tracking-[0.35em] text-[#8a7350]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                SCROLL TO EXPLORE
              </span>

              <span className="mt-3 h-10 w-px bg-[#8a7350]/40" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 01 — WHAT WE DO
      ========================================================= */}
      <section className="relative flex min-h-screen items-center justify-center border-t border-[#8a7350]/10 px-6 py-24">
        <div className="w-full max-w-5xl">
          <div className="grid gap-12 md:grid-cols-[120px_1fr] md:gap-16">
            <div>
              <span
                className="text-xs tracking-[0.3em] text-[#8a7350]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                01
              </span>
            </div>

            <div>
              <p
                className="text-[10px] tracking-[0.35em] text-[#8a7350]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                LAND INTELLIGENCE
              </p>

              <h2
                className="mt-5 max-w-3xl text-4xl leading-[1.05] sm:text-6xl md:text-7xl"
                style={{ fontFamily: '"Bodoni Moda", serif' }}
              >
                UNDERSTAND
                <br />
                THE LAND.
              </h2>

              <p
                className="mt-8 max-w-xl text-sm leading-7 text-[#a89470] sm:text-base"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                A location contains more information than what you can see.
                GeoScanAI brings that information together and turns it into
                something understandable.
              </p>

              <div className="mt-14 grid gap-8 border-t border-[#8a7350]/20 pt-8 sm:grid-cols-3">
                <div>
                  <p
                    className="text-[9px] tracking-[0.25em] text-[#8a7350]"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    SATELLITE
                  </p>
                  <p
                    className="mt-2 text-sm"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    Earth observation
                  </p>
                </div>

                <div>
                  <p
                    className="text-[9px] tracking-[0.25em] text-[#8a7350]"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    TERRAIN
                  </p>
                  <p
                    className="mt-2 text-sm"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    Land characteristics
                  </p>
                </div>

                <div>
                  <p
                    className="text-[9px] tracking-[0.25em] text-[#8a7350]"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    ENVIRONMENT
                  </p>
                  <p
                    className="mt-2 text-sm"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    Climate & context
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 02 — HOW IT WORKS
      ========================================================= */}
      <section className="relative flex min-h-screen items-center border-t border-[#8a7350]/10 px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-20">
            <p
              className="text-[10px] tracking-[0.35em] text-[#8a7350]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              THE PROCESS
            </p>

            <h2
              className="mt-5 max-w-3xl text-4xl leading-tight sm:text-6xl"
              style={{ fontFamily: '"Bodoni Moda", serif' }}
            >
              FROM LOCATION
              <br />
              TO INTELLIGENCE.
            </h2>
          </div>

          <div className="divide-y divide-[#8a7350]/15 border-y border-[#8a7350]/15">
            {steps.slice(1).map((step) => (
              <div
                key={step.number}
                className="grid gap-6 py-10 md:grid-cols-[100px_1fr_1.5fr] md:items-center"
              >
                <span
                  className="text-xs tracking-[0.3em] text-[#8a7350]"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                >
                  {step.number}
                </span>

                <h3
                  className="text-2xl sm:text-3xl"
                  style={{ fontFamily: '"Bodoni Moda", serif' }}
                >
                  {step.title}
                </h3>

                <p
                  className="max-w-lg text-xs leading-6 text-[#a89470] sm:text-sm"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                >
                  {step.description}
                </p>
              </div>
            ))}

            <div className="grid gap-6 py-10 md:grid-cols-[100px_1fr_1.5fr] md:items-center">
              <span
                className="text-xs tracking-[0.3em] text-[#8a7350]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                04
              </span>

              <h3
                className="text-2xl sm:text-3xl"
                style={{ fontFamily: '"Bodoni Moda", serif' }}
              >
                MAKE A DECISION
              </h3>

              <p
                className="max-w-lg text-xs leading-6 text-[#a89470] sm:text-sm"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Get a structured view of the land before taking the next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 03 — BRAND / CTA
      ========================================================= */}
      <section className="relative flex min-h-[80vh] items-center justify-center border-t border-[#8a7350]/10 px-6 py-24">
        <div className="text-center">
          <p
            className="text-[10px] tracking-[0.4em] text-[#8a7350]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            GEOSCANAI
          </p>

          <h2
            className="mt-6 text-5xl leading-none sm:text-7xl md:text-8xl"
            style={{ fontFamily: '"Bodoni Moda", serif' }}
          >
            READ
            <br />
            THE LAND.
          </h2>

          <p
            className="mx-auto mt-8 max-w-md text-xs leading-6 text-[#8a7350] sm:text-sm"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            Start with a location.
            <br />
            Let the data tell the story.
          </p>

          <Link
            href="/scan"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#8a7350]/50 px-8 py-3.5 text-[10px] tracking-[0.25em] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            START AN ANALYSIS
            <span className="text-sm">→</span>
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-[#8a7350]/10 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 text-[9px] tracking-[0.2em] text-[#6f6047] sm:flex-row sm:items-center sm:justify-between">
          <span style={{ fontFamily: '"Space Mono", monospace' }}>
            GEOSCANAI
          </span>

          <span style={{ fontFamily: '"Space Mono", monospace' }}>
            AI-POWERED LAND INTELLIGENCE
          </span>
        </div>
      </footer>
    </main>
  );
}
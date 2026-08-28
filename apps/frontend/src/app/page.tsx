"use client";

import Link from "next/link";
import GeoScanHero from "@/components/ui/geoscan-hero";

const dataSignals = [
  {
    number: "01",
    title: "SATELLITE",
    description: "Earth observation and surface signals.",
  },
  {
    number: "02",
    title: "SOIL",
    description: "Ground properties and soil characteristics.",
  },
  {
    number: "03",
    title: "TERRAIN",
    description: "Elevation, slope and drainage indicators.",
  },
  {
    number: "04",
    title: "CLIMATE",
    description: "Weather and historical environmental context.",
  },
  {
    number: "05",
    title: "GIS",
    description: "Roads, buildings and geographic context.",
  },
  {
    number: "06",
    title: "YOUR DATA",
    description: "Professional geospatial data, when available.",
  },
];

const pipeline = [
  "LOCATION",
  "COLLECT",
  "PROCESS",
  "ANALYZE",
  "INTERPRET",
  "REPORT",
];

export default function HomePage() {
  return (
    <main className="bg-[#0b0906] text-[#e8dcc3]">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative h-screen w-full overflow-hidden">
        {/* Existing animation — untouched */}
        <GeoScanHero fullBleed />

        {/* Minimal hero content */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div>
            <p
              style={{
                fontFamily: '"Space Mono", monospace',
                color: "#8a7350",
              }}
              className="text-[10px] tracking-[0.45em] sm:text-xs"
            >
              GEOSCANAI
            </p>

            <h1
              style={{
                fontFamily: '"Bodoni Moda", serif',
                color: "#e8dcc3",
              }}
              className="mt-6 text-5xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
            >
              READ THE LAND.
            </h1>

            <p
              style={{
                fontFamily: '"Space Mono", monospace',
                color: "#8a7350",
              }}
              className="mt-6 text-[9px] tracking-[0.28em] sm:text-xs"
            >
              AI-POWERED LAND INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
          <p
            style={{
              fontFamily: '"Space Mono", monospace',
              color: "#8a7350",
            }}
            className="text-[8px] tracking-[0.35em]"
          >
            SCROLL TO EXPLORE
          </p>

          <div className="mx-auto mt-4 h-10 w-px bg-[#8a7350]/50" />
        </div>
      </section>

      {/* =========================================================
          01 — WHO WE ARE
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#8a7350]">
                01 / GEOSCANAI
              </span>
            </div>

            <div>
              <h2 className="max-w-5xl font-serif text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
                UNDERSTAND
                <br />
                THE LAND.
              </h2>

              <p className="mt-10 max-w-xl font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
                GeoScanAI transforms geographic locations into
                structured land intelligence.
              </p>

              <p className="mt-5 max-w-xl font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
                We bring geographic evidence together so people can
                understand a location before making a decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02 — THE PROBLEM
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#8a7350]">
                02 / THE PROBLEM
              </span>

              <h2 className="mt-10 font-serif text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
                THE DATA
                <br />
                IS THERE.
                <br />
                THE ANSWERS
                <br />
                AREN&apos;T.
              </h2>
            </div>

            <div className="self-end">
              <p className="max-w-xl font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
                Understanding a piece of land can require satellite
                imagery, soil information, terrain, weather,
                land cover, infrastructure and GIS data.
              </p>

              <p className="mt-6 max-w-xl font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
                These signals are often fragmented across different
                platforms, formats and tools.
              </p>

              <div className="mt-12 border-l border-[#8a7350]/40 pl-6">
                <p className="font-serif text-2xl italic sm:text-3xl">
                  Where is this?
                </p>

                <p className="mt-3 font-mono text-[9px] tracking-[0.25em] text-[#8a7350]">
                  SHOULD BECOME
                </p>

                <p className="mt-3 font-serif text-2xl italic sm:text-3xl">
                  What should I know before deciding?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          03 — OUR SOLUTION
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#8a7350]">
            03 / THE SOLUTION
          </span>

          <div className="mt-10 grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-serif text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
              ONE LOCATION.
              <br />
              MULTIPLE SIGNALS.
              <br />
              ONE PICTURE.
            </h2>

            <div className="self-end">
              <p className="font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
                Give GeoScanAI a location.
              </p>

              <p className="mt-5 font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
                The platform gathers relevant geographic evidence,
                processes spatial information and turns the signals
                into understandable intelligence.
              </p>
            </div>
          </div>

          {/* Input → Engine → Output */}
          <div className="mt-20 grid border-y border-[#8a7350]/25 sm:grid-cols-3">
            <div className="border-b border-[#8a7350]/25 p-8 sm:border-b-0 sm:border-r">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#8a7350]">
                INPUT
              </span>

              <h3 className="mt-8 font-serif text-3xl">LOCATION</h3>

              <p className="mt-3 font-mono text-[10px] leading-5 text-[#8a7350]">
                Coordinates or area of interest.
              </p>
            </div>

            <div className="border-b border-[#8a7350]/25 p-8 sm:border-b-0 sm:border-r">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#8a7350]">
                ENGINE
              </span>

              <h3 className="mt-8 font-serif text-3xl">ANALYSIS</h3>

              <p className="mt-3 font-mono text-[10px] leading-5 text-[#8a7350]">
                Data collection, processing and spatial analysis.
              </p>
            </div>

            <div className="p-8">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#8a7350]">
                OUTPUT
              </span>

              <h3 className="mt-8 font-serif text-3xl">INTELLIGENCE</h3>

              <p className="mt-3 font-mono text-[10px] leading-5 text-[#8a7350]">
                Insights, assessment and report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          04 — WHAT WE LOOK AT
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#8a7350]">
            04 / THE EVIDENCE
          </span>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <h2 className="font-serif text-5xl leading-[0.92] sm:text-7xl">
              EVERY
              <br />
              SIGNAL
              <br />
              MATTERS.
            </h2>

            <p className="max-w-xl self-end font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
              A location becomes more meaningful when multiple
              geographic signals are analyzed together.
            </p>
          </div>

          <div className="mt-20 grid border-l border-t border-[#8a7350]/25 sm:grid-cols-2 lg:grid-cols-3">
            {dataSignals.map((signal) => (
              <div
                key={signal.number}
                className="min-h-56 border-b border-r border-[#8a7350]/25 p-7 transition-colors duration-300 hover:bg-[#e8dcc3]/[0.03]"
              >
                <span className="font-mono text-[9px] text-[#8a7350]">
                  {signal.number}
                </span>

                <h3 className="mt-14 font-mono text-xs tracking-[0.2em]">
                  {signal.title}
                </h3>

                <p className="mt-4 font-mono text-[10px] leading-6 text-[#8a7350]">
                  {signal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          05 — ENGINE
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#8a7350]">
            05 / THE INTELLIGENCE ENGINE
          </span>

          <h2 className="mt-10 max-w-5xl font-serif text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
            FROM RAW DATA
            <br />
            TO INTELLIGENCE.
          </h2>

          <div className="mt-20 border-t border-[#8a7350]/25">
            {pipeline.map((stage, index) => (
              <div
                key={stage}
                className="grid gap-5 border-b border-[#8a7350]/20 py-7 sm:grid-cols-[80px_240px_1fr] sm:items-center"
              >
                <span className="font-mono text-[9px] text-[#8a7350]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-mono text-xs tracking-[0.2em]">
                  {stage}
                </h3>

                <p className="font-mono text-[10px] leading-6 text-[#8a7350]">
                  {index === 0 &&
                    "A geographic location becomes the starting point."}

                  {index === 1 &&
                    "Relevant geographic evidence is collected."}

                  {index === 2 &&
                    "Data is normalized and spatial signals are extracted."}

                  {index === 3 &&
                    "Signals are combined into a structured analysis."}

                  {index === 4 &&
                    "Complex geographic information becomes understandable."}

                  {index === 5 &&
                    "The final intelligence is prepared for the user."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          06 — FUTURE
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#8a7350]">
            06 / BUILT TO GROW
          </span>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[9px] tracking-[0.25em] text-[#8a7350]">
                STANDARD
              </p>

              <h2 className="mt-8 font-serif text-4xl sm:text-6xl">
                START WITH
                <br />
                A LOCATION.
              </h2>

              <p className="mt-7 max-w-lg font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
                Start with coordinates and get an initial
                understanding of the land.
              </p>
            </div>

            <div className="border-t border-[#8a7350]/25 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="font-mono text-[9px] tracking-[0.25em] text-[#8a7350]">
                PROFESSIONAL · FUTURE
              </p>

              <h2 className="mt-8 font-serif text-4xl sm:text-6xl">
                BRING YOUR
                <br />
                OWN DATA.
              </h2>

              <p className="mt-7 max-w-lg font-mono text-xs leading-7 text-[#9d9179] sm:text-sm">
                Future workflows can combine professional
                geospatial and field data for deeper analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#8a7350]/30 px-6 py-24 text-center sm:px-10">
          <span className="font-mono text-[9px] tracking-[0.4em] text-[#8a7350]">
            GEOSCANAI
          </span>

          <h2 className="mt-8 font-mono text-2xl tracking-[0.2em] sm:text-4xl">
            READY TO READ THE LAND?
          </h2>

          <p className="mx-auto mt-7 max-w-xl font-mono text-xs leading-7 text-[#8a7350]">
            Start with a location and turn geographic data into
            structured land intelligence.
          </p>

          <Link
            href="/scan"
            className="mt-10 inline-flex rounded-full border border-[#8a7350]/50 px-9 py-4 font-mono text-xs tracking-[0.2em] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
          >
            START AN ANALYSIS →
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="border-t border-[#8a7350]/20 px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] tracking-[0.2em]">
            GEOSCANAI
          </p>

          <p className="font-mono text-[9px] text-[#8a7350]">
            TURNING LOCATION DATA INTO LAND INTELLIGENCE.
          </p>
        </div>
      </footer>
    </main>
  );
}
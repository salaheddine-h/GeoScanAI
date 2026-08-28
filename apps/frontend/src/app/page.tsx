"use client";

import Link from "next/link";
import GeoScanHero from "@/components/ui/geoscan-hero";

const sections = [
  {
    number: "01",
    label: "THE PROBLEM",
    title: "LAND DATA IS FRAGMENTED.",
    text: "Understanding a location often means working across satellite imagery, soil data, terrain, climate and geographic information.",
  },
  {
    number: "02",
    label: "OUR APPROACH",
    title: "ONE LOCATION. ONE INTELLIGENCE LAYER.",
    text: "GeoScanAI brings geographic evidence together and transforms raw location data into structured land intelligence.",
  },
  {
    number: "03",
    label: "THE ENGINE",
    title: "COLLECT · PROCESS · ANALYZE.",
    text: "Our analysis engine combines multiple data sources, extracts meaningful signals and prepares them for interpretation.",
  },
  {
    number: "04",
    label: "THE RESULT",
    title: "UNDERSTAND THE LAND BEFORE YOU ACT.",
    text: "Move from coordinates to a clearer understanding of opportunities, risks and environmental context.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0906] text-[#e8dcc3]">

      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <GeoScanHero fullBleed />

        {/* Small hero message */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center px-6">
          <div className="text-center">
            <p
              className="mb-4 text-[10px] uppercase tracking-[0.45em]"
              style={{
                fontFamily: '"Space Mono", monospace',
                color: "#8a7350",
              }}
            >
              AI-POWERED LAND INTELLIGENCE
            </p>

            <p
              className="text-xs uppercase tracking-[0.3em] sm:text-sm"
              style={{
                fontFamily: '"Space Mono", monospace',
                color: "#e8dcc3",
              }}
            >
              SCROLL TO EXPLORE
            </p>

            <div className="mx-auto mt-4 h-12 w-px bg-[#8a7350]/50" />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex items-center gap-4">
            <span
              className="text-[10px] tracking-[0.35em]"
              style={{
                fontFamily: '"Space Mono", monospace',
                color: "#8a7350",
              }}
            >
              GEOSCANAI
            </span>

            <div className="h-px flex-1 bg-[#8a7350]/20" />
          </div>

          <div className="max-w-4xl">
            <p
              className="mb-6 text-[10px] tracking-[0.35em]"
              style={{
                fontFamily: '"Space Mono", monospace',
                color: "#8a7350",
              }}
            >
              FROM LOCATION TO INTELLIGENCE
            </p>

            <h1
              className="text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: '"Bodoni Moda", serif',
                fontWeight: 400,
              }}
            >
              KNOW THE LAND
              <br />
              BEFORE YOU ACT.
            </h1>

            <p
              className="mt-8 max-w-2xl text-sm leading-7 sm:text-base"
              style={{
                fontFamily: '"Space Mono", monospace',
                color: "#8a7350",
              }}
            >
              GeoScanAI transforms geographic data into structured,
              understandable land intelligence — helping you see the
              context behind a location.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="border-t border-[#8a7350]/20 px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-16">
            <p
              className="text-[10px] tracking-[0.35em]"
              style={{
                fontFamily: '"Space Mono", monospace',
                color: "#8a7350",
              }}
            >
              WHAT WE DO
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#8a7350]/20 bg-[#8a7350]/20 md:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.number}
                className="min-h-[300px] bg-[#0b0906] p-8 transition-colors duration-500 hover:bg-[#100d08] sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="text-[10px] tracking-[0.3em]"
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      color: "#8a7350",
                    }}
                  >
                    {section.number}
                  </span>

                  <span
                    className="text-[10px] tracking-[0.25em]"
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      color: "#8a7350",
                    }}
                  >
                    {section.label}
                  </span>
                </div>

                <div className="mt-20 max-w-xl">
                  <h2
                    className="text-2xl leading-tight sm:text-3xl"
                    style={{
                      fontFamily: '"Bodoni Moda", serif',
                      fontWeight: 400,
                    }}
                  >
                    {section.title}
                  </h2>

                  <p
                    className="mt-6 max-w-lg text-xs leading-6 sm:text-sm"
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      color: "#8a7350",
                    }}
                  >
                    {section.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DATA LAYER */}
      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            <div>
              <p
                className="text-[10px] tracking-[0.35em]"
                style={{
                  fontFamily: '"Space Mono", monospace',
                  color: "#8a7350",
                }}
              >
                THE DATA LAYER
              </p>

              <h2
                className="mt-6 text-4xl leading-tight sm:text-5xl"
                style={{
                  fontFamily: '"Bodoni Moda", serif',
                  fontWeight: 400,
                }}
              >
                MULTIPLE SIGNALS.
                <br />
                ONE VIEW.
              </h2>
            </div>

            <div className="space-y-6">
              {[
                "SATELLITE",
                "SOIL",
                "TERRAIN",
                "CLIMATE",
                "GIS",
                "LAND COVER",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-[#8a7350]/20 pb-4"
                >
                  <span
                    className="text-xs tracking-[0.25em]"
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      color: "#e8dcc3",
                    }}
                  >
                    {item}
                  </span>

                  <span
                    className="text-[10px]"
                    style={{
                      fontFamily: '"Space Mono", monospace',
                      color: "#8a7350",
                    }}
                  >
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#8a7350]/20 px-6 py-32 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">

          <p
            className="text-[10px] tracking-[0.4em]"
            style={{
              fontFamily: '"Space Mono", monospace',
              color: "#8a7350",
            }}
          >
            READY TO EXPLORE?
          </p>

          <h2
            className="mt-6 text-5xl sm:text-7xl"
            style={{
              fontFamily: '"Bodoni Moda", serif',
              fontWeight: 400,
            }}
          >
            READ THE LAND.
          </h2>

          <p
            className="mx-auto mt-6 max-w-xl text-xs leading-6 sm:text-sm"
            style={{
              fontFamily: '"Space Mono", monospace',
              color: "#8a7350",
            }}
          >
            Start with a location and let GeoScanAI build the context
            around it.
          </p>

          <Link
            href="/scan"
            className="mt-10 inline-flex rounded-full border border-[#8a7350]/50 px-8 py-4 text-xs tracking-[0.25em] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
            style={{
              fontFamily: '"Space Mono", monospace',
            }}
          >
            START ANALYSIS →
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#8a7350]/20 px-6 py-8 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row">
          <span
            className="text-[10px] tracking-[0.25em]"
            style={{
              fontFamily: '"Space Mono", monospace',
              color: "#8a7350",
            }}
          >
            GEOSCANAI
          </span>

          <span
            className="text-[10px] tracking-[0.2em]"
            style={{
              fontFamily: '"Space Mono", monospace',
              color: "#8a7350",
            }}
          >
            LAND INTELLIGENCE PLATFORM
          </span>
        </div>
      </footer>

    </main>
  );
}
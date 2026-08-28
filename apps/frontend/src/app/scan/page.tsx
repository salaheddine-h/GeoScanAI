import Link from "next/link";
import GeoScanHero from "@/components/ui/geoscan-hero";

const pipeline = [
  "COLLECT",
  "VALIDATE",
  "NORMALIZE",
  "EXTRACT",
  "FUSE",
  "ANALYZE",
  "SCORE",
  "INTERPRET",
  "REPORT",
];

const dataSources = [
  ["01", "SOIL", "pH · Carbon · Sand · Clay"],
  ["02", "TERRAIN", "Elevation · Slope · Drainage"],
  ["03", "CLIMATE", "Temperature · Rainfall · Climate"],
  ["04", "EARTH OBSERVATION", "Satellite · Vegetation · Land cover"],
  ["05", "GEOGRAPHIC CONTEXT", "Roads · Buildings · Infrastructure"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0906] text-[#e8dcc3]">

      {/* HERO */}
      <section className="relative min-h-screen">
        <GeoScanHero fullBleed />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 sm:px-10 sm:pb-16">
          <div className="mx-auto max-w-7xl">

            <p className="font-mono text-[10px] tracking-[0.35em] text-[#8a7350]">
              GEOSCANAI · LAND INTELLIGENCE
            </p>

            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              READ THE LAND.
              <br />
              BEFORE YOU DECIDE.
            </h1>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="max-w-xl font-mono text-xs leading-7 text-[#8a7350] sm:text-sm">
                Turn a location into structured, evidence-backed
                land intelligence.
              </p>

              <Link
                href="/scan"
                className="inline-flex w-fit rounded-full border border-[#8a7350]/50 px-7 py-3.5 font-mono text-xs tracking-[0.2em] transition-all hover:bg-[#e8dcc3] hover:text-[#0b0906]"
              >
                START ANALYSIS →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr]">

          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
              01 · THE PROBLEM
            </span>
          </div>

          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-6xl">
              LAND DATA
              <br />
              IS EVERYWHERE.
            </h2>

            <p className="mt-8 max-w-2xl font-mono text-sm leading-8 text-[#9d9179]">
              Satellite imagery. Weather. Soil. Terrain.
              Infrastructure. Each source comes with its own
              tools, formats, and limitations.
            </p>

            <p className="mt-5 max-w-2xl font-mono text-sm leading-8 text-[#9d9179]">
              Understanding one location shouldn't require
              assembling fragmented datasets manually.
            </p>
          </div>

        </div>
      </section>

      {/* SOLUTION */}
      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">

          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
            02 · THE SOLUTION
          </span>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">

            <h2 className="font-serif text-5xl leading-[0.95] sm:text-7xl">
              ONE LOCATION.
              <br />
              A COMPLETE
              <br />
              PICTURE.
            </h2>

            <p className="max-w-xl self-end font-mono text-sm leading-8 text-[#9d9179]">
              GeoScanAI collects relevant geographic evidence,
              processes spatial signals, and transforms them
              into understandable land intelligence.
            </p>

          </div>

          <div className="mt-20 grid border-y border-[#8a7350]/25 sm:grid-cols-4">

            {["LOCATION", "DATA", "ANALYSIS", "INTELLIGENCE"].map(
              (item, index) => (
                <div
                  key={item}
                  className="border-b border-[#8a7350]/25 px-6 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <span className="font-mono text-[10px] text-[#8a7350]">
                    0{index + 1}
                  </span>

                  <p className="mt-4 font-mono text-xs tracking-[0.2em]">
                    {item}
                  </p>
                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">

          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
            03 · INTELLIGENCE ENGINE
          </span>

          <h2 className="mt-10 font-serif text-5xl leading-tight sm:text-7xl">
            FROM DATA
            <br />
            TO INTELLIGENCE.
          </h2>

          <div className="mt-16 border-t border-[#8a7350]/25">

            {pipeline.map((stage, index) => (
              <div
                key={stage}
                className="flex items-center justify-between border-b border-[#8a7350]/20 py-5"
              >
                <div className="flex items-center gap-6">

                  <span className="font-mono text-[10px] text-[#8a7350]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-mono text-xs tracking-[0.2em]">
                    {stage}
                  </span>

                </div>

                <span className="text-[#8a7350]">→</span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* DATA */}
      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">

          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
            04 · WHAT WE ANALYZE
          </span>

          <h2 className="mt-10 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">
            MULTIPLE SIGNALS.
            <br />
            ONE ASSESSMENT.
          </h2>

          <div className="mt-16 grid border-l border-t border-[#8a7350]/25 sm:grid-cols-2 lg:grid-cols-3">

            {dataSources.map(([number, title, description]) => (
              <div
                key={number}
                className="min-h-56 border-b border-r border-[#8a7350]/25 p-7"
              >
                <span className="font-mono text-[10px] text-[#8a7350]">
                  {number}
                </span>

                <h3 className="mt-14 font-mono text-xs tracking-[0.2em]">
                  {title}
                </h3>

                <p className="mt-4 font-mono text-[11px] leading-6 text-[#8a7350]">
                  {description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* WHO IT SERVES */}
      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-7xl">

          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
            05 · WHO IT SERVES
          </span>

          <div className="mt-12 grid gap-px border border-[#8a7350]/25 bg-[#8a7350]/25 lg:grid-cols-2">

            <div className="bg-[#0b0906] p-8 sm:p-12">

              <span className="font-mono text-[10px] text-[#8a7350]">
                STANDARD
              </span>

              <h3 className="mt-8 font-serif text-4xl sm:text-5xl">
                START WITH
                <br />
                A LOCATION.
              </h3>

              <p className="mt-8 font-mono text-sm leading-8 text-[#9d9179]">
                Provide coordinates or an area of interest
                and receive an initial land assessment.
              </p>

            </div>

            <div className="bg-[#0b0906] p-8 sm:p-12">

              <span className="font-mono text-[10px] text-[#8a7350]">
                PROFESSIONAL · FUTURE
              </span>

              <h3 className="mt-8 font-serif text-4xl sm:text-5xl">
                BRING YOUR
                <br />
                OWN DATA.
              </h3>

              <p className="mt-8 font-mono text-sm leading-8 text-[#9d9179]">
                Future workflows can combine professional
                geospatial files and field data.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 sm:px-10 sm:py-40">

        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#8a7350]/30 px-6 py-20 text-center sm:py-28">

          <p className="font-mono text-[10px] tracking-[0.4em] text-[#8a7350]">
            GEOSCANAI
          </p>

          <h2 className="mt-8 font-mono text-2xl tracking-[0.2em] sm:text-4xl">
            READY TO READ THE LAND?
          </h2>

          <p className="mx-auto mt-7 max-w-xl font-mono text-xs leading-7 text-[#8a7350]">
            Start with a location and turn geographic data
            into structured land intelligence.
          </p>

          <Link
            href="/scan"
            className="mt-10 inline-flex rounded-full border border-[#8a7350]/50 px-9 py-4 font-mono text-xs tracking-[0.2em] transition-all hover:bg-[#e8dcc3] hover:text-[#0b0906]"
          >
            GET STARTED →
          </Link>

        </div>

      </section>

    </main>
  );
}
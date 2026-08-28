import Link from "next/link";
import GeoScanHero from "@/components/ui/geoscan-hero";

const dataSources = [
  {
    number: "01",
    title: "SOIL",
    text: "Soil properties, composition, acidity and other ground-level signals.",
  },
  {
    number: "02",
    title: "SATELLITE",
    text: "Earth observation data used to understand vegetation, land cover and surface conditions.",
  },
  {
    number: "03",
    title: "TERRAIN",
    text: "Elevation, slope, drainage and terrain characteristics around the location.",
  },
  {
    number: "04",
    title: "WEATHER",
    text: "Historical and environmental conditions that influence the land.",
  },
  {
    number: "05",
    title: "GIS CONTEXT",
    text: "Roads, buildings, infrastructure and geographic context surrounding the site.",
  },
  {
    number: "06",
    title: "YOUR DATA",
    text: "Professional users can later bring their own geospatial and field data.",
  },
];

const pipeline = [
  ["01", "LOCATION", "Start with coordinates or an area of interest."],
  ["02", "COLLECT", "Gather relevant geographic evidence from multiple sources."],
  ["03", "PROCESS", "Normalize and extract meaningful spatial signals."],
  ["04", "ANALYZE", "Combine the signals into a structured assessment."],
  ["05", "INTERPRET", "Turn complex geographic data into understandable insight."],
  ["06", "REPORT", "Produce a clear result that supports better decisions."],
];

export default function HomePage() {
  return (
    <main className="bg-[#0b0906] text-[#e8dcc3]">

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative h-screen w-full overflow-hidden">

        {/* Your existing animation stays untouched */}
        <GeoScanHero fullBleed />

        {/* Small indication that there is more below */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">

          <p className="font-mono text-[9px] tracking-[0.35em] text-[#8a7350]">
            SCROLL TO EXPLORE
          </p>

          <div className="mx-auto mt-4 h-10 w-px bg-[#8a7350]/50" />

        </div>

      </section>


      {/* =========================================================
          INTRO / WHO WE ARE
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">

            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
                01 · GEOSCANAI
              </span>
            </div>

            <div>

              <h2 className="max-w-5xl font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
                UNDERSTAND
                <br />
                THE LAND.
              </h2>

              <p className="mt-10 max-w-2xl font-mono text-sm leading-8 text-[#9d9179]">
                GeoScanAI transforms a geographic location into
                structured land intelligence.
              </p>

              <p className="mt-5 max-w-2xl font-mono text-sm leading-8 text-[#9d9179]">
                Instead of searching through fragmented geographic
                datasets and different tools, GeoScanAI brings the
                relevant evidence together and turns it into a
                clear assessment.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          PROBLEM
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 lg:grid-cols-2">

            <div>

              <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
                02 · THE PROBLEM
              </span>

              <h2 className="mt-10 font-serif text-5xl leading-[0.95] sm:text-7xl">
                LAND
                <br />
                DATA IS
                <br />
                FRAGMENTED.
              </h2>

            </div>

            <div className="self-end">

              <p className="font-mono text-sm leading-8 text-[#9d9179]">
                Understanding a piece of land can require
                satellite imagery, soil information, terrain,
                weather records, land cover, infrastructure and
                local GIS data.
              </p>

              <p className="mt-6 font-mono text-sm leading-8 text-[#9d9179]">
                Each source has its own format, tools,
                limitations and level of complexity.
              </p>

              <div className="mt-12 border-l border-[#8a7350]/40 pl-6">

                <p className="font-serif text-2xl italic text-[#e8dcc3]">
                  "Where is this?"
                </p>

                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[#8a7350]">
                  SHOULD BECOME
                </p>

                <p className="mt-3 font-serif text-2xl italic text-[#e8dcc3]">
                  "What should I know before deciding?"
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SOLUTION
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">

        <div className="mx-auto max-w-7xl">

          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
            03 · THE SOLUTION
          </span>

          <div className="mt-10 grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">

            <h2 className="font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              ONE LOCATION.
              <br />
              MULTIPLE SIGNALS.
              <br />
              ONE PICTURE.
            </h2>

            <div className="self-end">

              <p className="font-mono text-sm leading-8 text-[#9d9179]">
                You give GeoScanAI a location.
              </p>

              <p className="mt-5 font-mono text-sm leading-8 text-[#9d9179]">
                The platform gathers relevant evidence,
                processes geographic information and combines
                the signals into an understandable assessment.
              </p>

            </div>

          </div>

          {/* Simple transformation */}
          <div className="mt-20 grid border-y border-[#8a7350]/25 sm:grid-cols-3">

            <div className="border-b border-[#8a7350]/25 p-8 sm:border-b-0 sm:border-r">

              <span className="font-mono text-[10px] text-[#8a7350]">
                INPUT
              </span>

              <p className="mt-8 font-serif text-3xl">
                LOCATION
              </p>

              <p className="mt-3 font-mono text-[11px] text-[#8a7350]">
                Coordinates / Area of interest
              </p>

            </div>

            <div className="border-b border-[#8a7350]/25 p-8 sm:border-b-0 sm:border-r">

              <span className="font-mono text-[10px] text-[#8a7350]">
                ENGINE
              </span>

              <p className="mt-8 font-serif text-3xl">
                ANALYSIS
              </p>

              <p className="mt-3 font-mono text-[11px] text-[#8a7350]">
                Data collection / Spatial processing
              </p>

            </div>

            <div className="p-8">

              <span className="font-mono text-[10px] text-[#8a7350]">
                OUTPUT
              </span>

              <p className="mt-8 font-serif text-3xl">
                INTELLIGENCE
              </p>

              <p className="mt-3 font-mono text-[11px] text-[#8a7350]">
                Insights / Assessment / Report
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          DATA SOURCES
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">

        <div className="mx-auto max-w-7xl">

          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
            04 · THE EVIDENCE
          </span>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            <h2 className="font-serif text-5xl leading-[0.95] sm:text-7xl">
              WHAT DOES
              <br />
              GEOSCANAI
              <br />
              LOOK AT?
            </h2>

            <p className="max-w-xl self-end font-mono text-sm leading-8 text-[#9d9179]">
              A location can tell a much bigger story when
              different geographic signals are viewed together.
            </p>

          </div>


          <div className="mt-20 grid border-l border-t border-[#8a7350]/25 sm:grid-cols-2 lg:grid-cols-3">

            {dataSources.map((item) => (

              <div
                key={item.number}
                className="min-h-64 border-b border-r border-[#8a7350]/25 p-7 transition-colors hover:bg-[#e8dcc3]/[0.03]"
              >

                <span className="font-mono text-[10px] text-[#8a7350]">
                  {item.number}
                </span>

                <h3 className="mt-16 font-mono text-xs tracking-[0.2em]">
                  {item.title}
                </h3>

                <p className="mt-4 font-mono text-[11px] leading-6 text-[#8a7350]">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">

        <div className="mx-auto max-w-7xl">

          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
            05 · THE INTELLIGENCE ENGINE
          </span>

          <h2 className="mt-10 max-w-5xl font-serif text-5xl leading-[0.95] sm:text-7xl">
            FROM RAW
            <br />
            GEOGRAPHIC DATA
            <br />
            TO INSIGHT.
          </h2>


          <div className="mt-20 border-t border-[#8a7350]/25">

            {pipeline.map(([number, title, text]) => (

              <div
                key={number}
                className="grid gap-6 border-b border-[#8a7350]/20 py-8 sm:grid-cols-[80px_220px_1fr] sm:items-center"
              >

                <span className="font-mono text-[10px] text-[#8a7350]">
                  {number}
                </span>

                <h3 className="font-mono text-xs tracking-[0.2em]">
                  {title}
                </h3>

                <p className="max-w-xl font-mono text-xs leading-6 text-[#8a7350]">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          FUTURE / PROFESSIONAL
      ========================================================== */}

      <section className="border-t border-[#8a7350]/20 px-6 py-28 sm:px-10 sm:py-40">

        <div className="mx-auto max-w-7xl">

          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a7350]">
            06 · BUILT TO GROW
          </span>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">

            <div>

              <p className="font-mono text-[10px] tracking-[0.25em] text-[#8a7350]">
                STANDARD
              </p>

              <h2 className="mt-8 font-serif text-4xl sm:text-6xl">
                START WITH
                <br />
                A LOCATION.
              </h2>

              <p className="mt-7 max-w-lg font-mono text-sm leading-8 text-[#9d9179]">
                For anyone who wants to understand a location
                without becoming a GIS specialist.
              </p>

            </div>


            <div className="border-t border-[#8a7350]/25 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">

              <p className="font-mono text-[10px] tracking-[0.25em] text-[#8a7350]">
                PROFESSIONAL · FUTURE
              </p>

              <h2 className="mt-8 font-serif text-4xl sm:text-6xl">
                BRING YOUR
                <br />
                OWN DATA.
              </h2>

              <p className="mt-7 max-w-lg font-mono text-sm leading-8 text-[#9d9179]">
                Future workflows can combine drone imagery,
                LiDAR, GPR, GeoTIFF, KML, GeoJSON, DEM and
                other professional geospatial evidence.
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

          <span className="font-mono text-[10px] tracking-[0.4em] text-[#8a7350]">
            GEOSCANAI
          </span>

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


      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="border-t border-[#8a7350]/20 px-6 py-10 sm:px-10">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="font-mono text-[10px] tracking-[0.2em]">
            GEOSCANAI
          </p>

          <p className="font-mono text-[10px] text-[#8a7350]">
            TURNING LOCATION DATA INTO LAND INTELLIGENCE.
          </p>

        </div>

      </footer>

    </main>
  );
}
"use client";

import { useState } from "react";
import GeoScanHero from "@/components/ui/geoscan-hero";
import GeoScanOnboarding, {
  type OnboardingResult,
} from "@/components/ui/geoscan-onboarding";

type Step = "landing" | "onboarding" | "workspace";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [result, setResult] = useState<OnboardingResult | null>(null);

  const handleOnboardingComplete = (data: OnboardingResult) => {
    console.log("Analyze land requested", data);
    setResult(data);
    setStep("workspace");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-[#0b0906] text-[#e8dcc3]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative h-screen w-full overflow-hidden">

        <GeoScanHero
          fullBleed
          title=""
          tagline=""
          credits={[]}
          signature={false}
          config={{
            textOpacity: 0,
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">

          <div className="pointer-events-auto max-w-3xl">

            <p
              className="mb-6 text-[10px] tracking-[0.45em] text-[#8a7350] sm:text-xs"
              style={{
                fontFamily: '"Space Mono", monospace',
              }}
            >
              GEOSPATIAL INTELLIGENCE PLATFORM
            </p>

            <h1
              className="text-6xl leading-none tracking-[-0.04em] sm:text-8xl md:text-[9rem]"
              style={{
                fontFamily: '"Bodoni Moda", serif',
                color: "#e8dcc3",
              }}
            >
              GEOSCANAI
            </h1>

            <p
              className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#8a7350] sm:text-base"
              style={{
                fontFamily: '"Space Mono", monospace',
              }}
            >
              Read the land before you act.
            </p>

            <button
              type="button"
              onClick={() => scrollTo("about")}
              className="mt-12 border border-[#8a7350]/50 px-8 py-3 text-[10px] tracking-[0.3em] text-[#e8dcc3] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
              style={{
                fontFamily: '"Space Mono", monospace",
              }}
            >
              EXPLORE GEOSCANAI ↓
            </button>

          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center"
        >
          <span
            className="block text-[9px] tracking-[0.35em] text-[#8a7350]"
            style={{
              fontFamily: '"Space Mono", monospace',
            }}
          >
            SCROLL TO EXPLORE
          </span>

          <span className="mx-auto mt-3 block h-10 w-px bg-[#8a7350]/50" />
        </button>

      </section>


      {/* =====================================================
          01 — WHO WE ARE
      ===================================================== */}

      <section
        id="about"
        className="relative flex min-h-screen items-center px-6 py-32 sm:px-12 lg:px-24"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-2">

          <div>

            <p
              className="mb-5 text-[10px] tracking-[0.35em] text-[#f2c879]"
              style={{
                fontFamily: '"Space Mono", monospace',
              }}
            >
              01 — WHO WE ARE
            </p>

            <h2
              className="text-5xl leading-tight sm:text-7xl"
              style={{
                fontFamily: '"Bodoni Moda", serif',
              }}
            >
              Understanding
              <br />
              the territory.
            </h2>

          </div>

          <div className="flex items-end">

            <p
              className="max-w-xl text-sm leading-8 text-[#8a7350] sm:text-base"
              style={{
                fontFamily: '"Space Mono", monospace',
              }}
            >
              GeoScanAI transforms geographic data into understandable
              land intelligence. Instead of searching through fragmented
              datasets, users start with a location and receive structured
              evidence about the territory.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          02 — THE PROBLEM
      ===================================================== */}

      <section
        id="problem"
        className="min-h-screen border-t border-[#8a7350]/15 px-6 py-32 sm:px-12 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">

          <p
            className="mb-6 text-[10px] tracking-[0.35em] text-[#f2c879]"
            style={{
              fontFamily: '"Space Mono", monospace',
            }}
          >
            02 — THE PROBLEM
          </p>

          <h2
            className="max-w-4xl text-5xl leading-tight sm:text-7xl"
            style={{
              fontFamily: '"Bodoni Moda", serif',
            }}
          >
            Land decisions are
            <br />
            built from fragmented evidence.
          </h2>

          <div className="mt-20 grid gap-px border border-[#8a7350]/20 bg-[#8a7350]/20 md:grid-cols-3">

            <InfoCard
              number="01"
              title="SATELLITE"
              text="Earth observation and environmental signals."
            />

            <InfoCard
              number="02"
              title="TERRAIN"
              text="Elevation, slope, drainage and accessibility."
            />

            <InfoCard
              number="03"
              title="SOIL"
              text="Soil properties, land cover and suitability."
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          03 — OUR SOLUTION
      ===================================================== */}

      <section
        id="solution"
        className="min-h-screen border-t border-[#8a7350]/15 px-6 py-32 sm:px-12 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">

          <p
            className="mb-6 text-[10px] tracking-[0.35em] text-[#f2c879]"
            style={{
              fontFamily: '"Space Mono", monospace',
            }}
          >
            03 — OUR SOLUTION
          </p>

          <h2
            className="max-w-4xl text-5xl leading-tight sm:text-7xl"
            style={{
              fontFamily: '"Bodoni Moda", serif',
            }}
          >
            One location.
            <br />
            One intelligence layer.
          </h2>

          <div className="mt-24 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            <PipelineStep number="01" title="COLLECT" />

            <PipelineStep number="02" title="VALIDATE" />

            <PipelineStep number="03" title="ANALYZE" />

            <PipelineStep number="04" title="INTERPRET" />

          </div>

        </div>
      </section>


      {/* =====================================================
          04 — THE RESULT
      ===================================================== */}

      <section
        id="result"
        className="min-h-screen border-t border-[#8a7350]/15 px-6 py-32 sm:px-12 lg:px-24"
      >
        <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center text-center">

          <p
            className="mb-6 text-[10px] tracking-[0.35em] text-[#f2c879]"
            style={{
              fontFamily: '"Space Mono", monospace',
            }}
          >
            04 — THE RESULT
          </p>

          <h2
            className="text-5xl leading-tight sm:text-7xl"
            style={{
              fontFamily: '"Bodoni Moda", serif',
            }}
          >
            See the land
            <br />
            before you act.
          </h2>

          <p
            className="mt-8 max-w-2xl text-sm leading-8 text-[#8a7350]"
            style={{
              fontFamily: '"Space Mono", monospace',
            }}
          >
            GeoScanAI brings spatial evidence together, analyzes the
            signals, and turns them into a clear land assessment.
          </p>

          <button
            type="button"
            onClick={() => setStep("onboarding")}
            className="mt-12 border border-[#f2c879]/50 px-10 py-4 text-[10px] tracking-[0.3em] text-[#e8dcc3] transition-all duration-300 hover:bg-[#f2c879] hover:text-[#0b0906]"
            style={{
              fontFamily: '"Space Mono", monospace',
            }}
          >
            START YOUR ANALYSIS →
          </button>

        </div>
      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#8a7350]/15 px-6 py-12 text-center">

        <p
          className="text-[9px] tracking-[0.3em] text-[#8a7350]"
          style={{
            fontFamily: '"Space Mono", monospace',
          }}
        >
          GEOSCANAI · LAND INTELLIGENCE
        </p>

      </footer>


      {/* =====================================================
          ONBOARDING
      ===================================================== */}

      {step === "onboarding" && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0b0906]/95 backdrop-blur-md">

          <GeoScanOnboarding
            onComplete={handleOnboardingComplete}
            onExit={() => setStep("landing")}
          />

        </div>
      )}


      {/* =====================================================
          WORKSPACE PLACEHOLDER
      ===================================================== */}

      {step === "workspace" && result && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0b0906]/95 px-6 backdrop-blur-xl">

          <div className="w-full max-w-lg border border-[#8a7350]/25 bg-[#0b0906] p-8 sm:p-10">

            <p
              className="text-center text-[10px] tracking-[0.3em] text-[#f2c879]"
              style={{
                fontFamily: '"Space Mono", monospace',
              }}
            >
              ANALYSIS QUEUED
            </p>

            <h2
              className="mt-6 text-center text-4xl"
              style={{
                fontFamily: '"Bodoni Moda", serif',
              }}
            >
              Preparing your land.
            </h2>

            <p
              className="mt-6 text-center text-xs leading-7 text-[#8a7350]"
              style={{
                fontFamily: '"Space Mono", monospace',
              }}
            >
              GeoScanAI is preparing your analysis workspace,{" "}
              {result.profile.firstName}.
            </p>

            <div
              className="mt-8 border-t border-[#8a7350]/20 pt-6 text-xs leading-7 text-[#e8dcc3]"
              style={{
                fontFamily: '"Space Mono", monospace',
              }}
            >
              <div>
                Mode:{" "}
                {result.dataType === "professional"
                  ? "Professional analysis"
                  : "Standard analysis"}
              </div>

              <div>Latitude: {result.latitude}</div>

              <div>Longitude: {result.longitude}</div>

              {result.pdfFile && (
                <div>
                  Attached: {result.pdfFile.name}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep("landing")}
              className="mt-8 w-full border border-[#8a7350]/40 px-6 py-3 text-[10px] tracking-[0.25em] text-[#e8dcc3] transition hover:bg-[#e8dcc3] hover:text-[#0b0906]"
              style={{
                fontFamily: '"Space Mono", monospace',
              }}
            >
              CLOSE
            </button>

          </div>
        </div>
      )}

    </main>
  );
}


/* =============================================================
   COMPONENTS
============================================================= */

function InfoCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#0b0906] p-8 sm:p-10">

      <span
        className="text-[9px] tracking-[0.3em] text-[#f2c879]"
        style={{
          fontFamily: '"Space Mono", monospace',
        }}
      >
        {number}
      </span>

      <h3
        className="mt-10 text-2xl"
        style={{
          fontFamily: '"Bodoni Moda", serif',
        }}
      >
        {title}
      </h3>

      <p
        className="mt-4 text-xs leading-7 text-[#8a7350]"
        style={{
          fontFamily: '"Space Mono", monospace',
        }}
      >
        {text}
      </p>

    </div>
  );
}


function PipelineStep({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="border-t border-[#8a7350]/30 pt-5">

      <span
        className="text-[9px] tracking-[0.3em] text-[#f2c879]"
        style={{
          fontFamily: '"Space Mono", monospace',
        }}
      >
        {number}
      </span>

      <h3
        className="mt-5 text-3xl"
        style={{
          fontFamily: '"Bodoni Moda", serif',
        }}
      >
        {title}
      </h3>

    </div>
  );
}
"use client";

import { useState } from "react";
import GeoScanHero from "@/components/ui/geoscan-hero";
import GeoScanOnboarding, {
  type OnboardingResult,
} from "@/components/ui/geoscan-onboarding";

type Step = "landing" | "onboarding" | "workspace";

export default function DemoOne() {
  const [step, setStep] = useState<Step>("landing");
  const [result, setResult] = useState<OnboardingResult | null>(null);

  const handleOnboardingComplete = (data: OnboardingResult) => {
    // TODO: wire this into the existing analysis/API logic once the
    // backend is ready for these fields (including PDF upload for
    // professional analysis). No existing API call is being removed
    // or replaced here.
    console.log("Analyze land requested", data);
    setResult(data);
    setStep("workspace");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0906]">
      {/* Existing hero — untouched, always mounted so its animations keep running */}
      <GeoScanHero fullBleed />

      {/* STEP 1: Landing CTA overlay */}
      {step === "landing" && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-10 sm:pb-14">
          <div className="pointer-events-auto w-full max-w-xl rounded-2xl border border-[#8a7350]/25 bg-[#0b0906]/70 px-6 py-6 text-center backdrop-blur-md sm:px-10 sm:py-8">
            <h2
              style={{ fontFamily: '"Space Mono", monospace', color: "#e8dcc3" }}
              className="text-sm tracking-[0.25em] sm:text-base"
            >
              READY TO READ THE LAND?
            </h2>
            <p
              style={{ fontFamily: '"Space Mono", monospace', color: "#8a7350" }}
              className="mt-3 text-xs leading-relaxed sm:text-sm"
            >
              Start with a location and turn geographic data into structured
              land intelligence.
            </p>
            <button
              type="button"
              onClick={() => setStep("onboarding")}
              style={{ fontFamily: '"Space Mono", monospace', color: "#e8dcc3", borderColor: "rgba(242,200,121,0.35)" }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs tracking-[0.2em] transition-colors hover:bg-[#f2c879] hover:text-[#0b0906] sm:text-sm"
            >
              GET STARTED →
            </button>
          </div>
        </div>
      )}

      {/* STEPS 2–4 (profile → data type → analysis input), per the onboarding flow */}
      {step === "onboarding" && (
        <GeoScanOnboarding
          onComplete={handleOnboardingComplete}
          onExit={() => setStep("landing")}
        />
      )}

      {/* Placeholder workspace entry point — ready for backend integration */}
      {step === "workspace" && result && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#0b0906]/90 px-4 py-8 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-[#8a7350]/25 bg-[#0b0906]/80 px-6 py-8 sm:px-10 sm:py-10">
            <h1
              style={{ fontFamily: '"Bodoni Moda", serif', color: "#e8dcc3" }}
              className="text-center text-lg tracking-[0.08em] sm:text-xl"
            >
              ANALYSIS QUEUED
            </h1>
            <p
              style={{ fontFamily: '"Space Mono", monospace', color: "#8a7350" }}
              className="mt-3 text-center text-[11px] leading-relaxed sm:text-xs"
            >
              GeoScanAI is preparing your workspace, {result.profile.firstName}.
            </p>

            <div
              style={{ fontFamily: '"Space Mono", monospace', color: "#e8dcc3" }}
              className="mt-8 space-y-2 text-xs sm:text-sm"
            >
              <div>Mode: {result.dataType === "professional" ? "Professional analysis" : "Standard analysis"}</div>
              <div>Latitude: {result.latitude}</div>
              <div>Longitude: {result.longitude}</div>
              {result.pdfFile && <div>Attached: {result.pdfFile.name}</div>}
            </div>

            <button
              type="button"
              onClick={() => setStep("onboarding")}
              style={{ fontFamily: '"Space Mono", monospace', color: "#e8dcc3", borderColor: "rgba(242,200,121,0.35)" }}
              className="mt-8 w-full rounded-full border px-6 py-2.5 text-xs tracking-[0.2em] transition-colors hover:bg-[#f2c879] hover:text-[#0b0906] sm:text-sm"
            >
              START A NEW ANALYSIS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
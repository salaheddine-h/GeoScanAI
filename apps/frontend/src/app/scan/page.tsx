"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GeoScanOnboarding, {
  OnboardingResult,
} from "@/components/ui/geoscan-onboarding";
import {
  AnalysisResponse,
  AnalysisInputType,
  submitAnalysis,
} from "@/lib/analysis";

interface AnalysisResult {
  response: AnalysisResponse;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default function ScanPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleComplete = async (data: OnboardingResult) => {
    const latitude = Number(data.latitude);
    const longitude = Number(data.longitude);
    const inputType: AnalysisInputType =
      data.dataType === "professional" ? "USER_DATA" : "COORDINATES_ONLY";

    const response = await submitAnalysis({
      latitude,
      longitude,
      inputType,
    });

    setResult({
      response,
      coordinates: { latitude, longitude },
    });
  };

  const handleExit = () => {
    router.push("/");
  };

  if (result) {
    return (
      <main className="min-h-screen bg-[#0b0906] px-6 py-24 text-[#e8dcc3] sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p
            className="font-mono text-[10px] tracking-[0.35em] text-[#8a7350]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            GEOSCANAI · ANALYSIS SUBMITTED
          </p>

          <h1 className="mt-6 font-serif text-4xl sm:text-6xl">
            Analysis underway.
          </h1>

          <p className="mt-6 text-sm leading-6 text-[#8a7350]">
            We&apos;re processing the location at {result.coordinates.latitude},{" "}
            {result.coordinates.longitude}.
          </p>

          <div className="mt-8 rounded-lg border border-[#8a7350]/30 bg-[#0b0906]/50 p-5">
            <p
              className="text-[10px] tracking-[0.3em] text-[#8a7350]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              STATUS
            </p>
            <p
              className="mt-2 text-sm capitalize text-[#e8dcc3]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              {result.response.status}
            </p>
            <p className="mt-1 text-xs text-[#8a7350]">
              {result.response.message}
            </p>
          </div>

          <button
            onClick={() => setResult(null)}
            className="mt-10 rounded-full border border-[#8a7350]/50 px-7 py-3 text-[10px] tracking-[0.25em] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            START NEW ANALYSIS →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <GeoScanOnboarding onComplete={handleComplete} onExit={handleExit} />
    </main>
  );
}

"use client";

import { useState } from "react";
import GeoScanHero from "@/components/ui/geoscan-hero";

type Step = "landing" | "profile" | "analysis";

interface ProfileData {
  fullName: string;
  profession: string;
  company: string;
}

interface AnalysisData {
  latitude: string;
  longitude: string;
  name: string;
}

export default function DemoOne() {
  const [step, setStep] = useState<Step>("landing");

  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    profession: "",
    company: "",
  });
  const [profileErrors, setProfileErrors] = useState<{
    fullName?: string;
    profession?: string;
  }>({});

  const [analysis, setAnalysis] = useState<AnalysisData>({
    latitude: "",
    longitude: "",
    name: "",
  });

  const handleContinueFromProfile = () => {
    const errors: { fullName?: string; profession?: string } = {};
    if (!profile.fullName.trim()) errors.fullName = "Full name is required.";
    if (!profile.profession.trim()) errors.profession = "Profession is required.";

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }

    setProfileErrors({});
    setStep("analysis");
  };

  const handleAnalyzeLand = () => {
    // TODO: wire this into the existing analysis/API logic.
    // No API call existed in the original page.tsx, so nothing is being
    // removed or replaced here — this just prepares the payload.
    console.log("Analyze land requested", { profile, analysis });
  };

  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Existing hero — untouched, always mounted so its animations keep running */}
      <GeoScanHero fullBleed />

      {/* STEP 1: Landing CTA overlay */}
      {step === "landing" && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-10 sm:pb-14">
          <div className="pointer-events-auto w-full max-w-xl rounded-2xl border border-white/10 bg-black/60 px-6 py-6 text-center backdrop-blur-md sm:px-10 sm:py-8">
            <h2 className="text-sm font-medium tracking-[0.25em] text-white sm:text-base">
              READY TO READ THE LAND?
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-white/60 sm:text-sm">
              Start with a location and turn geographic data into structured
              land intelligence.
            </p>
            <button
              type="button"
              onClick={() => setStep("profile")}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-xs font-medium tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black sm:text-sm"
            >
              GET STARTED →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Profile overlay */}
      {step === "profile" && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/85 px-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/70 px-6 py-8 sm:px-10 sm:py-10">
            <h1 className="text-center text-sm font-medium tracking-[0.25em] text-white sm:text-base">
              WELCOME TO GEOSCANAI
            </h1>
            <p className="mt-3 text-center text-xs leading-relaxed text-white/60 sm:text-sm">
              Tell us a little about yourself before we begin.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, fullName: e.target.value }))
                  }
                  placeholder="Your name"
                  className="w-full border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
                />
                {profileErrors.fullName && (
                  <p className="mt-1 text-xs text-red-400/80">
                    {profileErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={profile.profession}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, profession: e.target.value }))
                  }
                  placeholder="Your profession"
                  className="w-full border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
                />
                {profileErrors.profession && (
                  <p className="mt-1 text-xs text-red-400/80">
                    {profileErrors.profession}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, company: e.target.value }))
                  }
                  placeholder="Optional"
                  className="w-full border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinueFromProfile}
              className="mt-8 w-full rounded-full border border-white/20 px-6 py-2.5 text-xs font-medium tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black sm:text-sm"
            >
              CONTINUE →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Analysis overlay */}
      {step === "analysis" && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/85 px-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/70 px-6 py-8 sm:px-10 sm:py-10">
            <h1 className="text-center text-sm font-medium tracking-[0.25em] text-white sm:text-base">
              START A NEW ANALYSIS
            </h1>
            <p className="mt-3 text-center text-xs leading-relaxed text-white/60 sm:text-sm">
              Give GeoScanAI a location to begin understanding the land.
            </p>

            <div className="mt-8 space-y-5">
              <input
                type="text"
                value={analysis.latitude}
                onChange={(e) =>
                  setAnalysis((a) => ({ ...a, latitude: e.target.value }))
                }
                placeholder="31.7917"
                className="w-full border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
              />
              <input
                type="text"
                value={analysis.longitude}
                onChange={(e) =>
                  setAnalysis((a) => ({ ...a, longitude: e.target.value }))
                }
                placeholder="-7.0926"
                className="w-full border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
              />
              <input
                type="text"
                value={analysis.name}
                onChange={(e) =>
                  setAnalysis((a) => ({ ...a, name: e.target.value }))
                }
                placeholder="e.g. Project Alpha"
                className="w-full border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleAnalyzeLand}
              className="mt-8 w-full rounded-full border border-white/20 px-6 py-2.5 text-xs font-medium tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black sm:text-sm"
            >
              ANALYZE LAND →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

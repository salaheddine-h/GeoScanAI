"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnalysisApiError, getAnalysis } from "@/lib/analysis";

const FONT_LINK_ID = "geoscan-scan-fonts";
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400..900;1,400..900&family=Space+Mono:wght@400;700&display=swap";

function ensureFontsLoaded() {
  if (typeof document === "undefined") return;
  if (!document.getElementById(FONT_LINK_ID)) {
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }
}

interface AnalysisData {
  id: string;
  key: string;
  latitude: number;
  longitude: number;
  inputType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AnalysisIdPage() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    ensureFontsLoaded();
  }, []);

  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getAnalysis(id)
      .then((res) => {
        setAnalysis(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof AnalysisApiError) {
          if (err.status === 404) {
            setError("Analysis not found. The requested analysis does not exist.");
          } else {
            setError(err.message || "Failed to load analysis.");
          }
        } else {
          setError("Unable to reach the server. Please check your connection.");
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0906] px-6 py-24 text-[#e8dcc3] sm:px-10">
        <div className="mx-auto max-w-xl text-center">
          <p
            className="font-mono text-[10px] tracking-[0.35em] text-[#8a7350]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            GEOSCANAI · LOADING
          </p>
          <p
            className="mt-8 text-[15px] text-[#a89470]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            Retrieving analysis...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#0b0906] px-6 py-24 text-[#e8dcc3] sm:px-10">
        <div className="mx-auto max-w-xl">
          <p
            className="font-mono text-[10px] tracking-[0.35em] text-[#8a7350]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            GEOSCANAI · ERROR
          </p>

          <h1
            className="mt-6 text-4xl leading-tight sm:text-5xl"
            style={{ fontFamily: '"Bodoni Moda", serif' }}
          >
            Analysis unavailable.
          </h1>

          <div
            className="mt-8 rounded-lg border border-[#DC2626]/30 bg-[#DC2626]/10 p-5"
            role="alert"
          >
            <p
              className="text-[14px] text-[#DC2626]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              {error}
            </p>
          </div>

          <div className="mt-10 flex gap-4">
            <Link
              href="/scan"
              className="inline-flex items-center gap-3 rounded-full border border-[#8a7350]/50 px-7 py-3 text-[10px] tracking-[0.25em] text-[#e8dcc3] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              START NEW ANALYSIS
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!analysis) return null;

  const createdDate = new Date(analysis.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[#0b0906] px-6 py-24 text-[#e8dcc3] sm:px-10">
      <div className="mx-auto max-w-xl">
        <Link
          href="/scan"
          className="inline-flex items-center text-[10px] tracking-[0.2em] text-[#6f6047] transition-colors hover:text-[#a89470]"
          style={{ fontFamily: '"Space Mono", monospace' }}
        >
          ← Back to scan
        </Link>

        <p
          className="mt-8 font-mono text-[10px] tracking-[0.35em] text-[#8a7350]"
          style={{ fontFamily: '"Space Mono", monospace' }}
        >
          GEOSCANAI · ANALYSIS SUBMITTED
        </p>

        <h1
          className="mt-6 text-4xl leading-tight sm:text-5xl"
          style={{ fontFamily: '"Bodoni Moda", serif' }}
        >
          Analysis ready.
        </h1>

        <p className="mt-6 text-sm leading-6 text-[#a89470]">
          The analysis request has been received.
        </p>

        <div className="mt-10 space-y-3">
          <div className="rounded-lg border border-[#8a7350]/20 p-5">
            <p
              className="font-mono text-[9px] tracking-[0.3em] text-[#8a7350]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              ANALYSIS ID
            </p>
            <p
              className="mt-2 truncate text-[15px] text-[#e8dcc3]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              {analysis.id}
            </p>
          </div>

          <div className="rounded-lg border border-[#8a7350]/20 p-5">
            <p
              className="font-mono text-[9px] tracking-[0.3em] text-[#8a7350]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              LOCATION
            </p>
            <p
              className="mt-2 text-[15px] text-[#e8dcc3]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              {analysis.latitude}, {analysis.longitude}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[#8a7350]/20 p-5">
              <p
                className="font-mono text-[9px] tracking-[0.3em] text-[#8a7350]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                INPUT
              </p>
              <p
                className="mt-2 text-[15px] capitalize text-[#e8dcc3]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                {analysis.inputType.toLowerCase().replace(/_/g, " ")}
              </p>
            </div>

            <div className="rounded-lg border border-[#8a7350]/20 p-5">
              <p
                className="font-mono text-[9px] tracking-[0.3em] text-[#8a7350]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                STATUS
              </p>
              <p
                className="mt-2 text-[15px] capitalize text-[#e8dcc3]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                {analysis.status}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#8a7350]/20 p-5">
            <p
              className="font-mono text-[9px] tracking-[0.3em] text-[#8a7350]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              CREATED
            </p>
            <p
              className="mt-2 text-[15px] text-[#e8dcc3]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              {createdDate}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p
            className="font-mono text-[10px] tracking-[0.35em] text-[#8a7350]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            ANALYSIS ENGINE
          </p>
          <p
            className="mt-3 text-[14px] text-[#a89470]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            Awaiting processing...
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/scan"
            className="inline-flex items-center gap-3 rounded-full border border-[#8a7350]/50 px-7 py-3 text-[10px] tracking-[0.25em] text-[#e8dcc3] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            START NEW ANALYSIS
            <span className="text-sm">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

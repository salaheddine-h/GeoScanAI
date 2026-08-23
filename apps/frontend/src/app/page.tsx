"use client";

import { useEffect, useState } from "react";

type InputType = "COORDINATES_ONLY" | "USER_DATA";

type AnalysisResponse = {
  message?: string;
  location?: string | { name?: string; label?: string };
  overallScore?: number;
  score?: number;
  suitabilityScore?: number;
  terrain?: unknown;
  soil?: unknown;
  climate?: unknown;
  accessibility?: unknown;
  evidence?: Array<string | { source?: string; url?: string; label?: string }>;
  sources?: Array<string | { source?: string; url?: string; label?: string }>;
  aiInterpretation?: string;
  interpretation?: string;
  [key: string]: unknown;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://geoscanai.onrender.com";

const LOADING_STAGES = [
  "Establishing coordinates",
  "Collecting geographic data",
  "Processing terrain and environmental signals",
  "Cross-referencing land intelligence sources",
];

// ── Assumptions about the API response shape ──────────────────────────────
// The backend contract is unknown beyond `message`, so every result field
// below is read defensively (several possible key names, graceful fallback
// to an explicit "not available yet" state). Nothing is invented — only
// values genuinely present in the response are rendered as data.
// ────────────────────────────────────────────────────────────────────────

function firstScore(data: AnalysisResponse): number | null {
  const candidates = [data.overallScore, data.score, data.suitabilityScore];
  for (const c of candidates) {
    if (typeof c === "number" && Number.isFinite(c)) return Math.max(0, Math.min(100, c));
  }
  return null;
}

function locationLabel(data: AnalysisResponse, lat: string, lon: string): string {
  if (typeof data.location === "string" && data.location.trim()) return data.location;
  if (data.location && typeof data.location === "object") {
    const l = data.location as { name?: string; label?: string };
    if (l.name) return l.name;
    if (l.label) return l.label;
  }
  return `${lat}, ${lon}`;
}

function asEvidenceList(data: AnalysisResponse): Array<{ label: string; url?: string }> {
  const raw = data.evidence ?? data.sources;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === "string") return { label: item };
      if (item && typeof item === "object") {
        const o = item as { source?: string; url?: string; label?: string };
        return { label: o.label ?? o.source ?? o.url ?? "Untitled source", url: o.url };
      }
      return null;
    })
    .filter((x): x is { label: string; url?: string } => x !== null);
}

// ── Small local icons (no icon library — kept deliberately minimal) ───────

function IconCrosshair({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 0.5V3.5M8 12.5V15.5M0.5 8H3.5M12.5 8H15.5" strokeLinecap="round" />
    </svg>
  );
}

function IconUpload({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 10.5V1.5M8 1.5L4.5 5M8 1.5L11.5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 11V13.5C1.5 14.0523 1.94772 14.5 2.5 14.5H13.5C14.0523 14.5 14.5 14.0523 14.5 13.5V11" strokeLinecap="round" />
    </svg>
  );
}

function IconAlert({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 1.5L15 14H1L8 1.5Z" strokeLinejoin="round" />
      <path d="M8 6V9.5" strokeLinecap="round" />
      <circle cx="8" cy="11.75" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── Layout primitives ──────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">{children}</p>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-md border border-zinc-800/80 bg-[#0e1013] ${className}`}>{children}</div>;
}

export default function Home() {
  const [inputType, setInputType] = useState<InputType>("COORDINATES_ONLY");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [userFile, setUserFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState("");
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      setStageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStageIndex((i) => (i + 1) % LOADING_STAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUserFile(null);
      return;
    }
    if (!file.name.toLowerCase().endsWith(".pdf") || file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      e.target.value = "";
      setUserFile(null);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("PDF file must be smaller than 10 MB.");
      e.target.value = "";
      setUserFile(null);
      return;
    }
    setError("");
    setUserFile(file);
  };

  const removeFile = () => {
    setUserFile(null);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!latitude || !longitude) throw new Error("Please provide latitude and longitude.");
      if (inputType === "USER_DATA" && !userFile) throw new Error("Please upload a PDF file.");

      const latitudeValue = Number(latitude);
      const longitudeValue = Number(longitude);

      if (!Number.isFinite(latitudeValue) || latitudeValue < -90 || latitudeValue > 90) {
        throw new Error("Latitude must be between -90 and 90.");
      }

      if (!Number.isFinite(longitudeValue) || longitudeValue < -180 || longitudeValue > 180) {
        throw new Error("Longitude must be between -180 and 180.");
      }

      const formData = new FormData();
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("inputType", inputType);
      if (inputType === "USER_DATA" && userFile) formData.append("file", userFile);

      const response = await fetch(`${API_BASE_URL}/analysis`, {
        method: "POST",
        body: formData,
      });

      let data: AnalysisResponse;
      try {
        data = await response.json();
      } catch {
        throw new Error("Backend returned an invalid response.");
      }

      if (!response.ok) throw new Error(data.message || "Analysis request failed.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const hasCoords = Boolean(latitude && longitude);
  const score = result ? firstScore(result) : null;
  const evidence = result ? asEvidenceList(result) : [];
  const interpretation = result?.aiInterpretation ?? result?.interpretation ?? null;

  return (
    <main className="min-h-screen bg-[#0a0b0d] text-zinc-200 selection:bg-teal-400/20">
      <style>{`
        @keyframes gsa-sweep { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes gsa-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        .gsa-mono { font-variant-numeric: tabular-nums; }
      `}</style>

      {/* Header */}
      <header className="border-b border-zinc-800/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-zinc-700 text-teal-400">
              <IconCrosshair className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-[15px] font-semibold tracking-tight text-zinc-100">GeoScanAI</h1>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">Land Intelligence Platform</p>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <span className="border-b border-teal-400/70 pb-1 text-sm text-zinc-200">Analysis</span>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* Hero */}
        <div className="mb-12 max-w-2xl">
          <Eyebrow>New Analysis</Eyebrow>
          <h2 className="mt-3 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-zinc-50">
            Analyze a location
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
            Turn geographic data into structured land intelligence.
          </p>
        </div>

        {/* Workspace */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Input panel */}
          <Panel className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <Eyebrow>Analysis Input</Eyebrow>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInputType("COORDINATES_ONLY");
                      setUserFile(null);
                      setError("");
                    }}
                    className={`rounded-md border p-4 text-left transition-colors ${
                      inputType === "COORDINATES_ONLY"
                        ? "border-teal-400/60 bg-teal-400/[0.06]"
                        : "border-zinc-800 bg-transparent hover:border-zinc-700"
                    }`}
                  >
                    <IconCrosshair className={`mb-3 h-4 w-4 ${inputType === "COORDINATES_ONLY" ? "text-teal-400" : "text-zinc-600"}`} />
                    <div className="text-sm font-medium text-zinc-100">Coordinates</div>
                    <div className="mt-1 text-xs leading-relaxed text-zinc-500">Analyze using location coordinates.</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputType("USER_DATA");
                      setError("");
                    }}
                    className={`rounded-md border p-4 text-left transition-colors ${
                      inputType === "USER_DATA"
                        ? "border-teal-400/60 bg-teal-400/[0.06]"
                        : "border-zinc-800 bg-transparent hover:border-zinc-700"
                    }`}
                  >
                    <IconUpload className={`mb-3 h-4 w-4 ${inputType === "USER_DATA" ? "text-teal-400" : "text-zinc-600"}`} />
                    <div className="text-sm font-medium text-zinc-100">User data</div>
                    <div className="mt-1 text-xs leading-relaxed text-zinc-500">Add a PDF with your own land data.</div>
                  </button>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="latitude" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                    Latitude
                  </label>
                  <input
                    id="latitude"
                    type="number"
                    step="any"
                    min="-90"
                    max="90"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="31.7917"
                    required
                    className="w-full rounded-md border border-zinc-800 bg-[#0a0b0d] px-4 py-3 font-mono text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-700 focus:border-teal-400/50"
                  />
                </div>
                <div>
                  <label htmlFor="longitude" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                    Longitude
                  </label>
                  <input
                    id="longitude"
                    type="number"
                    step="any"
                    min="-180"
                    max="180"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="-7.0926"
                    required
                    className="w-full rounded-md border border-zinc-800 bg-[#0a0b0d] px-4 py-3 font-mono text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-700 focus:border-teal-400/50"
                  />
                </div>
              </div>

              {inputType === "USER_DATA" && (
                <div>
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">Land data PDF</label>
                  <div className="rounded-md border border-dashed border-zinc-800 bg-[#0a0b0d]/60 p-5">
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-zinc-500 file:mr-4 file:rounded-md file:border file:border-zinc-700 file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-wide file:text-zinc-300 hover:file:border-teal-400/50 hover:file:text-teal-300"
                    />
                    {userFile && (
                      <div className="mt-4 flex items-center justify-between rounded-md border border-zinc-800 bg-[#0e1013] px-3 py-2.5 text-sm">
                        <div className="min-w-0">
                          <span className="block truncate text-zinc-200">{userFile.name}</span>
                          <span className="font-mono text-[11px] text-zinc-600">{(userFile.size / 1024).toFixed(0)} KB</span>
                        </div>
                        <button type="button" onClick={removeFile} className="ml-3 shrink-0 text-xs text-zinc-500 hover:text-zinc-200">
                          Remove
                        </button>
                      </div>
                    )}
                    <p className="mt-2 font-mono text-[11px] text-zinc-600">PDF only · maximum 10 MB</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2.5 rounded-md border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-300">
                  <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-teal-400 px-5 py-3 text-sm font-semibold text-[#0a0b0d] transition-colors hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Analyzing…" : "Run analysis"}
              </button>
            </form>
          </Panel>

          {/* Location preview */}
          <Panel className="relative flex min-h-[280px] flex-col overflow-hidden lg:min-h-0">
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-3">
              <Eyebrow>Location Preview</Eyebrow>
              {loading && <span className="h-1.5 w-1.5 rounded-full bg-teal-400" style={{ animation: "gsa-pulse 1.4s ease-in-out infinite" }} />}
            </div>

            <div className="relative flex-1">
              {/* Contour grid backdrop */}
              <svg viewBox="0 0 380 320" className="absolute inset-0 h-full w-full text-zinc-800" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="gsa-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="380" height="320" fill="url(#gsa-grid)" />
                <path
                  d="M-10 240 C 60 200, 120 260, 190 220 S 320 180, 400 230"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <path
                  d="M-10 280 C 70 250, 130 300, 200 265 S 330 225, 400 270"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <path
                  d="M-10 60 C 80 30, 140 80, 210 45 S 320 20, 400 55"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </svg>

              {loading && (
                <div
                  className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-teal-400/10 to-transparent"
                  style={{ animation: "gsa-sweep 2.6s linear infinite" }}
                />
              )}

              {/* Crosshair marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`relative flex h-14 w-14 items-center justify-center ${hasCoords ? "text-teal-400" : "text-zinc-700"}`}>
                  <IconCrosshair className="h-full w-full" />
                  {hasCoords && <span className="absolute h-1.5 w-1.5 rounded-full bg-teal-400" />}
                </div>
              </div>

              {/* Coordinate readout */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="gsa-mono font-mono text-xs leading-relaxed text-zinc-400">
                  <div>LAT {latitude ? Number(latitude).toFixed(4) : "—.————"}</div>
                  <div>LON {longitude ? Number(longitude).toFixed(4) : "—.————"}</div>
                </div>
                <span className="rounded-sm border border-zinc-800 bg-[#0a0b0d]/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-zinc-600">
                  Map pending
                </span>
              </div>
            </div>

            <div className="border-t border-zinc-800/80 px-5 py-3">
              <p className="text-xs leading-relaxed text-zinc-600">
                Placeholder view — ready to be replaced with MapLibre, Mapbox, or Leaflet.
              </p>
            </div>
          </Panel>
        </div>

        {/* Loading state */}
        {loading && (
          <Panel className="mt-6 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" style={{ animation: "gsa-pulse 1.2s ease-in-out infinite" }} />
              <span className="text-sm font-medium text-zinc-100">Analyzing location…</span>
            </div>
            <ul className="mt-4 space-y-2 pl-4">
              {LOADING_STAGES.map((stage, i) => (
                <li
                  key={stage}
                  className={`font-mono text-xs transition-colors ${
                    i === stageIndex ? "text-teal-300" : i < stageIndex ? "text-zinc-600 line-through" : "text-zinc-700"
                  }`}
                >
                  {stage}
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="mt-10">
            <Eyebrow>Analysis Result</Eyebrow>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4 border-b border-zinc-800/80 pb-6">
              <div>
                <h3 className="text-xl font-semibold text-zinc-50">{locationLabel(result, latitude, longitude)}</h3>
                <p className="mt-1 font-mono text-xs text-zinc-600">
                  {inputType === "COORDINATES_ONLY" ? "Coordinate analysis" : "User data analysis"}
                </p>
              </div>
              <ScoreDial score={score} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Terrain" value={result.terrain} />
              <MetricCard label="Soil" value={result.soil} />
              <MetricCard label="Climate" value={result.climate} />
              <MetricCard label="Accessibility" value={result.accessibility} />
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Panel className="p-6">
                <Eyebrow>Evidence / Data Sources</Eyebrow>
                {evidence.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {evidence.map((e, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                        {e.url ? (
                          <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:underline">
                            {e.label}
                          </a>
                        ) : (
                          <span>{e.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyNote>Not available yet</EmptyNote>
                )}
              </Panel>

              <Panel className="p-6">
                <Eyebrow>AI Interpretation</Eyebrow>
                {interpretation ? (
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">{interpretation}</p>
                ) : (
                  <EmptyNote>Not available yet</EmptyNote>
                )}
              </Panel>
            </div>

            <details className="mt-4 rounded-md border border-zinc-800/80 bg-[#0e1013] p-4">
              <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                Raw backend response
              </summary>
              <pre className="mt-3 overflow-auto font-mono text-xs leading-relaxed text-zinc-500">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </section>
    </main>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 font-mono text-xs text-zinc-600">{children}</p>;
}

function ScoreDial({ score }: { score: number | null }) {
  const size = 72;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = score ?? 0;
  const offset = c - (pct / 100) * c;

  return (
    <div className="flex items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#27272a" strokeWidth={stroke} />
          {score !== null && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#2dd4bf"
              strokeWidth={stroke}
              strokeDasharray={c}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="gsa-mono font-mono text-sm text-zinc-100">{score !== null ? Math.round(score) : "—"}</span>
        </div>
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">Overall Suitability</p>
        <p className="font-mono text-xs text-zinc-600">{score !== null ? `${Math.round(score)} / 100` : "Not available yet"}</p>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: unknown }) {
  const hasValue = value !== undefined && value !== null && value !== "";
  return (
    <Panel className="p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <div className="mt-3">
        {!hasValue && <p className="font-mono text-xs text-zinc-600">Not available yet</p>}
        {hasValue && typeof value === "string" && <p className="text-sm leading-relaxed text-zinc-300">{value}</p>}
        {hasValue && typeof value === "number" && <p className="text-lg font-semibold text-zinc-100">{value}</p>}
        {hasValue && typeof value === "object" && (
          <dl className="space-y-1.5">
            {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-xs">
                <dt className="text-zinc-600">{k}</dt>
                <dd className="truncate text-zinc-300">{String(v)}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Panel>
  );
}
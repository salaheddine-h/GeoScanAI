"use client";

import { useEffect, useState, useCallback } from "react";
import {
  AnalysisInputType,
  AnalysisResponse,
  AnalysisApiError,
  submitAnalysis,
} from "@/lib/analysis";

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

type FormState = "form" | "review" | "result";

interface FormData {
  latitude: string;
  longitude: string;
  inputType: AnalysisInputType;
}

interface FormErrors {
  latitude?: string;
  longitude?: string;
}

export default function ScanPage() {
  useEffect(() => {
    ensureFontsLoaded();
  }, []);

  const [state, setState] = useState<FormState>("form");
  const [formData, setFormData] = useState<FormData>({
    latitude: "",
    longitude: "",
    inputType: "COORDINATES_ONLY",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ latitude?: boolean; longitude?: boolean }>({});
  const [response, setResponse] = useState<AnalysisResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateLat = useCallback((value: string): string | undefined => {
    if (!value.trim()) return "Latitude is required.";
    const lat = Number(value);
    if (Number.isNaN(lat) || lat < -90 || lat > 90) return "Must be between -90 and 90.";
    return undefined;
  }, []);

  const validateLon = useCallback((value: string): string | undefined => {
    if (!value.trim()) return "Longitude is required.";
    const lon = Number(value);
    if (Number.isNaN(lon) || lon < -180 || lon > 180) return "Must be between -180 and 180.";
    return undefined;
  }, []);

  const handleFieldChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setApiError(null);
      if (field === "latitude" || field === "longitude") {
        const validator = field === "latitude" ? validateLat : validateLon;
        setErrors((prev) => ({ ...prev, [field]: validator(value) }));
      }
    },
    [validateLat, validateLon],
  );

  const handleFieldBlur = useCallback(
    (field: "latitude" | "longitude") => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const validator = field === "latitude" ? validateLat : validateLon;
      setErrors((prev) => ({ ...prev, [field]: validator(formData[field]) }));
    },
    [validateLat, validateLon, formData],
  );

  const handleContinue = useCallback(() => {
    const latErr = validateLat(formData.latitude);
    const lonErr = validateLon(formData.longitude);
    setTouched({ latitude: true, longitude: true });
    setErrors({ latitude: latErr, longitude: lonErr });
    if (latErr || lonErr) return;
    setState("review");
  }, [formData, validateLat, validateLon]);

  const handleStartAnalysis = useCallback(async () => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await submitAnalysis({
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        inputType: formData.inputType,
      });
      setIsSubmitting(false);
      setResponse(res);
      setState("result");
    } catch (err) {
      if (err instanceof AnalysisApiError) {
        setApiError(err.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleNewAnalysis = useCallback(() => {
    setFormData({ latitude: "", longitude: "", inputType: "COORDINATES_ONLY" });
    setErrors({});
    setTouched({});
    setResponse(null);
    setApiError(null);
    setIsSubmitting(false);
    setState("form");
  }, []);

  const latDisplay = formData.latitude
    ? Number(formData.latitude).toFixed(4)
    : "—";
  const lonDisplay = formData.longitude
    ? Number(formData.longitude).toFixed(4)
    : "—";

  return (
    <main className="min-h-screen bg-[#0b0906] px-6 py-24 text-[#e8dcc3] sm:px-10">
      <div className="mx-auto max-w-xl">
        {state === "form" && (
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.35em] text-[#8a7350]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              GEOSCANAI · NEW ANALYSIS
            </p>

            <h1
              className="mt-6 text-4xl leading-tight sm:text-5xl"
              style={{ fontFamily: '"Bodoni Moda", serif' }}
            >
              Where should
              <br />
              GeoScanAI look?
            </h1>

            <div className="mt-10 space-y-7">
              <div>
                <label
                  htmlFor="latitude"
                  className="mb-1.5 block font-mono text-[10px] tracking-[0.25em] text-[#a89470]"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                >
                  LATITUDE
                </label>
                <input
                  id="latitude"
                  type="text"
                  inputMode="decimal"
                  value={formData.latitude}
                  onChange={(e) => handleFieldChange("latitude", e.target.value)}
                  onBlur={() => handleFieldBlur("latitude")}
                  placeholder="33.5731"
                  aria-invalid={!!errors.latitude}
                  aria-describedby={errors.latitude ? "latitude-error" : undefined}
                  className="w-full rounded-lg border border-[#8a7350]/30 bg-transparent px-4 py-3 text-[15px] text-[#e8dcc3] placeholder:text-[#6f6047] focus:border-[#8a7350]/70 focus:outline-none"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                />
                {errors.latitude ? (
                  <p
                    id="latitude-error"
                    role="alert"
                    className="mt-2 text-[12.5px] text-[#DC2626]"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    {errors.latitude}
                  </p>
                ) : (
                  <p
                    className="mt-2 text-[11px] text-[#6f6047]"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    -90 to 90
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="longitude"
                  className="mb-1.5 block font-mono text-[10px] tracking-[0.25em] text-[#a89470]"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                >
                  LONGITUDE
                </label>
                <input
                  id="longitude"
                  type="text"
                  inputMode="decimal"
                  value={formData.longitude}
                  onChange={(e) => handleFieldChange("longitude", e.target.value)}
                  onBlur={() => handleFieldBlur("longitude")}
                  placeholder="-7.5898"
                  aria-invalid={!!errors.longitude}
                  aria-describedby={errors.longitude ? "longitude-error" : undefined}
                  className="w-full rounded-lg border border-[#8a7350]/30 bg-transparent px-4 py-3 text-[15px] text-[#e8dcc3] placeholder:text-[#6f6047] focus:border-[#8a7350]/70 focus:outline-none"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                />
                {errors.longitude ? (
                  <p
                    id="longitude-error"
                    role="alert"
                    className="mt-2 text-[12.5px] text-[#DC2626]"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    {errors.longitude}
                  </p>
                ) : (
                  <p
                    className="mt-2 text-[11px] text-[#6f6047]"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    -180 to 180
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="inputType"
                  className="mb-1.5 block font-mono text-[10px] tracking-[0.25em] text-[#a89470]"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                >
                  INPUT TYPE
                </label>
                <select
                  id="inputType"
                  value={formData.inputType}
                  onChange={(e) =>
                    handleFieldChange("inputType", e.target.value as AnalysisInputType)
                  }
                  className="w-full appearance-none rounded-lg border border-[#8a7350]/30 bg-transparent px-4 py-3 text-[15px] text-[#e8dcc3] focus:border-[#8a7350]/70 focus:outline-none"
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\'%3E%3Cpath d=\'M2 4l4 4 4-4\' stroke=\'%238a7350\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="COORDINATES_ONLY">Coordinates Only</option>
                  <option value="USER_DATA">User Data</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#8a7350]/50 px-7 py-3 text-[10px] tracking-[0.25em] text-[#e8dcc3] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              CONTINUE
              <span className="text-sm">→</span>
            </button>
          </div>
        )}

        {state === "review" && (
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.35em] text-[#8a7350]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              GEOSCANAI · REVIEW
            </p>

            <h1
              className="mt-6 text-4xl leading-tight sm:text-5xl"
              style={{ fontFamily: '"Bodoni Moda", serif' }}
            >
              Analysis ready.
            </h1>

            <div className="mt-10 space-y-5">
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
                  {latDisplay}, {lonDisplay}
                </p>
              </div>

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
                  {formData.inputType.toLowerCase().replace(/_/g, " ")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartAnalysis}
              disabled={isSubmitting}
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#8a7350]/50 px-7 py-3 text-[10px] tracking-[0.25em] text-[#e8dcc3] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              START ANALYSIS
              <span className="text-sm">→</span>
            </button>

            <button
              type="button"
              onClick={handleNewAnalysis}
              className="ml-6 inline-flex items-center text-[10px] tracking-[0.2em] text-[#6f6047] transition-colors hover:text-[#a89470]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              ← Back
            </button>
          </div>
        )}

        {state === "result" && (
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.35em] text-[#8a7350]"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              GEOSCANAI · ANALYSIS SUBMITTED
            </p>

            <h1
              className="mt-6 text-4xl leading-tight sm:text-5xl"
              style={{ fontFamily: '"Bodoni Moda", serif' }}
            >
              Analysis underway.
            </h1>

            {isSubmitting && (
              <p
                className="mt-6 text-sm text-[#a89470]"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Submitting your analysis request...
              </p>
            )}

            {!isSubmitting && response && (
              <>
                <p className="mt-6 text-sm leading-6 text-[#a89470]">
                  We&apos;re processing the location at {latDisplay}, {lonDisplay}.
                </p>

                {apiError && (
                  <div
                    className="mt-6 rounded-lg border border-[#DC2626]/30 bg-[#DC2626]/10 p-4"
                    role="alert"
                  >
                    <p
                      className="text-[13px] text-[#DC2626]"
                      style={{ fontFamily: '"Space Mono", monospace' }}
                    >
                      {apiError}
                    </p>
                  </div>
                )}

                <div className="mt-8 rounded-lg border border-[#8a7350]/30 bg-[#0b0906]/50 p-5">
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
                    {response.status}
                  </p>
                  <p
                    className="mt-1 text-[13px] text-[#a89470]"
                    style={{ fontFamily: '"Space Mono", monospace' }}
                  >
                    {response.message}
                  </p>
                  <div className="mt-4 border-t border-[#8a7350]/15 pt-4">
                    <p
                      className="font-mono text-[9px] tracking-[0.3em] text-[#8a7350]"
                      style={{ fontFamily: '"Space Mono", monospace' }}
                    >
                      PAYLOAD
                    </p>
                    <pre
                      className="mt-2 overflow-x-auto text-[11px] text-[#a89470]"
                      style={{ fontFamily: '"Space Mono", monospace' }}
                    >
                      {JSON.stringify(
                        {
                          latitude: response.data.latitude,
                          longitude: response.data.longitude,
                          inputType: response.data.inputType,
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNewAnalysis}
                  className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#8a7350]/50 px-7 py-3 text-[10px] tracking-[0.25em] text-[#e8dcc3] transition-all duration-300 hover:bg-[#e8dcc3] hover:text-[#0b0906]"
                  style={{ fontFamily: '"Space Mono", monospace' }}
                >
                  START NEW ANALYSIS
                  <span className="text-sm">→</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

const F_DISPLAY = '"Bodoni Moda", serif';
const F_CREDIT = '"Cormorant Garamond", serif';
const F_MONO = '"Space Mono", monospace';

// Palette
const COL_TEXT_PRIMARY = "#f1e9d8"; // warm ivory
const COL_TEXT_SECONDARY = "#a6906c"; // muted warm gray/gold
const COL_LABEL = "#e8c583"; // restrained warm gold
const COL_METADATA = "#7d6a4e"; // subdued metadata tone
const COL_BORDER = "rgba(166,144,108,0.24)";
const COL_FOCUS = "#e8c583";
const COL_ERROR = "#c97a5a";

const COL_CARD_BG = "rgba(12,11,9,0.66)";

export type DataType = "standard" | "professional";

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface OnboardingResult {
  profile: ProfileData;
  dataType: DataType;
  latitude: string;
  longitude: string;
  pdfFile: File | null;
}

interface GeoScanOnboardingProps {
  onComplete: (data: OnboardingResult) => void;
  onExit: () => void;
}

const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─────────────────────────────────────────────────────────────
// Shared micro-animation styles.
// ─────────────────────────────────────────────────────────────
function OnboardingMotionStyles() {
  return (
    <style>{`
      @keyframes gso-orbit-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes gso-orbit-slower { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      @keyframes gso-drift { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(6px); } }
      @keyframes gso-card-in {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .gso-orbit { animation: gso-orbit-slow 300s linear infinite; transform-origin: 400px 620px; }
      .gso-orbit-2 { animation: gso-orbit-slower 420s linear infinite; transform-origin: 400px 620px; }
      .gso-scan { animation: gso-orbit-slow 180s linear infinite; transform-origin: 400px 620px; }
      .gso-moon { animation: gso-drift 40s ease-in-out infinite; }
      .gso-card-mount { animation: gso-card-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both; }
      .gso-cta .gso-arrow { display: inline-block; transition: transform 250ms ease; }
      .gso-cta:hover:enabled .gso-arrow { transform: translateX(3px); }
      .gso-cta:hover:enabled { background: rgba(232,197,131,0.07); border-color: rgba(232,197,131,0.5); }
      .gso-input { transition: border-color 250ms ease; }
      @media (prefers-reduced-motion: reduce) {
        .gso-orbit, .gso-orbit-2, .gso-scan, .gso-moon, .gso-card-mount { animation: none; }
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────
// Background — subtle Earth-observation atmosphere, dialed back
// further so it supports the form rather than competing with it.
// ─────────────────────────────────────────────────────────────
function EarthObservationBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: 0.34 }}>
      <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <radialGradient id="gso-sun" cx="78%" cy="18%" r="55%">
            <stop offset="0%" stopColor="rgba(232,197,131,0.09)" />
            <stop offset="100%" stopColor="rgba(232,197,131,0)" />
          </radialGradient>
          <radialGradient id="gso-earth" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#241d13" />
            <stop offset="55%" stopColor="#141007" />
            <stop offset="100%" stopColor="#0a0805" />
          </radialGradient>
          <radialGradient id="gso-earth-rim" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="rgba(241,233,216,0.08)" />
            <stop offset="100%" stopColor="rgba(241,233,216,0)" />
          </radialGradient>
          <radialGradient id="gso-moon" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(166,144,108,0.22)" />
            <stop offset="100%" stopColor="rgba(166,144,108,0.03)" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="800" height="800" fill="url(#gso-sun)" />

        <circle className="gso-moon" cx="118" cy="150" r="15" fill="url(#gso-moon)" />
        <circle cx="118" cy="150" r="15" fill="none" stroke="rgba(241,233,216,0.08)" strokeWidth="0.5" />

        <circle cx="400" cy="620" r="430" fill="url(#gso-earth)" />
        <circle cx="400" cy="620" r="430" fill="url(#gso-earth-rim)" />
        <circle cx="400" cy="620" r="430" fill="none" stroke="rgba(232,197,131,0.08)" strokeWidth="1" />

        <g stroke="rgba(232,197,131,0.045)" strokeWidth="0.6" fill="none">
          <path d="M 220 520 Q 340 470 460 520 T 640 500" />
          <path d="M 200 570 Q 330 530 470 570 T 660 555" />
        </g>

        <g className="gso-orbit">
          <ellipse cx="400" cy="620" rx="470" ry="150" fill="none" stroke="rgba(232,197,131,0.06)" strokeWidth="0.6" />
        </g>
        <g className="gso-orbit-2">
          <ellipse cx="400" cy="620" rx="500" ry="200" fill="none" stroke="rgba(191,233,230,0.04)" strokeWidth="0.5" />
        </g>
        <g className="gso-scan">
          <path d="M -70 620 A 470 470 0 0 1 100 240" fill="none" stroke="rgba(191,233,230,0.05)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

function FadeStep({ stepKey, children }: { stepKey: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [stepKey]);
  return (
    <div
      style={{
        transition: "opacity 500ms ease, transform 500ms ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {children}
    </div>
  );
}

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ fontFamily: F_MONO, color: COL_METADATA }}
      className="text-[11px] tracking-[0.15em] transition-colors hover:text-[#e8c583] sm:text-xs"
    >
      ← {label}
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ fontFamily: F_MONO, color: COL_LABEL }} className="mb-2 block text-[10px] tracking-[0.22em] opacity-90 sm:text-[11px]">
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{ fontFamily: F_CREDIT, color: COL_TEXT_PRIMARY, borderColor: COL_BORDER, ...props.style }}
      className={
        "gso-input w-full border-b bg-transparent px-1 py-3 text-lg placeholder:text-[#a6906c]/45 focus:outline-none " +
        (props.className ?? "")
      }
      onFocus={(e) => {
        e.currentTarget.style.borderColor = COL_FOCUS;
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = COL_BORDER;
        props.onBlur?.(e);
      }}
    />
  );
}

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p style={{ fontFamily: F_MONO, color: COL_ERROR }} className="mt-1.5 text-[11px]">
      {children}
    </p>
  );
}

function ContinueButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: string;
}) {
  const label = children.replace("→", "").trim();
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: F_MONO,
        color: disabled ? COL_TEXT_SECONDARY : COL_TEXT_PRIMARY,
        borderColor: disabled ? "rgba(166,144,108,0.18)" : "rgba(232,197,131,0.4)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        background: "rgba(6,5,4,0.4)",
      }}
      className="gso-cta w-full rounded-full border py-4 text-sm tracking-[0.15em] transition-colors duration-300 sm:text-base"
    >
      <span>{label}</span> <span className="gso-arrow">→</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Coordinate field — the redesigned centerpiece of step 3.
// Large, legible numeric value; plain-case label; quiet helper
// text; error swaps in for the helper without shifting layout.
// ─────────────────────────────────────────────────────────────
function CoordinateField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helper,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder: string;
  error?: string;
  helper: string;
}) {
  return (
    <div>
      <div style={{ fontFamily: F_CREDIT, color: COL_TEXT_PRIMARY }} className="mb-2 text-base sm:text-lg">
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode="decimal"
        style={{ fontFamily: F_MONO, color: COL_TEXT_PRIMARY, borderColor: COL_BORDER }}
        className="gso-input w-full border-b bg-transparent px-0.5 py-2 text-3xl tracking-tight placeholder:text-[#a6906c]/35 focus:outline-none sm:text-4xl"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = COL_FOCUS;
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = COL_BORDER;
        }}
      />
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <p style={{ fontFamily: F_MONO, color: COL_METADATA }} className="mt-1.5 text-[11px] opacity-80">
          {helper}
        </p>
      )}
    </div>
  );
}

export default function GeoScanOnboarding({ onComplete, onExit }: GeoScanOnboardingProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [profile, setProfile] = useState<ProfileData>({ firstName: "", lastName: "", email: "" });
  const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof ProfileData, string>>>({});

  const [dataType, setDataType] = useState<DataType | null>(null);
  const [dataTypeError, setDataTypeError] = useState<string | undefined>();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [analysisErrors, setAnalysisErrors] = useState<{ latitude?: string; longitude?: string; pdf?: string }>({});
  const [analysisTouched, setAnalysisTouched] = useState<{ latitude?: boolean; longitude?: boolean }>({});

  const handleStep1Continue = () => {
    const errors: Partial<Record<keyof ProfileData, string>> = {};
    if (!profile.firstName.trim()) errors.firstName = "First name is required.";
    if (!profile.lastName.trim()) errors.lastName = "Last name is required.";
    if (!profile.email.trim()) errors.email = "Email is required.";
    else if (!EMAIL_RE.test(profile.email.trim())) errors.email = "Enter a valid email address.";

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
    setProfileErrors({});
    setStep(2);
  };

  const handleStep2Continue = () => {
    if (!dataType) {
      setDataTypeError("Choose an analysis mode to continue.");
      return;
    }
    setDataTypeError(undefined);
    setStep(3);
  };

  const validateLat = (value: string) => {
    if (!value.trim()) return "Latitude is required.";
    const lat = Number(value);
    if (Number.isNaN(lat) || lat < -90 || lat > 90) return "Latitude must be between −90 and 90.";
    return undefined;
  };
  const validateLon = (value: string) => {
    if (!value.trim()) return "Longitude is required.";
    const lon = Number(value);
    if (Number.isNaN(lon) || lon < -180 || lon > 180) return "Longitude must be between −180 and 180.";
    return undefined;
  };

  const handlePdfChange = (file: File | null) => {
    if (!file) {
      setPdfFile(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setAnalysisErrors((e) => ({ ...e, pdf: "File must be a PDF." }));
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setAnalysisErrors((e) => ({ ...e, pdf: "File must be under 10MB." }));
      return;
    }
    setAnalysisErrors((e) => ({ ...e, pdf: undefined }));
    setPdfFile(file);
  };

  const handleAnalyze = () => {
    const latErr = validateLat(latitude);
    const lonErr = validateLon(longitude);
    const pdfErr = dataType === "professional" && !pdfFile ? "Upload a PDF with your project data." : undefined;

    setAnalysisTouched({ latitude: true, longitude: true });

    if (latErr || lonErr || pdfErr) {
      setAnalysisErrors({ latitude: latErr, longitude: lonErr, pdf: pdfErr });
      return;
    }
    setAnalysisErrors({});
    onComplete({
      profile,
      dataType: dataType as DataType,
      latitude,
      longitude,
      pdfFile: dataType === "professional" ? pdfFile : null,
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#090806]/85 px-4 py-8 backdrop-blur-md">
      <OnboardingMotionStyles />
      <EarthObservationBackground />

      <div
        className="gso-card-mount relative w-full max-w-xl rounded-2xl px-7 py-9 sm:px-12 sm:py-12"
        style={{
          border: `1px solid ${COL_BORDER}`,
          background: COL_CARD_BG,
          backdropFilter: "blur(14px)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div className="mb-8 flex items-center justify-between">
          {step === 1 ? (
            <BackButton onClick={onExit} label="Back to intro" />
          ) : (
            <BackButton onClick={() => setStep((s) => ((s - 1) as 1 | 2 | 3))} label="Back" />
          )}
          <div style={{ fontFamily: F_MONO, color: COL_METADATA }} className="text-[11px] tracking-[0.15em] opacity-70">
            0{step} / 03
          </div>
        </div>

        {step === 1 && (
          <FadeStep stepKey="step-1">
            <h1 style={{ fontFamily: F_DISPLAY, color: COL_TEXT_PRIMARY }} className="text-center text-xl tracking-[0.06em] sm:text-2xl">
              CREATE YOUR GEOSCANAI PROFILE
            </h1>
            <p style={{ fontFamily: F_MONO, color: COL_TEXT_SECONDARY }} className="mt-3 text-center text-[11px] leading-relaxed sm:text-xs">
              Tell us who you are so we can prepare your analysis workspace.
            </p>

            <div className="mt-9 space-y-6">
              <div>
                <FieldLabel>First name</FieldLabel>
                <TextInput value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} placeholder="First name" />
                <ErrorText>{profileErrors.firstName}</ErrorText>
              </div>
              <div>
                <FieldLabel>Last name</FieldLabel>
                <TextInput value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} placeholder="Last name" />
                <ErrorText>{profileErrors.lastName}</ErrorText>
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <TextInput type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} placeholder="you@example.com" />
                <ErrorText>{profileErrors.email}</ErrorText>
              </div>
            </div>

            <div className="mt-9">
              <ContinueButton onClick={handleStep1Continue}>CONTINUE →</ContinueButton>
            </div>
          </FadeStep>
        )}

        {step === 2 && (
          <FadeStep stepKey="step-2">
            <h1 style={{ fontFamily: F_DISPLAY, color: COL_TEXT_PRIMARY }} className="text-center text-xl tracking-[0.06em] sm:text-2xl">
              WHAT DO YOU WANT TO ANALYZE?
            </h1>
            <p style={{ fontFamily: F_MONO, color: COL_TEXT_SECONDARY }} className="mt-3 text-center text-[11px] leading-relaxed sm:text-xs">
              GeoScanAI supports two ways to begin — choose the one that matches what you have.
            </p>

            <div className="mt-9 space-y-4">
              {[
                { id: "standard" as const, title: "STANDARD ANALYSIS", desc: "For a straightforward look at a location. Just provide latitude and longitude." },
                { id: "professional" as const, title: "PROFESSIONAL ANALYSIS", desc: "For when you already have land or project data. Upload a PDF alongside your coordinates." },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setDataType(opt.id);
                    setDataTypeError(undefined);
                  }}
                  style={{
                    borderColor: dataType === opt.id ? "rgba(232,197,131,0.55)" : COL_BORDER,
                    background: dataType === opt.id ? "rgba(232,197,131,0.06)" : "transparent",
                  }}
                  className="w-full rounded-xl border px-5 py-4 text-left transition-colors"
                >
                  <div style={{ fontFamily: F_MONO, color: COL_LABEL }} className="text-[11px] tracking-[0.2em] sm:text-xs">
                    {opt.title}
                  </div>
                  <div style={{ fontFamily: F_CREDIT, color: COL_TEXT_PRIMARY }} className="mt-2 text-sm leading-snug opacity-90 sm:text-base">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
            <ErrorText>{dataTypeError}</ErrorText>

            <div className="mt-9">
              <ContinueButton onClick={handleStep2Continue}>CONTINUE →</ContinueButton>
            </div>
          </FadeStep>
        )}

        {step === 3 && (
          <FadeStep stepKey="step-3">
            <h1 style={{ fontFamily: F_DISPLAY, color: COL_TEXT_PRIMARY }} className="text-center text-[2.25rem] leading-[1.1] sm:text-[2.75rem]">
              Define Your Analysis
            </h1>
            <p style={{ fontFamily: F_CREDIT, color: COL_TEXT_SECONDARY }} className="mx-auto mt-3 max-w-sm text-center text-base sm:text-lg">
              Configure the geographic target for your analysis.
            </p>

            <div className="mt-11 space-y-10">
              {dataType === "professional" && (
                <section>
                  <div style={{ fontFamily: F_CREDIT, color: COL_TEXT_PRIMARY }} className="mb-1 text-base sm:text-lg">
                    Project data
                  </div>
                  {!pdfFile ? (
                    <label
                      style={{ borderColor: COL_BORDER, fontFamily: F_MONO, color: COL_TEXT_SECONDARY }}
                      className="mt-3 flex cursor-pointer items-center justify-center rounded-lg border border-dashed px-4 py-7 text-[11px] tracking-[0.12em] transition-colors hover:border-[#e8c583]/60 hover:text-[#e8c583]"
                    >
                      UPLOAD PDF
                      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handlePdfChange(e.target.files?.[0] ?? null)} />
                    </label>
                  ) : (
                    <div style={{ borderColor: COL_BORDER }} className="mt-3 rounded-lg border px-5 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div style={{ fontFamily: F_CREDIT, color: COL_TEXT_PRIMARY }} className="text-base">
                            Project documentation
                          </div>
                          <div style={{ fontFamily: F_MONO, color: COL_TEXT_SECONDARY }} className="mt-1 truncate text-[11px]">
                            {pdfFile.name} · {(pdfFile.size / (1024 * 1024)).toFixed(1)}MB
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePdfChange(null)}
                          style={{ fontFamily: F_MONO, color: COL_TEXT_SECONDARY }}
                          className="shrink-0 text-[10px] tracking-[0.1em] transition-colors hover:text-[#c97a5a]"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  )}
                  <ErrorText>{analysisErrors.pdf}</ErrorText>
                </section>
              )}

              <section>
                <div style={{ fontFamily: F_CREDIT, color: COL_TEXT_PRIMARY }} className="text-lg sm:text-xl">
                  Analysis location
                </div>
                <div style={{ fontFamily: F_MONO, color: COL_METADATA }} className="mt-1 text-[11px] opacity-75">
                  Geographic coordinates
                </div>

                <div className="mt-6 space-y-8">
                  <CoordinateField
                    label="Latitude"
                    value={latitude}
                    onChange={setLatitude}
                    onBlur={() => {
                      setAnalysisTouched((t) => ({ ...t, latitude: true }));
                      setAnalysisErrors((err) => ({ ...err, latitude: validateLat(latitude) }));
                    }}
                    placeholder="31.7917"
                    error={analysisTouched.latitude ? analysisErrors.latitude : undefined}
                    helper="Decimal degrees · −90 to 90"
                  />
                  <CoordinateField
                    label="Longitude"
                    value={longitude}
                    onChange={setLongitude}
                    onBlur={() => {
                      setAnalysisTouched((t) => ({ ...t, longitude: true }));
                      setAnalysisErrors((err) => ({ ...err, longitude: validateLon(longitude) }));
                    }}
                    placeholder="−7.0926"
                    error={analysisTouched.longitude ? analysisErrors.longitude : undefined}
                    helper="Decimal degrees · −180 to 180"
                  />
                </div>
              </section>
            </div>

            <div className="mt-10">
              <ContinueButton onClick={handleAnalyze}>ANALYZE LAND →</ContinueButton>
            </div>
          </FadeStep>
        )}
      </div>
    </div>
  );
}
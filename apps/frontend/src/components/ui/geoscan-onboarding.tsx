"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Fonts — loaded once, same pattern as geoscan-hero.tsx, but
// self-contained here so the hero file is never touched.
// ─────────────────────────────────────────────────────────────
const FONT_LINK_ID = "geoscan-onboarding-fonts";
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
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

const F_SANS = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

// Palette
const COL_BG = "#FAFAFA";
const COL_CARD_BG = "#FFFFFF";
const COL_BORDER = "#E5E5E7";
const COL_BORDER_STRONG = "#D4D4D8";
const COL_TEXT = "#111114";
const COL_TEXT_SECONDARY = "#6B7280";
const COL_TEXT_MUTED = "#9CA3AF";
const COL_ACCENT = "#111114";
const COL_FOCUS = "#4F46E5"; // muted indigo
const COL_FOCUS_RING = "rgba(79,70,229,0.12)";
const COL_ERROR = "#DC2626";
const COL_ERROR_BG = "#FEF2F2";
const COL_SELECTED_BG = "#F5F5FF";

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
// Shared motion styles.
// ─────────────────────────────────────────────────────────────
function OnboardingMotionStyles() {
  return (
    <style>{`
      @keyframes gso-bg-drift {
        from { transform: translate(0, 0); }
        to { transform: translate(-60px, -40px); }
      }
      @keyframes gso-card-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes gso-spin {
        to { transform: rotate(360deg); }
      }
      .gso-bg-layer { animation: gso-bg-drift 26s ease-in-out infinite alternate; }
      .gso-card-mount { animation: gso-card-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both; }
      .gso-spinner { animation: gso-spin 800ms linear infinite; }
      .gso-input { transition: border-color 200ms ease, box-shadow 200ms ease; }
      .gso-option { transition: border-color 200ms ease, background-color 200ms ease; }
      .gso-cta { transition: background-color 200ms ease, border-color 200ms ease, transform 200ms ease; }
      .gso-cta:hover:enabled { transform: translateY(-1px); }
      .gso-dropzone { transition: border-color 200ms ease, background-color 200ms ease; }
      @media (prefers-reduced-motion: reduce) {
        .gso-bg-layer, .gso-card-mount, .gso-spinner { animation: none; }
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────
// Background — subtle light geospatial grid + topo contours +
// coordinate points, slow drifting.
// ─────────────────────────────────────────────────────────────
function GeoBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ background: COL_BG }}>
      <div className="gso-bg-layer absolute inset-[-5%] h-[110%] w-[110%]">
        <svg viewBox="0 0 1000 1000" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="gso-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#E5E5E7" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#gso-grid)" opacity="0.5" />

          <g stroke="#D4D4D8" strokeWidth="1" fill="none" opacity="0.6">
            <path d="M -50 620 Q 200 560 450 610 T 1050 580" />
            <path d="M -50 700 Q 220 650 460 690 T 1050 660" />
            <path d="M -50 220 Q 240 180 480 220 T 1050 190" />
          </g>

          {[
            [120, 140], [860, 90], [740, 620], [180, 780], [520, 340], [940, 450], [60, 460],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#A1A1AA" opacity="0.5" />
          ))}
        </svg>
      </div>
      {/* soft radial fade so the pattern is strongest at the edges, quiet behind the card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(250,250,250,0.95) 0%, rgba(250,250,250,0.65) 45%, rgba(250,250,250,0.15) 100%)",
        }}
      />
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
        transition: "opacity 350ms ease, transform 350ms ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
      }}
    >
      {children}
    </div>
  );
}

function Wordmark() {
  return (
    <div style={{ fontFamily: F_SANS, color: COL_TEXT }} className="flex items-center justify-center gap-2 text-sm font-semibold tracking-tight">
      <span
        style={{ background: COL_TEXT }}
        className="inline-flex h-5 w-5 items-center justify-center rounded-[5px]"
      >
        <span style={{ background: COL_BG }} className="h-2 w-2 rounded-[2px]" />
      </span>
      GeoScanAI
    </div>
  );
}

function ProgressIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div style={{ fontFamily: F_SANS, color: COL_TEXT_SECONDARY }} className="text-xs font-medium">
      Step {step} of 3
    </div>
  );
}

function BackLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ fontFamily: F_SANS, color: COL_TEXT_SECONDARY }}
      className="text-xs font-medium transition-colors hover:text-[#111114]"
    >
      ← {label}
    </button>
  );
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{ fontFamily: F_SANS, color: COL_TEXT }}
      className="mb-1.5 block text-[13px] font-medium"
    >
      {children}
    </label>
  );
}

function FormInput({
  id,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; error?: string }) {
  return (
    <input
      id={id}
      {...props}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      style={{
        fontFamily: F_SANS,
        color: COL_TEXT,
        borderColor: error ? COL_ERROR : COL_BORDER,
        background: "#FFFFFF",
      }}
      className="gso-input w-full rounded-lg border px-3.5 py-2.5 text-[15px] placeholder:text-[#9CA3AF] focus:outline-none"
      onFocus={(e) => {
        if (!error) {
          e.currentTarget.style.borderColor = COL_FOCUS;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${COL_FOCUS_RING}`;
        }
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = error ? COL_ERROR : COL_BORDER;
        e.currentTarget.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
    />
  );
}

function ErrorText({ id, children }: { id?: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" style={{ fontFamily: F_SANS, color: COL_ERROR }} className="mt-1.5 text-[12.5px]">
      {children}
    </p>
  );
}

function HelperText({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: F_SANS, color: COL_TEXT_MUTED }} className="mt-1.5 text-[12.5px]">
      {children}
    </p>
  );
}

function PrimaryButton({
  onClick,
  disabled,
  loading,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        fontFamily: F_SANS,
        background: disabled || loading ? "#D4D4D8" : COL_ACCENT,
        color: "#FFFFFF",
        cursor: disabled || loading ? "not-allowed" : "pointer",
      }}
      className="gso-cta flex w-full items-center justify-center gap-2 rounded-lg py-3 text-[15px] font-medium"
    >
      {loading && (
        <span
          className="gso-spinner h-3.5 w-3.5 rounded-full border-2 border-white/40"
          style={{ borderTopColor: "#FFFFFF" }}
        />
      )}
      {loading ? "Preparing analysis..." : children}
    </button>
  );
}

function AnalysisOption({
  title,
  description,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        borderColor: selected ? COL_TEXT : COL_BORDER,
        background: selected ? COL_SELECTED_BG : "#FFFFFF",
      }}
      className="gso-option w-full rounded-xl border px-4 py-4 text-left"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div style={{ fontFamily: F_SANS, color: COL_TEXT }} className="text-[15px] font-semibold">
            {title}
          </div>
          <div style={{ fontFamily: F_SANS, color: COL_TEXT_SECONDARY }} className="mt-1 text-[13.5px] leading-relaxed">
            {description}
          </div>
        </div>
        <span
          style={{
            borderColor: selected ? COL_TEXT : COL_BORDER_STRONG,
            background: selected ? COL_TEXT : "transparent",
          }}
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
        >
          {selected && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </div>
    </button>
  );
}

function FileUpload({
  file,
  onChange,
  error,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
  error?: string;
}) {
  const [dragOver, setDragOver] = useState(false);

  if (file) {
    return (
      <div>
        <div style={{ borderColor: COL_BORDER, background: "#FFFFFF" }} className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5">
          <div className="flex items-center gap-3 overflow-hidden">
            <span style={{ background: "#F4F4F5" }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COL_TEXT_SECONDARY} strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </span>
            <div className="min-w-0">
              <div style={{ fontFamily: F_SANS, color: COL_TEXT }} className="truncate text-[13.5px] font-medium">
                {file.name}
              </div>
              <div style={{ fontFamily: F_SANS, color: COL_TEXT_MUTED }} className="text-[12px]">
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            style={{ fontFamily: F_SANS, color: COL_TEXT_SECONDARY }}
            className="shrink-0 text-[12.5px] font-medium transition-colors hover:text-[#DC2626]"
          >
            Remove
          </button>
        </div>
        <ErrorText>{error}</ErrorText>
      </div>
    );
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onChange(f);
        }}
        style={{
          borderColor: dragOver ? COL_FOCUS : error ? COL_ERROR : COL_BORDER_STRONG,
          background: dragOver ? COL_FOCUS_RING : "#FAFAFA",
        }}
        className="gso-dropzone flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center"
      >
        <span style={{ background: "#FFFFFF", borderColor: COL_BORDER }} className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={COL_TEXT_SECONDARY} strokeWidth="1.8">
            <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" />
          </svg>
        </span>
        <div style={{ fontFamily: F_SANS, color: COL_TEXT }} className="text-[13.5px] font-medium">
          Drop your PDF here
        </div>
        <div style={{ fontFamily: F_SANS, color: COL_TEXT_MUTED }} className="mt-1 text-[12.5px]">
          or <span style={{ color: COL_FOCUS }}>browse files</span>
        </div>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

function CoordinateInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helper,
}: {
  id: string;
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
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FormInput
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode="decimal"
        error={error}
      />
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : <HelperText>{helper}</HelperText>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// OnboardingLayout — shared card/background/header shell.
// ─────────────────────────────────────────────────────────────
function OnboardingLayout({
  step,
  onBack,
  backLabel,
  children,
}: {
  step: 1 | 2 | 3;
  onBack: () => void;
  backLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-4 py-8">
      <OnboardingMotionStyles />
      <GeoBackground />

      <div className="relative flex w-full flex-col items-center">
        <div className="mb-5">
          <Wordmark />
        </div>

        <div
          className="gso-card-mount w-full max-w-[520px] rounded-2xl px-6 py-8 sm:px-10 sm:py-10"
          style={{
            background: COL_CARD_BG,
            border: `1px solid ${COL_BORDER}`,
            boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.06)",
          }}
        >
          <div className="mb-7 flex items-center justify-between">
            <BackLink onClick={onBack} label={backLabel} />
            <ProgressIndicator step={step} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function GeoScanOnboarding({ onComplete, onExit }: GeoScanOnboardingProps) {
  useEffect(() => {
    ensureFontsLoaded();
  }, []);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setDataTypeError("Choose an analysis type to continue.");
      return;
    }
    setDataTypeError(undefined);
    setStep(3);
  };

  const validateLat = (value: string) => {
    if (!value.trim()) return "Latitude is required.";
    const lat = Number(value);
    if (Number.isNaN(lat) || lat < -90 || lat > 90) return "Must be between -90 and 90.";
    return undefined;
  };
  const validateLon = (value: string) => {
    if (!value.trim()) return "Longitude is required.";
    const lon = Number(value);
    if (Number.isNaN(lon) || lon < -180 || lon > 180) return "Must be between -180 and 180.";
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
    setIsSubmitting(true);
    // Placeholder for the real async analysis request — swap this
    // setTimeout for the actual API call and invoke onComplete from
    // its .then()/.finally() once wired up.
    setTimeout(() => {
      onComplete({
        profile,
        dataType: dataType as DataType,
        latitude,
        longitude,
        pdfFile: dataType === "professional" ? pdfFile : null,
      });
    }, 700);
  };

  if (step === 1) {
    return (
      <OnboardingLayout step={1} onBack={onExit} backLabel="Back to intro">
        <FadeStep stepKey="step-1">
          <h1 style={{ fontFamily: F_SANS, color: COL_TEXT }} className="text-2xl font-semibold tracking-tight sm:text-[28px]">
            Create your GeoScanAI profile
          </h1>
          <p style={{ fontFamily: F_SANS, color: COL_TEXT_SECONDARY }} className="mt-2 text-[14.5px] leading-relaxed">
            Tell us a little about yourself so we can prepare your workspace.
          </p>

          <div className="mt-7 space-y-5">
            <div>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <FormInput
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                placeholder="John"
                error={profileErrors.firstName}
              />
              <ErrorText id="firstName-error">{profileErrors.firstName}</ErrorText>
            </div>
            <div>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <FormInput
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                placeholder="Doe"
                error={profileErrors.lastName}
              />
              <ErrorText id="lastName-error">{profileErrors.lastName}</ErrorText>
            </div>
            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FormInput
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                error={profileErrors.email}
              />
              <ErrorText id="email-error">{profileErrors.email}</ErrorText>
            </div>
          </div>

          <div className="mt-7">
            <PrimaryButton onClick={handleStep1Continue}>Continue →</PrimaryButton>
          </div>
        </FadeStep>
      </OnboardingLayout>
    );
  }

  if (step === 2) {
    return (
      <OnboardingLayout step={2} onBack={() => setStep(1)} backLabel="Back">
        <FadeStep stepKey="step-2">
          <h1 style={{ fontFamily: F_SANS, color: COL_TEXT }} className="text-2xl font-semibold tracking-tight sm:text-[28px]">
            What would you like to analyze?
          </h1>
          <p style={{ fontFamily: F_SANS, color: COL_TEXT_SECONDARY }} className="mt-2 text-[14.5px] leading-relaxed">
            Choose the data available for your analysis.
          </p>

          <div className="mt-7 space-y-3">
            <AnalysisOption
              title="Standard Analysis"
              description="For a location-based analysis using geographic coordinates."
              selected={dataType === "standard"}
              onClick={() => {
                setDataType("standard");
                setDataTypeError(undefined);
              }}
            />
            <AnalysisOption
              title="Professional Analysis"
              description="For projects with additional geographic or project documentation."
              selected={dataType === "professional"}
              onClick={() => {
                setDataType("professional");
                setDataTypeError(undefined);
              }}
            />
          </div>
          <ErrorText>{dataTypeError}</ErrorText>

          <div className="mt-7">
            <PrimaryButton onClick={handleStep2Continue}>Continue →</PrimaryButton>
          </div>
        </FadeStep>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout step={3} onBack={() => setStep(2)} backLabel="Back">
      <FadeStep stepKey="step-3">
        <h1 style={{ fontFamily: F_SANS, color: COL_TEXT }} className="text-2xl font-semibold tracking-tight sm:text-[28px]">
          Define your analysis
        </h1>
        <p style={{ fontFamily: F_SANS, color: COL_TEXT_SECONDARY }} className="mt-2 text-[14.5px] leading-relaxed">
          Provide the location and project data GeoScanAI will use to build your analysis.
        </p>

        <div className="mt-7 space-y-7">
          {dataType === "professional" && (
            <div>
              <FieldLabel>Project document</FieldLabel>
              <FileUpload file={pdfFile} onChange={handlePdfChange} error={analysisErrors.pdf} />
            </div>
          )}

          <div className="space-y-5">
            <CoordinateInput
              id="latitude"
              label="Latitude"
              value={latitude}
              onChange={setLatitude}
              onBlur={() => {
                setAnalysisTouched((t) => ({ ...t, latitude: true }));
                setAnalysisErrors((err) => ({ ...err, latitude: validateLat(latitude) }));
              }}
              placeholder="31.7917"
              error={analysisTouched.latitude ? analysisErrors.latitude : undefined}
              helper="-90 to 90"
            />
            <CoordinateInput
              id="longitude"
              label="Longitude"
              value={longitude}
              onChange={setLongitude}
              onBlur={() => {
                setAnalysisTouched((t) => ({ ...t, longitude: true }));
                setAnalysisErrors((err) => ({ ...err, longitude: validateLon(longitude) }));
              }}
              placeholder="-7.0926"
              error={analysisTouched.longitude ? analysisErrors.longitude : undefined}
              helper="-180 to 180"
            />
          </div>
        </div>

        <div className="mt-8">
          <PrimaryButton onClick={handleAnalyze} loading={isSubmitting}>
            Analyze Land →
          </PrimaryButton>
        </div>
      </FadeStep>
    </OnboardingLayout>
  );
}
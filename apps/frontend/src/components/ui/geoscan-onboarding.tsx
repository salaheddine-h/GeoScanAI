"use client";

import { useEffect, useState } from "react";

const F_DISPLAY = '"Bodoni Moda", serif';
const F_CREDIT = '"Cormorant Garamond", serif';
const F_MONO = '"Space Mono", monospace';

const COL_LABEL = "#f2c879";
const COL_CREDIT = "#e8dcc3";
const COL_DIM = "#8a7350";

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

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div
      style={{ fontFamily: F_MONO, color: COL_DIM, letterSpacing: "0.2em" }}
      className="text-[11px] sm:text-xs"
    >
      0{step} / 03
    </div>
  );
}

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ fontFamily: F_MONO, color: COL_DIM }}
      className="text-[11px] tracking-[0.2em] transition-colors hover:text-[#f2c879] sm:text-xs"
    >
      ← {label}
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{ fontFamily: F_MONO, color: COL_LABEL }}
      className="mb-2 block text-[10px] tracking-[0.22em] opacity-85 sm:text-[11px]"
    >
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{ fontFamily: F_CREDIT, color: COL_CREDIT, ...props.style }}
      className={
        "w-full border-b border-[#8a7350]/40 bg-transparent px-1 py-2 text-base placeholder:text-[#8a7350]/60 focus:border-[#f2c879]/70 focus:outline-none " +
        (props.className ?? "")
      }
    />
  );
}

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p style={{ fontFamily: F_MONO }} className="mt-1 text-[10px] tracking-wide text-[#d1653f]">
      {children}
    </p>
  );
}

function ContinueButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ fontFamily: F_MONO, color: COL_CREDIT, borderColor: "rgba(242,200,121,0.35)" }}
      className="mt-8 w-full rounded-full border px-6 py-2.5 text-xs tracking-[0.2em] transition-colors hover:bg-[#f2c879] hover:text-[#0b0906] sm:text-sm"
    >
      {children}
    </button>
  );
}

export default function GeoScanOnboarding({ onComplete, onExit }: GeoScanOnboardingProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof ProfileData, string>>>({});

  const [dataType, setDataType] = useState<DataType | null>(null);
  const [dataTypeError, setDataTypeError] = useState<string | undefined>();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [analysisErrors, setAnalysisErrors] = useState<{
    latitude?: string;
    longitude?: string;
    pdf?: string;
  }>({});

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

  const validateLatLon = () => {
    const errors: { latitude?: string; longitude?: string } = {};
    const lat = Number(latitude);
    const lon = Number(longitude);
    if (!latitude.trim()) errors.latitude = "Latitude is required.";
    else if (Number.isNaN(lat) || lat < -90 || lat > 90) errors.latitude = "Enter a value between -90 and 90.";
    if (!longitude.trim()) errors.longitude = "Longitude is required.";
    else if (Number.isNaN(lon) || lon < -180 || lon > 180) errors.longitude = "Enter a value between -180 and 180.";
    return errors;
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
    const errors: typeof analysisErrors = validateLatLon();
    if (dataType === "professional" && !pdfFile) {
      errors.pdf = "Upload a PDF with your project data.";
    }
    if (Object.keys(errors).some((k) => errors[k as keyof typeof errors])) {
      setAnalysisErrors(errors);
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
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#0b0906]/90 px-4 py-8 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl border border-[#8a7350]/25 bg-[#0b0906]/80 px-6 py-8 sm:px-10 sm:py-10">
        <div className="mb-6 flex items-center justify-between">
          {step === 1 ? (
            <BackButton onClick={onExit} label="BACK TO INTRO" />
          ) : (
            <BackButton onClick={() => setStep((s) => ((s - 1) as 1 | 2 | 3))} label="BACK" />
          )}
          <StepIndicator step={step} />
        </div>

        {step === 1 && (
          <FadeStep stepKey="step-1">
            <h1
              style={{ fontFamily: F_DISPLAY, color: COL_CREDIT }}
              className="text-center text-lg tracking-[0.08em] sm:text-xl"
            >
              CREATE YOUR GEOSCANAI PROFILE
            </h1>
            <p
              style={{ fontFamily: F_MONO, color: COL_DIM }}
              className="mt-3 text-center text-[11px] leading-relaxed sm:text-xs"
            >
              Tell us who you are so we can prepare your analysis workspace.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <FieldLabel>First name</FieldLabel>
                <TextInput
                  value={profile.firstName}
                  onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                  placeholder="First name"
                />
                <ErrorText>{profileErrors.firstName}</ErrorText>
              </div>
              <div>
                <FieldLabel>Last name</FieldLabel>
                <TextInput
                  value={profile.lastName}
                  onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                  placeholder="Last name"
                />
                <ErrorText>{profileErrors.lastName}</ErrorText>
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <TextInput
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                />
                <ErrorText>{profileErrors.email}</ErrorText>
              </div>
            </div>

            <ContinueButton onClick={handleStep1Continue}>CONTINUE →</ContinueButton>
          </FadeStep>
        )}

        {step === 2 && (
          <FadeStep stepKey="step-2">
            <h1
              style={{ fontFamily: F_DISPLAY, color: COL_CREDIT }}
              className="text-center text-lg tracking-[0.08em] sm:text-xl"
            >
              WHAT DO YOU WANT TO ANALYZE?
            </h1>
            <p
              style={{ fontFamily: F_MONO, color: COL_DIM }}
              className="mt-3 text-center text-[11px] leading-relaxed sm:text-xs"
            >
              GeoScanAI supports two ways to begin — choose the one that matches what you have.
            </p>

            <div className="mt-8 space-y-4">
              {(
                [
                  {
                    id: "standard" as const,
                    title: "STANDARD ANALYSIS",
                    desc: "For a straightforward look at a location. Just provide latitude and longitude.",
                  },
                  {
                    id: "professional" as const,
                    title: "PROFESSIONAL ANALYSIS",
                    desc: "For when you already have land or project data. Upload a PDF alongside your coordinates.",
                  },
                ]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setDataType(opt.id);
                    setDataTypeError(undefined);
                  }}
                  style={{
                    borderColor: dataType === opt.id ? "rgba(242,200,121,0.6)" : "rgba(138,115,80,0.3)",
                    background: dataType === opt.id ? "rgba(242,200,121,0.06)" : "transparent",
                  }}
                  className="w-full rounded-xl border px-5 py-4 text-left transition-colors"
                >
                  <div
                    style={{ fontFamily: F_MONO, color: COL_LABEL }}
                    className="text-[11px] tracking-[0.2em] sm:text-xs"
                  >
                    {opt.title}
                  </div>
                  <div
                    style={{ fontFamily: F_CREDIT, color: COL_CREDIT }}
                    className="mt-2 text-sm leading-snug opacity-90 sm:text-base"
                  >
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
            <ErrorText>{dataTypeError}</ErrorText>

            <ContinueButton onClick={handleStep2Continue}>CONTINUE →</ContinueButton>
          </FadeStep>
        )}

        {step === 3 && (
          <FadeStep stepKey="step-3">
            <h1
              style={{ fontFamily: F_DISPLAY, color: COL_CREDIT }}
              className="text-center text-lg tracking-[0.08em] sm:text-xl"
            >
              START A NEW ANALYSIS
            </h1>
            <p
              style={{ fontFamily: F_MONO, color: COL_DIM }}
              className="mt-3 text-center text-[11px] leading-relaxed sm:text-xs"
            >
              Give GeoScanAI a location to begin understanding the land.
            </p>

            <div className="mt-8 space-y-5">
              {dataType === "professional" && (
                <div>
                  <FieldLabel>Project data (PDF)</FieldLabel>
                  {!pdfFile ? (
                    <label
                      style={{ borderColor: "rgba(138,115,80,0.4)", fontFamily: F_MONO, color: COL_DIM }}
                      className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed px-4 py-6 text-[11px] tracking-wide transition-colors hover:border-[#f2c879]/60 hover:text-[#f2c879]"
                    >
                      UPLOAD PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handlePdfChange(e.target.files?.[0] ?? null)}
                      />
                    </label>
                  ) : (
                    <div
                      style={{ borderColor: "rgba(138,115,80,0.4)", fontFamily: F_MONO, color: COL_CREDIT }}
                      className="flex items-center justify-between rounded-lg border px-4 py-3 text-xs"
                    >
                      <span className="truncate pr-3">
                        {pdfFile.name} · {(pdfFile.size / (1024 * 1024)).toFixed(1)}MB
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePdfChange(null)}
                        style={{ color: COL_DIM }}
                        className="shrink-0 hover:text-[#d1653f]"
                      >
                        REMOVE
                      </button>
                    </div>
                  )}
                  <ErrorText>{analysisErrors.pdf}</ErrorText>
                </div>
              )}

              <div>
                <FieldLabel>Latitude</FieldLabel>
                <TextInput
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="31.7917"
                  inputMode="decimal"
                />
                <ErrorText>{analysisErrors.latitude}</ErrorText>
              </div>
              <div>
                <FieldLabel>Longitude</FieldLabel>
                <TextInput
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="-7.0926"
                  inputMode="decimal"
                />
                <ErrorText>{analysisErrors.longitude}</ErrorText>
              </div>
            </div>

            <ContinueButton onClick={handleAnalyze}>ANALYZE LAND →</ContinueButton>
          </FadeStep>
        )}
      </div>
    </div>
  );
}
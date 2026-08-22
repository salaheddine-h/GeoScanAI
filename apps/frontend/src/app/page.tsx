"use client";

import { useState } from "react";

type InputType = "COORDINATES_ONLY" | "USER_DATA";

export default function Home() {
  const [inputType, setInputType] =
    useState<InputType>("COORDINATES_ONLY");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [userFile, setUserFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      setUserFile(null);
      return;
    }

    // PDF extension check
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are allowed.");
      e.target.value = "";
      setUserFile(null);
      return;
    }

    // MIME type check
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      e.target.value = "";
      setUserFile(null);
      return;
    }

    // Maximum 10 MB
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!latitude || !longitude) {
        throw new Error(
          "Please provide latitude and longitude.",
        );
      }

      if (
        inputType === "USER_DATA" &&
        !userFile
      ) {
        throw new Error(
          "Please upload a PDF file.",
        );
      }

      const formData = new FormData();

      formData.append(
        "latitude",
        latitude,
      );

      formData.append(
        "longitude",
        longitude,
      );

      formData.append(
        "inputType",
        inputType,
      );

      if (
        inputType === "USER_DATA" &&
        userFile
      ) {
        formData.append(
          "file",
          userFile,
        );
      }

      const response = await fetch(
        "http://localhost:3000/analysis",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Analysis request failed.",
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-semibold">
              GeoScanAI
            </h1>

            <p className="text-sm text-zinc-500">
              Land Intelligence Platform
            </p>
          </div>

          <div className="rounded-full border border-zinc-700 px-4 py-2 text-xs text-zinc-400">
            Analysis
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm text-zinc-500">
            NEW ANALYSIS
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            Analyze a location
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Provide coordinates and optionally upload
            your own land data for analysis.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >
              {/* Input type */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Analysis input
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Coordinates only */}
                  <button
                    type="button"
                    onClick={() => {
                      setInputType(
                        "COORDINATES_ONLY",
                      );
                      setUserFile(null);
                      setError("");
                    }}
                    className={`rounded-xl border p-4 text-left transition ${
                      inputType ===
                      "COORDINATES_ONLY"
                        ? "border-white bg-white text-black"
                        : "border-zinc-800 bg-zinc-900 text-white hover:border-zinc-600"
                    }`}
                  >
                    <div className="mb-2 text-lg">
                      📍
                    </div>

                    <div className="font-medium">
                      Coordinates only
                    </div>

                    <div
                      className={`mt-1 text-xs ${
                        inputType ===
                        "COORDINATES_ONLY"
                          ? "text-zinc-600"
                          : "text-zinc-500"
                      }`}
                    >
                      Analyze using location
                      coordinates.
                    </div>
                  </button>

                  {/* User data */}
                  <button
                    type="button"
                    onClick={() => {
                      setInputType(
                        "USER_DATA",
                      );
                      setError("");
                    }}
                    className={`rounded-xl border p-4 text-left transition ${
                      inputType === "USER_DATA"
                        ? "border-white bg-white text-black"
                        : "border-zinc-800 bg-zinc-900 text-white hover:border-zinc-600"
                    }`}
                  >
                    <div className="mb-2 text-lg">
                      📄
                    </div>

                    <div className="font-medium">
                      Upload your data
                    </div>

                    <div
                      className={`mt-1 text-xs ${
                        inputType ===
                        "USER_DATA"
                          ? "text-zinc-600"
                          : "text-zinc-500"
                      }`}
                    >
                      Upload your land PDF.
                    </div>
                  </button>
                </div>
              </div>

              {/* Coordinates */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Location
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Latitude */}
                  <div>
                    <label className="mb-2 block text-xs text-zinc-500">
                      Latitude
                    </label>

                    <input
                      type="number"
                      step="any"
                      value={latitude}
                      onChange={(e) =>
                        setLatitude(
                          e.target.value,
                        )
                      }
                      placeholder="31.6295"
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                    />
                  </div>

                  {/* Longitude */}
                  <div>
                    <label className="mb-2 block text-xs text-zinc-500">
                      Longitude
                    </label>

                    <input
                      type="number"
                      step="any"
                      value={longitude}
                      onChange={(e) =>
                        setLongitude(
                          e.target.value,
                        )
                      }
                      placeholder="-7.9811"
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                    />
                  </div>
                </div>
              </div>

              {/* PDF Upload */}
              {inputType === "USER_DATA" && (
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Additional data
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900 px-6 py-10 text-center transition hover:border-zinc-500 hover:bg-zinc-800">
                    <div className="mb-3 text-3xl">
                      📄
                    </div>

                    <p className="text-sm font-medium">
                      {userFile
                        ? userFile.name
                        : "Upload your PDF"}
                    </p>

                    <p className="mt-2 text-xs text-zinc-500">
                      PDF files only · Maximum 10 MB
                    </p>

                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={
                        handleFileChange
                      }
                      className="hidden"
                    />
                  </label>

                  {userFile && (
                    <div className="mt-3 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
                      <div>
                        <p className="text-sm">
                          {userFile.name}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {(
                            userFile.size /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-xs text-zinc-500 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <p className="mt-2 text-xs text-zinc-600">
                    Upload the land document you
                    already have. No JSON or script
                    files are accepted.
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-900 bg-red-950/30 p-4">
                  <p className="text-sm text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Starting analysis..."
                  : "Start Analysis"}
              </button>
            </form>
          </div>

          {/* Preview / Result */}
          <aside className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-xs font-medium text-zinc-500">
              REQUEST PREVIEW
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-zinc-600">
                  Input type
                </p>

                <p className="mt-1 text-sm">
                  {inputType ===
                  "COORDINATES_ONLY"
                    ? "Coordinates only"
                    : "PDF + coordinates"}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-600">
                  Latitude
                </p>

                <p className="mt-1 text-sm">
                  {latitude ||
                    "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-600">
                  Longitude
                </p>

                <p className="mt-1 text-sm">
                  {longitude ||
                    "Not provided"}
                </p>
              </div>

              {inputType ===
                "USER_DATA" && (
                <div>
                  <p className="text-xs text-zinc-600">
                    PDF file
                  </p>

                  <p className="mt-1 truncate text-sm">
                    {userFile
                      ? userFile.name
                      : "No file selected"}
                  </p>
                </div>
              )}
            </div>

            {/* Backend result */}
            {result && (
              <div className="mt-6">
                <p className="mb-2 text-xs text-zinc-600">
                  BACKEND RESPONSE
                </p>

                <pre className="overflow-auto rounded-xl border border-zinc-800 bg-black p-4 text-xs text-zinc-300">
                  {JSON.stringify(
                    result,
                    null,
                    2,
                  )}
                </pre>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
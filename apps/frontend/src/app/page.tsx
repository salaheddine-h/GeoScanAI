"use client";

import { useState } from "react";

type InputType = "COORDINATES_ONLY" | "USER_DATA";

type AnalysisResponse = {
  message?: string;
  [key: string]: unknown;
};

export default function Home() {
  const [inputType, setInputType] = useState<InputType>("COORDINATES_ONLY");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [userFile, setUserFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

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

      const formData = new FormData();
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("inputType", inputType);
      if (inputType === "USER_DATA" && userFile) formData.append("file", userFile);

      const response = await fetch("http://localhost:3000/analysis", {
        method: "POST",
        body: formData,
      });

      const data: AnalysisResponse = await response.json();
      if (!response.ok) throw new Error(data.message || "Analysis request failed.");
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-semibold">GeoScanAI</h1>
            <p className="text-sm text-zinc-500">Land Intelligence Platform</p>
          </div>
          <div className="rounded-full border border-zinc-700 px-4 py-2 text-xs text-zinc-400">Analysis</div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm text-zinc-500">NEW ANALYSIS</p>
          <h2 className="text-4xl font-bold tracking-tight">Analyze a location</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">Provide coordinates and optionally upload your own land data for analysis.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="mb-3 block text-sm font-medium">Analysis input</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => { setInputType("COORDINATES_ONLY"); setUserFile(null); setError(""); }} className={`rounded-xl border p-4 text-left transition ${inputType === "COORDINATES_ONLY" ? "border-white bg-white text-black" : "border-zinc-800 bg-zinc-900 text-white hover:border-zinc-600"}`}>
                    <div className="mb-2 text-lg">📍</div>
                    <div className="font-medium">Coordinates only</div>
                    <div className="mt-1 text-xs opacity-60">Analyze using location coordinates.</div>
                  </button>
                  <button type="button" onClick={() => { setInputType("USER_DATA"); setError(""); }} className={`rounded-xl border p-4 text-left transition ${inputType === "USER_DATA" ? "border-white bg-white text-black" : "border-zinc-800 bg-zinc-900 text-white hover:border-zinc-600"}`}>
                    <div className="mb-2 text-lg">📄</div>
                    <div className="font-medium">User data</div>
                    <div className="mt-1 text-xs opacity-60">Add a PDF with your own land data.</div>
                  </button>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="latitude" className="mb-2 block text-sm font-medium">Latitude</label>
                  <input id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="31.7917" className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-500" />
                </div>
                <div>
                  <label htmlFor="longitude" className="mb-2 block text-sm font-medium">Longitude</label>
                  <input id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="-7.0926" className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-500" />
                </div>
              </div>

              {inputType === "USER_DATA" && (
                <div>
                  <label className="mb-2 block text-sm font-medium">Land data PDF</label>
                  <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 p-5">
                    <input type="file" accept="application/pdf,.pdf" onChange={handleFileChange} className="block w-full text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-zinc-200" />
                    {userFile && <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"><span className="truncate">{userFile.name}</span><button type="button" onClick={removeFile} className="ml-3 text-xs text-zinc-500 hover:text-white">Remove</button></div>}
                    <p className="mt-2 text-xs text-zinc-600">PDF only · maximum 10 MB</p>
                  </div>
                </div>
              )}

              {error && <div className="rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">{error}</div>}

              <button type="submit" disabled={loading} className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Analyzing..." : "Run analysis"}</button>
            </form>
          </div>

          <aside className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-xs text-zinc-600">INPUT</p>
            <div className="mt-4 space-y-5">
              <div><p className="text-xs text-zinc-600">Coordinates</p><p className="mt-1 text-sm">{latitude && longitude ? `${latitude}, ${longitude}` : "Not provided"}</p></div>
              <div><p className="text-xs text-zinc-600">Input type</p><p className="mt-1 text-sm">{inputType === "COORDINATES_ONLY" ? "Coordinates only" : "User data"}</p></div>
              {inputType === "USER_DATA" && <div><p className="text-xs text-zinc-600">PDF file</p><p className="mt-1 truncate text-sm">{userFile ? userFile.name : "No file selected"}</p></div>}
            </div>
            {result && <div className="mt-6"><p className="mb-2 text-xs text-zinc-600">BACKEND RESPONSE</p><pre className="overflow-auto rounded-xl border border-zinc-800 bg-black p-4 text-xs text-zinc-300">{result}</pre></div>}
          </aside>
        </div>
      </section>
    </main>
  );
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export type AnalysisInputType =
  | "COORDINATES_ONLY"
  | "USER_DATA";

export interface AnalysisRequest {
  latitude: number;
  longitude: number;
  inputType: AnalysisInputType;
}

export interface AnalysisRecord {
  id: string;
  key: string;
  latitude: number;
  longitude: number;
  inputType: AnalysisInputType;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisResponse {
  status: string;
  message: string;
  data: AnalysisRecord;
}

export interface AnalysisGetResponse {
  status: string;
  data: AnalysisRecord;
}

export class AnalysisApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "AnalysisApiError";
  }
}

export async function submitAnalysis(
  request: AnalysisRequest,
): Promise<AnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new AnalysisApiError(
      detail || `Analysis request failed (${response.status})`,
      response.status,
    );
  }

  return response.json() as Promise<AnalysisResponse>;
}

export async function getAnalysis(
  id: string,
): Promise<AnalysisGetResponse> {
  const response = await fetch(`${API_BASE_URL}/analysis/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new AnalysisApiError(
      detail || `Analysis lookup failed (${response.status})`,
      response.status,
    );
  }

  return response.json() as Promise<AnalysisGetResponse>;
}

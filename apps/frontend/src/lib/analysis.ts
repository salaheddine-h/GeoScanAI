const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type AnalysisInputType =
  | "COORDINATES_ONLY"
  | "USER_DATA";

export interface AnalysisRequest {
  latitude: number;
  longitude: number;
  inputType: AnalysisInputType;
}

export interface AnalysisResponse {
  status: string;
  message: string;
  data: AnalysisRequest;
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

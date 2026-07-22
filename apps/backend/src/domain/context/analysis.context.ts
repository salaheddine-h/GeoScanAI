export interface AnalysisContext {
  requestId: string;

  analysisMode: 'satellite' | 'integrated';

  coordinates: {
    latitude: number;
    longitude: number;
  };

  status: 'accepted';

  createdAt: Date;
}
export enum AnalysisStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class Analysis {
  id: string;
  key: string;
  latitude: number;
  longitude: number;
  inputType: string;
  status: AnalysisStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Analysis>) {
    this.id = partial.id ?? '';
    this.key = partial.key ?? '';
    this.latitude = partial.latitude ?? 0;
    this.longitude = partial.longitude ?? 0;
    this.inputType = partial.inputType ?? 'COORDINATES_ONLY';
    this.status = partial.status ?? AnalysisStatus.PENDING;
    this.createdAt = partial.createdAt ?? new Date();
    this.updatedAt = partial.updatedAt ?? new Date();
  }
}

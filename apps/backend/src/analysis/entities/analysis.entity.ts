// export class Analysis {
//   id: string;

// //   key: string;

//   latitude: number;
//   longitude: number;

//   status: string;

//   createdAt: Date;
//   updatedAt: Date;
// }

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

  status: AnalysisStatus;

  createdAt: Date;
  updatedAt: Date;
}

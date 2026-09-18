import { Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { AnalysisStatus } from './entities/analysis.entity';
import { Analysis } from './entities/analysis.entity';

export interface AnalysisRecord {
  id: string;
  key: string;
  latitude: number;
  longitude: number;
  inputType: string;
  status: AnalysisStatus;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class AnalysisService {
  private readonly analyses = new Map<string, Analysis>();

  analyze(createAnalysisDto: CreateAnalysisDto) {
    const id = crypto.randomUUID();
    const key = this.generateKey(id);
    const now = new Date();

    const analysis = new Analysis({
      id,
      key,
      latitude: createAnalysisDto.latitude,
      longitude: createAnalysisDto.longitude,
      inputType: createAnalysisDto.inputType,
      status: AnalysisStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    });

    this.analyses.set(id, analysis);

    return {
      status: 'accepted',
      message: 'Analysis request received',
      data: this.toResponse(analysis),
    };
  }

  getById(id: string) {
    const analysis = this.analyses.get(id);

    if (!analysis) {
      return null;
    }

    return {
      status: 'success',
      data: this.toResponse(analysis),
    };
  }

  private generateKey(id: string): string {
    return `ANL-${id.slice(0, 8).toUpperCase()}`;
  }

  private toResponse(analysis: Analysis): AnalysisRecord {
    return {
      id: analysis.id,
      key: analysis.key,
      latitude: analysis.latitude,
      longitude: analysis.longitude,
      inputType: analysis.inputType,
      status: analysis.status,
      createdAt: analysis.createdAt.toISOString(),
      updatedAt: analysis.updatedAt.toISOString(),
    };
  }
}

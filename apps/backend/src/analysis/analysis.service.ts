
import { Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';

@Injectable()
export class AnalysisService {

  analyze(createAnalysisDto: CreateAnalysisDto) {

    return {
      status: 'accepted',
      message: 'Analysis request received',
      data: createAnalysisDto,
    };

  }

}
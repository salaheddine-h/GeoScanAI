import { Body, Controller, Post } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(
    private readonly analysisService: AnalysisService,
  ) {}

  @Post()
  analyze(@Body() createAnalysisDto: CreateAnalysisDto) {
    return this.analysisService.analyze(createAnalysisDto);
  }
}
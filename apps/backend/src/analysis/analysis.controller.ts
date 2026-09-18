import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  getById(@Param('id') id: string) {
    const result = this.analysisService.getById(id);

    if (!result) {
      throw new NotFoundException('Analysis not found');
    }

    return result;
  }
}

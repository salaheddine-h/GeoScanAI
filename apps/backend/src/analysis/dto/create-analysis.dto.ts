import { IsLatitude, IsLongitude } from 'class-validator';

export class CreateAnalysisDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
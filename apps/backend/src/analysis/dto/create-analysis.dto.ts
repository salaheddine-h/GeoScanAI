import {
  IsLatitude,
  IsLongitude,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum AnalysisInputType {
  COORDINATES_ONLY = 'COORDINATES_ONLY',
  USER_DATA = 'USER_DATA',
}

export class CreateAnalysisDto {
  @Type(() => Number)
  @IsLatitude()
  latitude: number;

  @Type(() => Number)
  @IsLongitude()
  longitude: number;

  @IsEnum(AnalysisInputType)
  inputType: AnalysisInputType;
}

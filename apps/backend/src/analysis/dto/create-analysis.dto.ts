import {
  IsLatitude,
  IsLongitude,
  IsEnum,
} from 'class-validator';

export enum AnalysisInputType {
  COORDINATES_ONLY = 'COORDINATES_ONLY',
  USER_DATA = 'USER_DATA',
}

export class CreateAnalysisDto {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @IsEnum(AnalysisInputType)
  inputType: AnalysisInputType;
}
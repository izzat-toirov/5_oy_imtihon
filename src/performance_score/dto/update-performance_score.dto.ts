import { PartialType } from '@nestjs/swagger';
import { CreatePerformanceScoreDto } from './create-performance_score.dto';

export class UpdatePerformanceScoreDto extends PartialType(CreatePerformanceScoreDto) {}

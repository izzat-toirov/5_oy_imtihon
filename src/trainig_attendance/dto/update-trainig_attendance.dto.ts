import { PartialType } from '@nestjs/swagger';
import { CreateTrainigAttendanceDto } from './create-trainig_attendance.dto';

export class UpdateTrainigAttendanceDto extends PartialType(CreateTrainigAttendanceDto) {}

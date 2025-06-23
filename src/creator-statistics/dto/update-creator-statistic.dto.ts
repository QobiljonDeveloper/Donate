import { PartialType } from '@nestjs/swagger';
import { CreateCreatorStatisticDto } from './create-creator-statistic.dto';

export class UpdateCreatorStatisticDto extends PartialType(CreateCreatorStatisticDto) {}

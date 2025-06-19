import { PartialType } from '@nestjs/mapped-types';
import { CreateKuryerDto } from './create-kuryer.dto';

export class UpdateKuryerDto extends PartialType(CreateKuryerDto) {}

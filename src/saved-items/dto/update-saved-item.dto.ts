import { PartialType } from '@nestjs/swagger';
import { CreateSavedItemDto } from './create-saved-item.dto';

export class UpdateSavedItemDto extends PartialType(CreateSavedItemDto) {}

import { Module } from '@nestjs/common';
import { SavedItemsService } from './saved-items.service';
import { SavedItemsController } from './saved-items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SavedItem } from './models/saved-item.model';

@Module({
  imports:[SequelizeModule.forFeature([SavedItem])],
  controllers: [SavedItemsController],
  providers: [SavedItemsService],
})
export class SavedItemsModule {}

import { Module } from '@nestjs/common';
import { CreatorStatisticsService } from './creator-statistics.service';
import { CreatorStatisticsController } from './creator-statistics.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreatorStatistic } from './models/creator-statistic.model';

@Module({
  imports:[SequelizeModule.forFeature([CreatorStatistic])],
  controllers: [CreatorStatisticsController],
  providers: [CreatorStatisticsService],
})
export class CreatorStatisticsModule {}

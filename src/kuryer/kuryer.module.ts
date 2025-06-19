import { Module } from '@nestjs/common';
import { KuryerService } from './kuryer.service';
import { KuryerController } from './kuryer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Kuryer } from './models/kuryer.model';

@Module({
  imports:[SequelizeModule.forFeature([Kuryer])],
  controllers: [KuryerController],
  providers: [KuryerService],
})
export class KuryerModule {}

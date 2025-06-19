import { Module } from "@nestjs/common";
import { DonationsService } from "./donations.service";
import { DonationsController } from "./donations.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Donation } from "./models/donation.model";

@Module({
  imports: [SequelizeModule.forFeature([Donation])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}

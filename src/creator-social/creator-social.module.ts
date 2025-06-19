import { Module } from '@nestjs/common';
import { CreatorSocialService } from './creator-social.service';
import { CreatorSocialController } from './creator-social.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreatorSocial } from './model/creator-social.model';

@Module({
  imports:[SequelizeModule.forFeature([CreatorSocial])],
  controllers: [CreatorSocialController],
  providers: [CreatorSocialService],
})
export class CreatorSocialModule {}

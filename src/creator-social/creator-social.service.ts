import { Injectable } from "@nestjs/common";
import { CreateCreatorSocialDto } from "./dto/create-creator-social.dto";
import { UpdateCreatorSocialDto } from "./dto/update-creator-social.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CreatorSocial } from "./model/creator-social.model";

@Injectable()
export class CreatorSocialService {
  constructor(
    @InjectModel(CreatorSocial) private creatorSocialModel: typeof CreatorSocial
  ) {}
  create(createCreatorSocialDto: CreateCreatorSocialDto) {
    return this.creatorSocialModel.create(createCreatorSocialDto);
  }

  findAll() {
    return this.creatorSocialModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} creatorSocial`;
  }

  update(id: number, updateCreatorSocialDto: UpdateCreatorSocialDto) {
    return `This action updates a #${id} creatorSocial`;
  }

  remove(id: number) {
    return `This action removes a #${id} creatorSocial`;
  }
}

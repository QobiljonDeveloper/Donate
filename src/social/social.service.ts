import { Injectable } from "@nestjs/common";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Social } from "./models/social.model";

@Injectable()
export class SocialService {
  constructor(@InjectModel(Social) private socialModel: typeof Social) {}

  async createSocial(createSocialDto: CreateSocialDto) {
    const social = await this.socialModel.create(createSocialDto);

    return social;
  }

  async getAllSocials(): Promise<Social[]> {
    return this.socialModel.findAll();
  }

  async getSocialById(id: number): Promise<Social | null> {
    return this.socialModel.findByPk(id);
  }

  async updateSocial(id: number, updateSocialDto: UpdateSocialDto) {
    const [rowsUpdated, updatedSocials] = await this.socialModel.update(
      updateSocialDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (rowsUpdated === 0 || !updatedSocials || updatedSocials.length === 0) {
      throw new Error(`Social with id ${id} not found`);
    }

    return updatedSocials[0];
  }

  async removeSocial(id: number): Promise<string> {
    const result = await this.socialModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id} - social o'chirildi`;
    }

    return `${id}- Bunday social yo'q`;
  }
}

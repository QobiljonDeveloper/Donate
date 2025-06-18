import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existing = await this.adminModel.findOne({
      where: { email: createAdminDto.email },
    });

    if (existing) {
      throw new ConflictException("Bu email bilan admin allaqachon mavjud");
    }

    return this.adminModel.create(createAdminDto);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException(`Admin ID ${id} topilmadi`);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const [updatedCount, [updated]] = await this.adminModel.update(
      updateAdminDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`Admin ID ${id} topilmadi`);
    }

    return updated;
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.adminModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`Admin ID ${id} topilmadi`);
    }

    return `${id} - IDli admin o‘chirildi`;
  }
}

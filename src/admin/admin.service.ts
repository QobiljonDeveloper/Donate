import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";
import { Role } from "../role/models/role.model";
import { AddRoleDto } from "./dto/add-role.dto";

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
    return this.adminModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id, {
      include: { all: true },
    });
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
  async addRoleByName(dto: AddRoleDto): Promise<Admin | null> {
    const admin = await this.adminModel.findByPk(dto.adminId);
    if (!admin) throw new NotFoundException("Admin topilmadi");

    const role = await Role.findOne({ where: { name: dto.name } });
    if (!role) throw new NotFoundException("Role topilmadi");

    await admin.$add("roles", role.id);

    return await this.adminModel.findByPk(dto.adminId, {
      include: { all: true },
    });
  }

  async removeRoleByName(dto: AddRoleDto): Promise<Admin | null> {
    const admin = await this.adminModel.findByPk(dto.adminId);
    if (!admin) throw new NotFoundException("Admin topilmadi");

    const role = await Role.findOne({ where: { name: dto.name } });
    if (!role) throw new NotFoundException("Role topilmadi");

    await admin.$remove("roles", role.id);

    return await this.adminModel.findByPk(dto.adminId, {
      include: { all: true },
    });
  }
}

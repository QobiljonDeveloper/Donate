import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./models/role.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existing = await this.roleModel.findOne({
      where: { name: createRoleDto.name },
    });

    if (existing) {
      throw new BadRequestException("Bunday rol allaqachon mavjud");
    }

    return this.roleModel.create(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role ID ${id} topilmadi`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const [count, updated] = await this.roleModel.update(updateRoleDto, {
      where: { id },
      returning: true,
    });

    if (count === 0) {
      throw new NotFoundException(`Role ID ${id} yangilanmadi`);
    }

    return updated[0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.roleModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Role ID ${id} topilmadi`);
    }

    return `Role ID ${id} o‘chirildi`;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Admin> {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ): Promise<Admin> {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<string> {
    return this.adminService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { RoleService } from "../role/role.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly roleService: RoleService
  ) {}
  @ApiOperation({ summary: "Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin Qo'shish",
    type: Admin,
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  @ApiOperation({ summary: "Adminlarni barchasini olish" })
  @ApiResponse({
    status: 200,
    description: "Adminlarni Barchasini olish",
    type: [Admin],
  })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  @ApiOperation({ summary: "Adminni id bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: "Adminni id bo'yicha olish",
    type: Admin,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }
  @ApiOperation({ summary: "Adminni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Adminni yangilash",
    type: Admin,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Adminni o'chirish",
    type: Admin,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }
  @ApiOperation({ summary: "Adminga Role qo'shish" })
  @ApiResponse({
    status: 200,
    description: "Adminga role qo'shish",
  })
  @Post("add-role")
  async addRole(@Body() dto: AddRoleDto) {
    return this.adminService.addRoleByName(dto);
  }
  @ApiOperation({ summary: "Admindan role ni olib tashlash" })
  @ApiResponse({
    status: 200,
    description: "Admindan Roleni olib tashlash",
    type: Admin,
  })
  @Delete("remove-role")
  async removeRole(@Body() dto: AddRoleDto) {
    return this.adminService.removeRoleByName(dto);
  }
}

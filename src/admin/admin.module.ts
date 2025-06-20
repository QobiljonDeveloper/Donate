import { forwardRef, Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { Role } from "src/role/models/role.model";
import { AdminRoleModel } from "./models/admin-role.model";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, Role, AdminRoleModel]),
    forwardRef(() => RoleModule),
  ],

  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

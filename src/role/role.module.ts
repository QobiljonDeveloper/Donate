import { Module, forwardRef } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./models/role.model";
import { AdminModule } from "src/admin/admin.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
    forwardRef(() => AdminModule), 
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}

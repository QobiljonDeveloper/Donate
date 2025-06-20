import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Admin } from "./admin.model";
import { Role } from "../../role/models/role.model";

@Table({ tableName: "admin_role", timestamps: false })
export class AdminRoleModel extends Model {
  @ForeignKey(() => Admin)
  @Column({ type: DataType.INTEGER })
  declare adminId: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  declare roleId: number;
}

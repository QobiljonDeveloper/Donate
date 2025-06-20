import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Admin } from "../../admin/models/admin.model";
import { AdminRoleModel } from "../../admin/models/admin-role.model";

interface IRoleCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: "roles", createdAt: true, updatedAt: false })
export class Role extends Model<Role, IRoleCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, unique: true })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @BelongsToMany(() => Admin, () => AdminRoleModel)
  admins: Admin[];
}

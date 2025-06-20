import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../../role/models/role.model";
import { AdminRoleModel } from "./admin-role.model";



interface IAdminCreationAttr {
  full_name: string;
  email: string;
  password_hash: string;
  is_active: boolean;
}

@Table({ tableName: "admin", createdAt: true, updatedAt: false })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare email: string;

 
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare password_hash: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  @BelongsToMany(()=> Role,()=> AdminRoleModel)
  roles:Role[]
}

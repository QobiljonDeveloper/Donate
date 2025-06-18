import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum AdminRole {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

interface IAdminCreationAttr {
  full_name: string;
  email: string;
  role: AdminRole;
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
    type: DataType.ENUM(...Object.values(AdminRole)),
    allowNull: false,
  })
  declare role: AdminRole;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare password_hash: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}

import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISocialCreationAttr {
  name: string;
  social_icon: string;
}

@Table({ tableName: "social", createdAt: true, updatedAt: false })
export class Social extends Model<Social, ISocialCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(30),
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare social_icon: string;
}

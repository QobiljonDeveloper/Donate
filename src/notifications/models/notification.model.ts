import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface INotificationCreationAttr {
  userId: number;
  name: string;
}

@Table({ tableName: "notification", createdAt: true, updatedAt: false })
export class Notification extends Model<
  Notification,
  INotificationCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;
}

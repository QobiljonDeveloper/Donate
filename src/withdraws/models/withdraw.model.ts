import { InferCreationAttributes } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

export enum WithdrawStatus {
  PENDING = "pending",
  APPROVERD = "approved",
  REJECTED = "rejected",
}

interface IWithdrawsCreationAttr {
  creatorId: number;
  amount: number;
  status: WithdrawStatus;
  site_fee: string;
}

@Table({ tableName: "withdraw", createdAt: true, updatedAt: false })
export class Withdraw extends Model<Withdraw, IWithdrawsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  declare amount: number;

  @Column({
    type: DataType.ENUM(...Object.values(WithdrawStatus)),
  })
  declare status: WithdrawStatus;

  @Column({
    type: DataType.STRING(50),
  })
  declare site_fee: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare creatorId: number;

  @BelongsTo(() => User)
  creator: User;
}

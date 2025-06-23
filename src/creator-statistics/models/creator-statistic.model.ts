import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface ICreatorStatisticsCreationAttr {
  creatorId: number;
  total_donations: number;
  total_supporters: number;
}

@Table({ tableName: "creator-statistic", createdAt: true, updatedAt: false })
export class CreatorStatistic extends Model<
  CreatorStatistic,
  ICreatorStatisticsCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare total_donations: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare total_supporters: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare creatorId: number;

  @BelongsTo(() => User)
  creator: User;
}

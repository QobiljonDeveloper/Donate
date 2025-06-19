import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Social } from "../../social/models/social.model";

interface ICreatorSocialCreationAttr {
  creatorId: number;
  socialId: number;
  url: string;
}

@Table({ tableName: "creator-social", createdAt: true, updatedAt: false })
export class CreatorSocial extends Model<
  CreatorSocial,
  ICreatorSocialCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare creatorId: number;
  @ForeignKey(() => Social)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare socialId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare url: string;
}

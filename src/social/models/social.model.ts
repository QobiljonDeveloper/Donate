import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { CreatorSocial } from "../../creator-social/model/creator-social.model";

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


  @BelongsToMany(()=>User, ()=>CreatorSocial)
  users:User[]
}

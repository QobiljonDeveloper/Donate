import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "../../products/models/product.model";

interface ICategoryCreationAttr {
  name: string;
}
@Table({ tableName: "category", createdAt: true, updatedAt: false })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  declare name: string;

  @HasMany(() => Product)
  product: Product[];
}

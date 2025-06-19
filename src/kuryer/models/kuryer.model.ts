import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum VehicleType {
  FOOT = "foot",
  BIKE = "bike",
  CAR = "car",
  MOTORCYCLE = "motorcycle",
}

interface IKuryerCreationAttr {
  full_name: string;
  phone_number: string;
  vehicle_type: VehicleType;
  vehicle_plate_number: string;
  is_active: boolean;
}

@Table({ tableName: "kuryer", createdAt: true, updatedAt: false })
export class Kuryer extends Model<Kuryer, IKuryerCreationAttr> {
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
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare phone_number: string;

  @Column({
    type: DataType.ENUM(...Object.values(VehicleType)),
    allowNull: false,
  })
  declare vehicle_type: VehicleType;

  @Column({
    type: DataType.STRING(50),
  })
  declare vehicle_plate_number: string;
  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}

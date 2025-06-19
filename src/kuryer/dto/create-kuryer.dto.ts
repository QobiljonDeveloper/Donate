import { VehicleType } from "../models/kuryer.model";

export class CreateKuryerDto {
  full_name: string;
  phone_number: string;
  vehicle_type: VehicleType;
  vehicle_plate_number: string;
  is_active: boolean;
}

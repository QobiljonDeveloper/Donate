import { AdminRole } from "../models/admin.model";

export class CreateAdminDto {
  full_name: string;
  email: string;
  role: AdminRole;
  password_hash: string;
  is_active: boolean;
}

import { UsersRole } from "../models/user.model";

export class CreateUserDto {
  full_name: string;
  email: string;
  role: UsersRole;
  bio: string;
  avatar_url: string;
  banner_url: string;
}

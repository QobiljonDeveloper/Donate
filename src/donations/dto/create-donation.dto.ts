import { paymentMethod } from "../models/donation.model";

export class CreateDonationDto {
  supporterId: number;
  creatorId: number;
  amount: number;
  message: string;
  payment_method: paymentMethod;
  is_anonymous: boolean;
}

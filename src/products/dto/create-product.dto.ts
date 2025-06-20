export class CreateProductDto {
  creatorId: number;
  name: string;
  description: string;
  in_stock: number;
  is_avialable: boolean;
  price: number;
  categoryId: number;
}

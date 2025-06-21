import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class CreateSocialDto {
  @ApiProperty({ example: "YouTube", description: "Ijtimoiy tarmoq nomi" })
  @IsString()
  name: string;

  @ApiProperty({
    example: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    description: "Ijtimoiy tarmoq ikonkasining URL manzili",
  })
  @IsUrl()
  social_icon: string;
}

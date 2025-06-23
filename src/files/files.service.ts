import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class FilesService {
  async saveFile(file: any): Promise<string> {
    try {
      const timestamp = Date.now();

      const originalExt = path.extname(file.originalname); 
      const baseName = path
        .basename(file.originalname, originalExt)
        .replace(/\s+/g, "_"); 

      const fileName = `${baseName}-${timestamp}${originalExt}`;

      const filePath = path.resolve(__dirname, "..", "..", "static");
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const fullPath = path.join(filePath, fileName);
      fs.writeFileSync(fullPath, file.buffer);

      return fileName;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        "Faylni yozishda xatolik yuz berdi"
      );
    }
  }
}

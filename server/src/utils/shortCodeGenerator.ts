import crypto from "crypto";
import { ShortUrlRepository } from "../repository/shortUrlRepository";


const shortUrlRepository = new ShortUrlRepository();
export async function generateUniqueShortCode(length: number = 6): Promise<string> {
  let code;
  let isDuplicate = true;

  while (isDuplicate) {
    code = crypto.randomBytes(length)
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, length);

    const existing = await shortUrlRepository.findByShortCode(code);
    if (!existing) isDuplicate = false;
  }

  return code!;
}

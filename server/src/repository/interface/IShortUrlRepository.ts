import { IShortUrl } from "../../types/shortUrl";
import { IBaseRepository } from "./IBaseRepository";

export interface IShortUrlRepository extends IBaseRepository<IShortUrl> {

    findByShortCode(shortCode: string): Promise<IShortUrl | null>

}
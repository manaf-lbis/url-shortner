import { BaseRepository } from "./baseRepository";
import { IShortUrl } from "../types/shortUrl";
import { IShortUrlRepository } from "./interface/IShortUrlRepository";
import { ShortUrlModel } from "../model/shortUrlModel";

export class ShortUrlRepository extends BaseRepository<IShortUrl>  implements IShortUrlRepository  {

    constructor() { 
        super(ShortUrlModel)
    };

    async findByShortCode(shortCode: string): Promise<IShortUrl | null> {
        return await ShortUrlModel.findOne({ shortCode });
    }

  

}
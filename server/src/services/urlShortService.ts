import { Types } from "mongoose";
import { IShortUrlRepository } from "../repository/interface/IShortUrlRepository";
import { generateUniqueShortCode } from "../utils/shortCodeGenerator";
import { IUrlShortService } from "./interface/IUrlShortService";

export class UrlShortService implements IUrlShortService {
    constructor(
        private _shortUrlRepository: IShortUrlRepository
    ) { }

    async shortenUrl(url: string,userId:Types.ObjectId): Promise<{shortcode:string}> {
        const shortCode = await generateUniqueShortCode();

        const shortUrl = await this._shortUrlRepository.create({
            originalUrl:url,
            shortCode,
            userId
        });

        return {
            shortcode:shortUrl.shortCode
        }
    }

    


}
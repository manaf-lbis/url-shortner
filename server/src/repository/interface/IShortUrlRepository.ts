import { Types } from "mongoose";
import { IShortUrl } from "../../types/shortUrl";
import { IBaseRepository } from "./IBaseRepository";

export interface IShortUrlRepository extends IBaseRepository<IShortUrl> {

    findByShortCode(shortCode: string): Promise<IShortUrl[] | null>
    totalLinksAndClicks(): Promise<any>
    dashboardStats(userId: Types.ObjectId): Promise<{ totalLinks: number; totalClicks: number; AvgClicks: number; }>
    generatedLinks(userId: Types.ObjectId): Promise<any>
    resolveUrl(shortcode: string): Promise<IShortUrl | null>
    urlExistForUser(userId:Types.ObjectId,url:string):Promise<any|null>

}
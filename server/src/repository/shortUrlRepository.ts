import { BaseRepository } from "./baseRepository";
import { IShortUrl } from "../types/shortUrl";
import { IShortUrlRepository } from "./interface/IShortUrlRepository";
import { ShortUrlModel } from "../model/shortUrlModel";
import { Types } from "mongoose";

export class ShortUrlRepository extends BaseRepository<IShortUrl> implements IShortUrlRepository {

    constructor() {
        super(ShortUrlModel)
    };

    async findByShortCode(shortCode: string): Promise<IShortUrl[] | null> {
        return await ShortUrlModel.find({ shortCode });
    }

    async totalLinksAndClicks(): Promise<any> {
        const result = await ShortUrlModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalLinks: { $sum: 1 },
                    totalClicks: { $sum: "$clicksCount" }
                }
            }
        ]);

        return {
            totalLinks: result[0]?.totalLinks || 0,
            totalClicks: result[0]?.totalClicks || 0
        }
    }

    async dashboardStats(userId: Types.ObjectId): Promise<{ totalLinks: number; totalClicks: number; AvgClicks: number; }> {

        const result = await ShortUrlModel.aggregate([
            {
                $match: {
                    userId: new Types.ObjectId(userId),
                    isDeleted: false
                }

            },
            {
                $group: {
                    _id: null,
                    totalLinks: { $sum: 1 },
                    totalClicks: { $sum: "$clicksCount" },
                    averageClicks: { $avg: "$clicksCount" }
                }
            }
        ]);

        return {
            totalLinks: result[0]?.totalLinks || 0,
            totalClicks: result[0]?.totalClicks || 0,
            AvgClicks: result[0]?.averageClicks || 0
        }

    }

    async generatedLinks(userId: Types.ObjectId): Promise<{ totalLinks: number; totalClicks: number; links: IShortUrl[]; }> {

        const stats = await this.dashboardStats(userId)
        const links = await ShortUrlModel.find({ userId, isDeleted: false })
            .select('shortCode longUrl clicksCount originalUrl createdAt isActive _id title')
            .sort({ createdAt: -1 });

        return {
            totalClicks: stats.totalClicks,
            totalLinks: stats.totalLinks,
            links
        }
    }

    async resolveUrl(shortcode: string): Promise<IShortUrl | null> {
        return await ShortUrlModel.findOneAndUpdate({ shortCode: shortcode }, { $inc: { clicksCount: 1 } });
    }

    async urlExistForUser(userId: Types.ObjectId, url: string): Promise<any | null> {
        return await ShortUrlModel.find({userId,originalUrl:url})
    }




}
import { Types } from "mongoose";
import { IShortUrlRepository } from "../repository/interface/IShortUrlRepository";
import { generateUniqueShortCode } from "../utils/shortCodeGenerator";
import { IUrlShortService } from "./interface/IUrlShortService";
import { IUserRepository } from "../repository/interface/IUserRepository";
import ApiError from "../utils/apiError";

export class UrlShortService implements IUrlShortService {
    constructor(
        private _shortUrlRepository: IShortUrlRepository,
        private _userRepository: IUserRepository
    ) { }

    async resolveUrl(shortcode: string) {
        const url = await this._shortUrlRepository.resolveUrl(shortcode);

        if(!url) throw new ApiError("URL not found", {});
        if(!url.originalUrl) throw new ApiError("URL not found", {});
        if(url.isDeleted) throw new ApiError("URL not found", {});
        if(!url.isActive) throw new ApiError("URL not Active Contact Link Manager", {});
        if(!url.shortCode) throw new ApiError("URL not found", {});

        return {
            originalUrl: url.originalUrl
        }
    }

    async shortenUrl(url: string, userId: Types.ObjectId): Promise<{ shortcode: string }> {

        const shortCode = await generateUniqueShortCode();

        const shortUrl = await this._shortUrlRepository.create({
            originalUrl: url,
            shortCode,
            userId
        });

        return {
            shortcode: shortUrl.shortCode
        }
    }


    async getHome(): Promise<{ totalUsers: number, totalLinks: number, totalClicks: number }> {
        const users = await this._userRepository.userscount()
        const stats = await this._shortUrlRepository.totalLinksAndClicks()
        return {
            totalUsers: users,
            totalLinks: stats.totalLinks,
            totalClicks: 0
        }
    }

    async getDashboard(userId: Types.ObjectId): Promise<{ totalLinks: number; totalClicks: number; AvgClicks: number; }> {
        const stats = await this._shortUrlRepository.dashboardStats(userId)
        return stats
    }

    async myLinks(userId: Types.ObjectId): Promise<any> {
        const links = await this._shortUrlRepository.generatedLinks(userId)
        return links
    }

    async editLink(userId: string, linkId: string, title: string, shortCode: string): Promise<any> {
        const existingLinks = await this._shortUrlRepository.findByShortCode(shortCode);

        const conflict = existingLinks?.some(
            (link) => link._id.toString() !== linkId
        );

        if (conflict) {
            throw new ApiError("Short code already exists", {});
        }
        return await this._shortUrlRepository.update(
            new Types.ObjectId(linkId),
            { title, shortCode }
        );
    }

    async changeVisibility(linkId: string): Promise<any> {
        const link = await this._shortUrlRepository.findById(new Types.ObjectId(linkId));
        return await this._shortUrlRepository.update(new Types.ObjectId(linkId), { isActive: !link?.isActive });
    }

    async deleteLink(linkId: Types.ObjectId): Promise<any> {
        return await this._shortUrlRepository.update(linkId, { isDeleted: true });
    }




}
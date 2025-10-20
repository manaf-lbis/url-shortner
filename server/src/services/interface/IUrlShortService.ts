import { Types } from "mongoose";

export interface IUrlShortService {
    resolveUrl(shortcode: string): any;
    shortenUrl(url: string, userId: Types.ObjectId): Promise<{ shortcode: string }>;
    getHome(): Promise<{ totalUsers: number, totalLinks: number, totalClicks: number }>;
    getDashboard(userId: Types.ObjectId): Promise<{ totalLinks: number, totalClicks: number, AvgClicks: number }>;
    myLinks(userId: Types.ObjectId): Promise<any>;

    editLink(userId: string, linkId: string, title: string, shortCode: string): Promise<any>;
    changeVisibility(linkId: string): Promise<any>;
    deleteLink(linkId: Types.ObjectId): Promise<any>;

}


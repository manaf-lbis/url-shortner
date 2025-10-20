import { Types } from "mongoose";

export interface IUrlShortService {
    shortenUrl(url: string, userId: Types.ObjectId): Promise<{shortcode:string}>;
}
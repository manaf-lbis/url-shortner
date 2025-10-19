import { Document, Types } from "mongoose";

export interface IShortUrl extends Document{
    userId:Types.ObjectId;
    originalUrl: string;
    shortCode: string;
    clicksCount: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../utils/apiSuccess";
import ApiError from "../utils/apiError";
import { IUrlShortService } from "../services/interface/IUrlShortService";
import { Types } from "mongoose";

export class AppController {

    constructor(
        private _urlShortService: IUrlShortService
    ) { }


    test(req: Request, res: Response, next: NextFunction) {
        sendSuccess(res, {
            time: new Date().toISOString()
        }, "API is working fine")

    }


    async resolveUrl(req: Request, res: Response, next: NextFunction) {
        try {
            const shortcode = req?.params?.id?.trim();
            if (!shortcode) throw new ApiError("Shortcode is required", null);
            const response = await this._urlShortService.resolveUrl(shortcode);
            
            sendSuccess(res, response, "URL Resolved Successfully");
        } catch (error) {
            next(error);
        }   

    }

    async shortenUrl(req: Request, res: Response, next: NextFunction) {
        try {
            
            
            const url = req.body?.url?.trim();
            const user = (req as any).user;

            if (!user) throw new ApiError("Unauthorized", null);
            if (!url) throw new ApiError("URL is required", null);
            try {
                new URL(url);
            } catch (error) {
                throw new ApiError("Invalid URL", null);
            }

            const response = await this._urlShortService.shortenUrl(url, user.userId);


            sendSuccess(res, {
                shortcode: response.shortcode
            },
                "URL Shortened Successfully"
            );

        } catch (error) {
            next(error);
        }
    }

    async getHome(req: Request, res: Response, next: NextFunction) {
        try {

            const response = await this._urlShortService.getHome();
            sendSuccess(res, response, "Home Page");
        } catch (error) {
            next(error);
        }
    }


    async getDashboard(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const response = await this._urlShortService.getDashboard(userId);
            sendSuccess(res, response, "Dashboard Page");
        } catch (error) {
            next(error);
        }
    }

    async myLinks(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any)?.user?.userId;

            const response = await this._urlShortService.myLinks(userId);
            sendSuccess(res, response, "My Links Page");
        } catch (error) {
            next(error);
        }
    }

    async editLink(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any)?.user?.userId;
            const linkId = req.params?.id;
            if (!linkId) throw new ApiError("Link Id is required", null);

            const { title, shortCode } = req.body;
            if (!title.trim() || !shortCode.trim()) throw new ApiError("Title and URL is required", null);

            await this._urlShortService.editLink(userId, linkId, title, shortCode);
            sendSuccess(res, {}, "Edit Link Page");
        } catch (error) {
            next(error);
        }
    }

    async deleteLink(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any)?.user?.userId;
            const linkId = req.params?.id;
            const response = await this._urlShortService.deleteLink(new Types.ObjectId(linkId));
            sendSuccess(res, response, "Delete Link Page");
        } catch (error) {
            next(error);
        }
    }

    async changeVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any)?.user?.userId;
            const linkId = req.params?.id;
            const response = await this._urlShortService.changeVisibility(linkId);
            sendSuccess(res, response, "Change Visibility Page");
        } catch (error) {
            next(error);
        }
    }

}
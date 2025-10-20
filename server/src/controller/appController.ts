import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../utils/apiSuccess";
import ApiError from "../utils/apiError";
import { IUrlShortService } from "../services/interface/IUrlShortService";

export class AppController {

    constructor(
        private _urlShortService: IUrlShortService
    ) { }


    test(req: Request, res: Response, next: NextFunction) {
        sendSuccess(res, {
            time: new Date().toISOString()
        }, "API is working fine")

    }


    resolveUrl(req: Request, res: Response, next: NextFunction) {

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

}
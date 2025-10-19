import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../utils/apiSuccess";

export class AppController {


    test(req:Request, res:Response, next:NextFunction) {
        sendSuccess(res,{
            time: new Date().toISOString()
        },"API is working fine")

    }


    resolveUrl(req:Request, res:Response, next:NextFunction) {

    }

}
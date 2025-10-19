import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../services/interface/IAuthService";
import { sendSuccess } from "../utils/apiSuccess";
import ApiError from "../utils/apiError";

export class AuthController {

    constructor(
        private _authService: IAuthService
    ){}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if(!email.trim() || !password.trim()) throw new ApiError("Email and password are required",null);
            const user = await this._authService.login(email, password);
            sendSuccess(res,{email:'email@gmail.com'},"Login successful");

        } catch (error) {
            next(error);
        }
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await this._authService.signup(email, password);
            sendSuccess(res,user,"Signup successful");

        } catch (error) {
            next(error);
        }
    }

    async validateToken(req: Request, res: Response, next: NextFunction) {
        try {
            sendSuccess(res,{},"Token is valid");

        } catch (error) {
            next(error);
        }
    }

}
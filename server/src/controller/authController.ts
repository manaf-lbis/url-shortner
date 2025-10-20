import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../services/interface/IAuthService";
import { sendSuccess } from "../utils/apiSuccess";
import ApiError from "../utils/apiError";
import { verifyToken } from "../utils/token";

export class AuthController {

    constructor(
        private _authService: IAuthService
    ) { }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email.trim() || !password.trim()) throw new ApiError("Email and password are required", null);
            const user = await this._authService.login(email, password);

            res.cookie("token",user.accessToken)

            sendSuccess(res, null, "Login successful");

        } catch (error) {
            next(error);
        }
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            
            const { email, password } = req.body;
            if (!email.trim() || !password.trim()) throw new ApiError("Email and password are required", null);

            const user = await this._authService.signup(email, password);

            res.cookie("signupToken",user.signupToken)

            sendSuccess(res, user, "Signup successful");

        } catch (error) {
            next(error);
        }
    }

    async verifySignupOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            if (!otp?.trim() || otp.length !== 6) throw new ApiError("Email and OTP are required", null);

            const signupToken = req.cookies.signupToken;
            if (!signupToken) throw new ApiError("Invalid signup Attempt Try Again", null);
        
            const response = await this._authService.verifySignupOtp(otp.trim(), signupToken);

            res.clearCookie("signupToken");
            res.cookie("token",response.accessToken)

            sendSuccess(res, {}, "OTP verified successfully");

        } catch (error) {
            next(error);
        }
    }

    async validateToken(req: Request, res: Response, next: NextFunction) {
        try {
            sendSuccess(res, {}, "Session is valid");
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("token");
            sendSuccess(res, {}, "Logout successful");
        } catch (error) {
            next(error);
        }
    }

    async resentOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const token = req.cookies.signupToken;
            if (!email.trim()) throw new ApiError("Email is required", null);
            const user = await this._authService.resendOtp(email,token);

            res.cookie("signupToken",user.signupToken)

            sendSuccess(res, null, "OTP resent successfully");
        } catch (error) {
            next(error);
        }
    }

}
import { Types } from "mongoose";
import { IOtpRepository } from "../repository/interface/IOtpRepository";
import { IUserRepository } from "../repository/interface/IUserRepository";
import { otpTemplate } from "../template/otpTemplate";
import ApiError from "../utils/apiError";
import { comparePassword, hashPassword } from "../utils/hashing";
import { sendMail } from "../utils/mail";
import { generateOTP } from "../utils/otpGenerator";
import { generateAccessToken, generateTokens, verifyToken } from "../utils/token";
import { IAuthService } from "./interface/IAuthService";
import { StatusCodes } from "../types/statusCodes";

export class AuthService implements IAuthService {

    constructor(
        private _userRepository: IUserRepository,
        private _otpRepository: IOtpRepository
    ) { }
    async login(email: string, password: string): Promise<any> {
        const user = await this._userRepository.findByEmail(email);

        if (!user) throw new ApiError("Invalid email or password", null);
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) throw new ApiError("Invalid email or password", null);
        const token = generateTokens({
            email: user.email,
            userId: user._id
        });

        await this._userRepository.update(user._id, {
            refreshToken: token.refreshToken
        });

        return token;
    }

    async signup(email: string, password: string): Promise<{ signupToken: string }> {

        const userWithEmail = await this._userRepository.findByEmail(email);
        if (userWithEmail) throw new ApiError("Email already in use", null);

        const hashedPassword = await hashPassword(password);

        const otp = generateOTP();
        console.log(`OTP ${otp}`);

        const otpRecord = await this._otpRepository.create({
            email,
            otp,
        });

        const signupToken = generateAccessToken({
            email,
            passwordHash: hashedPassword,
            otpId: otpRecord._id
        });


        await sendMail(email, "Your Signup OTP", otpTemplate(otp));

        return { signupToken };
    };

    async verifySignupOtp(otp: string, signupToken: string): Promise<{ email: string, accessToken: string }> {

        const data = verifyToken(signupToken);
        if (!data) throw new ApiError("Invalid signup Attempt Try Again", null,StatusCodes.BAD_REQUEST);

        const otpRecord = await this._otpRepository.findById(data.otpId!);
        if (!otpRecord) throw new ApiError("OTP Expired", null,400);

        if (otpRecord.attempts >= Number(process.env.MAX_OTP_ATTEMPTS)) {
            throw new ApiError("OTP attempts exceeded, Try after Sometime", null,400);
        }

        if (otpRecord.otp !== otp.trim()) {
            await this._otpRepository.update(data.otpId!, { attempts: otpRecord.attempts + 1 });
            throw new ApiError(`Invalid OTP You have ${Number(process.env.MAX_OTP_ATTEMPTS) - otpRecord.attempts} left.`, null);
        }

        const user = await this._userRepository.create({
            email: data.email,
            password: data.passwordHash,
        });

        const tokens = generateTokens({
            email: user.email,
            userId: user._id
        });

        await this._userRepository.update(user._id, {
            refreshToken: tokens.refreshToken
        });

        return { email: user.email, accessToken: tokens.accessToken };
    };


    async resendOtp(email: string, token: string): Promise<{ signupToken: string }> {

        const data = verifyToken(token);
        if (!data) throw new ApiError("Invalid signup Attempt Try Again", null);

        const otpRecord = await this._otpRepository.findById(data.otpId!);
        if (!otpRecord) throw new ApiError("OTP Expired", null);

        if (otpRecord.attempts >= Number(process.env.MAX_OTP_ATTEMPTS)) {
            throw new ApiError("OTP attempts exceeded, Try after Sometime", null);
        }

        const otp = generateOTP();
        console.log(`OTP ${otp}`);

       const newOtpRecord = await this._otpRepository.update(data.otpId!, {
            otp,
            expiresAt: new Date(Date.now() + Number(process.env.OTP_VALIDITY_MINUTES) * 60 * 1000)
        });

        await sendMail(email, "Your Signup OTP", otpTemplate(otp));

        const signupToken = generateAccessToken({
            email : data.email,
            passwordHash: data.passwordHash,
            otpId: otpRecord._id
        });


        return { signupToken: signupToken };
    }






}
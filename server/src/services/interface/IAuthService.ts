export interface IAuthService {
    login(email: string, password: string): Promise<any>;
    signup(email: string, password: string): Promise<{signupToken: string}>;
    verifySignupOtp(otp: string, signupToken: string): Promise<{ email: string,accessToken : string }>;
    resendOtp(email: string,token: string): Promise<{ signupToken: string }>;
}
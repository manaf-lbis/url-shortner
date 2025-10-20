import { Router } from "express";
import { AuthController } from "../controller/authController";
import { AuthService } from "../services/authService";
import { UserRepository } from "../repository/userRepository";
import { OtpRepository } from "../repository/otpRepository";
import { authentication } from "../middleware/authentiacation";


const router = Router();

const userRepository = new UserRepository()
const otpRepository = new OtpRepository();
const authService = new AuthService(userRepository,otpRepository);
const authController = new AuthController(authService);


router.post("/signup",authController.signup.bind(authController));
router.post("/verify-otp",authController.verifySignupOtp.bind(authController));
router.post("/login",authController.login.bind(authController));
router.get("/validate",authentication,authController.validateToken.bind(authController));
router.post("/logout",authController.logout.bind(authController));
router.post("/resent-otp",authController.resentOtp.bind(authController));





export default router;
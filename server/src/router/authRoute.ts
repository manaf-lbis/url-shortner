import { Router } from "express";
import { AuthController } from "../controller/authController";
import { AuthService } from "../services/authService";


const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);


router.post("/signup",authController.signup.bind(authController));
router.post("/login",authController.login.bind(authController));
router.get("/validate",authController.validateToken.bind(authController));






export default router;
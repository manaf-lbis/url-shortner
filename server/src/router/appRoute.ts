import { Router } from "express";
import { AppController } from "../controller/appController";

const appcontroller = new AppController()


const router = Router();



router.get("/testApi", appcontroller.test.bind(appcontroller));
router.get("/:id", appcontroller.resolveUrl.bind(appcontroller));





export default router;
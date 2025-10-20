import { Router } from "express";
import { AppController } from "../controller/appController";
import { UrlShortService } from "../services/urlShortService";
import { ShortUrlRepository } from "../repository/shortUrlRepository";
import { authentication } from "../middleware/authentiacation";
import { UserRepository } from "../repository/userRepository";

const shortUrlRepository = new ShortUrlRepository()
const userRepository = new UserRepository()
const urlShortService = new UrlShortService(shortUrlRepository, userRepository)
const appcontroller = new AppController(urlShortService)


const router = Router();

router.get("/home", appcontroller.getHome.bind(appcontroller));
router.get("/testApi", appcontroller.test.bind(appcontroller));

router.get("/my-links", authentication, appcontroller.myLinks.bind(appcontroller));
router.get("/dashboard", authentication, appcontroller.getDashboard.bind(appcontroller));
router.post("/shorten", authentication, appcontroller.shortenUrl.bind(appcontroller));

router.patch("/my-links/:id", authentication, appcontroller.editLink.bind(appcontroller));
router.delete("/my-links/:id/delete", authentication, appcontroller.deleteLink.bind(appcontroller));
router.patch("/my-links/:id/toggle-visibility", authentication, appcontroller.changeVisibility.bind(appcontroller));

router.get("/:id", appcontroller.resolveUrl.bind(appcontroller));




export default router;
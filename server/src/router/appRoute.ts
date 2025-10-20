import { Router } from "express";
import { AppController } from "../controller/appController";
import { UrlShortService } from "../services/urlShortService";
import { ShortUrlRepository } from "../repository/shortUrlRepository";
import { authentication } from "../middleware/authentiacation";

const shortUrlRepository = new ShortUrlRepository()
const urlShortService = new UrlShortService(shortUrlRepository)
const appcontroller = new AppController(urlShortService)


const router = Router();



router.get("/testApi", appcontroller.test.bind(appcontroller));
router.get("/:id", appcontroller.resolveUrl.bind(appcontroller));
router.post("/shorten",authentication, appcontroller.shortenUrl.bind(appcontroller));






export default router;
import { Router } from "express";
import settings from "./settings";

const router: Router = Router();

router.use("/settings", settings);

export default router;

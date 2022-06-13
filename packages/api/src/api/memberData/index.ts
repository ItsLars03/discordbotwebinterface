import { Router } from "express";
import leveling from "./leveling";

const router: Router = Router();

router.use("/leveling", leveling);

export default router;

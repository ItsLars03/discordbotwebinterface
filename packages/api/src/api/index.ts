import { Router } from "express";
import settings from "./settings";
import memberData from "./memberData";

const router: Router = Router();

router.use("/settings", settings);
router.use("/memberdata", memberData);

export default router;

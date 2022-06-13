import { Router } from "express";
import getExp from "./getExp";
import updateExp from "./updateExp";

const router = Router();
router.use("/", getExp);
router.use("/update", updateExp);

export default router;

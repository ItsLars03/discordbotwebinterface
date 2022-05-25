import { Router } from "express";
import getSettings from "./get";
import createSettings from "./create";
import updateSettings from "./update";

const router = Router();
router.use("/", getSettings);
router.use("/create", createSettings);
router.use("/update", updateSettings);

export default router;

import { Router } from "express";
import settings from "../../database/schemas/settings";

const router = Router();

router.post("/:id", async (req, res, next) => {
  if (!req.params.id) {
    next();
    return;
  }

  try {
    const data = await settings.create({ guildId: req.params.id });
    global.libs.socketUtils.sendEvery("settings-create", req.params.id, {
      ...data.toObject(),
    });
    res.json({
      ...data.toObject(),
    });
  } catch (error) {
    next(error as Error);
  }
});

export default router;

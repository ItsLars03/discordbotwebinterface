import { Router } from "express";
import settings from "../../database/schemas/settings";

const router = Router();

router.get("/:id", async (req, res, next) => {
  if (!req.params.id) {
    next();
    return;
  }

  try {
    const data = await settings.findOne({ guildId: req.params.id });
    if (data == null) {
      next();
      return;
    }
    res.status(200).json({ ...data });
  } catch (error) {
    next(error as Error);
  }
});

export default router;

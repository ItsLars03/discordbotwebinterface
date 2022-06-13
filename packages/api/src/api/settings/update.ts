import { Router } from "express";
import settings from "../../database/schemas/settings";

const router = Router();

router.post("/:id", async (req, res, next) => {
  const guildId = req.params.id;

  let updates: {
    prefix?: string;
  } = {};

  if (req.body["prefix"]) {
    updates.prefix = req.body["prefix"];
  }

  try {
    const updatedDoc = await settings
      .findOneAndUpdate({ guildId }, { ...updates }, { new: true })
      .exec();

    if (updatedDoc == null) {
      next();
      return;
    }

    global.libs.socketUtils.sendEvery("settings-update", guildId, {
      ...updatedDoc.toObject(),
    });
    res.status(200).json({ ...updatedDoc.toObject() });
  } catch (error) {
    next(error as Error);
  }
});

export default router;

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
    const updatedDoc = await settings.updateOne({ guildId }, { ...updates });
    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    next(error as Error);
  }
});

export default router;

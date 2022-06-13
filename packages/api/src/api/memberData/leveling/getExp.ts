import { Router } from "express";
import memberData from "../../../database/schemas/memberData";

const router = Router();

router.get("/:guildId/:memberId", async (req, res, next) => {
  if (!req.params.guildId || !req.params.memberId) {
    next();
    return;
  }

  try {
    const data = await memberData.findOne({
      guildId: req.params.guildId,
      memberId: req.params.memberId,
    });
    if (data == null) {
      next();
      return;
    }

    res.status(200).json({ ...data.toObject() });
  } catch (error) {
    next(error as Error);
  }
});

export default router;

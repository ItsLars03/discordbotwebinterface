import { Router } from "express";
import memberData from "../../../database/schemas/memberData";

const router = Router();

router.post("/add/:guildId/:memberId", async (req, res, next) => {
  if (!req.params.guildId || !req.params.memberId) {
    next();
    return;
  }

  const update: {
    guildId: string;
    memberId: string;
    exp?: number;
  } = {
    guildId: req.params.guildId,
    memberId: req.params.memberId,
  };

  let expToAdd = 0;
  if (req.body["exp"] != null) {
    let exp = parseInt(req.body["exp"]);
    if (!isNaN(exp)) {
      expToAdd += exp;
    } else {
      next(new Error("exp needs to be a number."));
      return;
    }
  }

  if (expToAdd <= 0) {
    next(new Error("Cannot add less then 1 exp."));
    return;
  }

  try {
    const data = await memberData.findOneAndUpdate(
      { guildId: req.params.guildId, memberId: req.params.memberId },
      { $inc: { exp: expToAdd } },
      { upsert: true, new: true }
    );

    // maybe send socket event to level up? maybe calc level up?
    res.json({ ...data.toObject() });
  } catch (error) {
    next(error as Error);
  }
});

// router.post("addmany", async (req, res, next) => {
//   if (!req.body["data"]) {
//     next();
//     return;
//   }

//   if (!Array.isArray(req.body)) {
//     next();
//     return;
//   }

//   for (const data of req.body) {
//     if (data)
// }
// });

router.post("/reset/:guildId/:memberId", async (req, res, next) => {
  if (!req.params.guildId || !req.params.memberId) {
    next();
    return;
  }

  try {
    const data = await memberData.findOneAndUpdate(
      { guildId: req.params.guildId, memberId: req.params.memberId },
      { $set: { exp: 0 } },
      { new: true }
    );

    if (data == null) {
      next();
      return;
    }

    // maybe send socket event?
    res.json({ ...data.toObject() });
  } catch (error) {
    next(error as Error);
  }
});

export default router;

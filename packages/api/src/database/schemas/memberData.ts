import { model, Schema } from "mongoose";

export interface MemberData {
  guildId: string;
  memberId: string;
  exp: number;
}

const memberData = new Schema<MemberData>({
  guildId: {
    type: String,
    required: true,
  },
  memberId: {
    type: String,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
    default: 0,
  },
});

memberData.index({ guildId: 1, mebmerId: 1 }, { unique: true });

export default model<MemberData>("memberData", memberData);

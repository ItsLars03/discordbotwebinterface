import { model, Schema } from "mongoose";

interface Settings {
  guildId: string;
  prefix: string;
}

const settings = new Schema<Settings>({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
    default: "!",
  },
});

export default model<Settings>("settings", settings);

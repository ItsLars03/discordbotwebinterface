import { connect } from "mongoose";
import config from "../config";

export default () => {
  console.log("Connecting to mongo...");
  connect(config.db.uri);
  console.log("Done!");
};

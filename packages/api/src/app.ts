import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// import { notFound, errorHandler } from "./middlewares";
// import uploader from "./uploader";

const app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// app.use("/", uploader);

// app.use(notFound);
// app.use(errorHandler);

export default app;

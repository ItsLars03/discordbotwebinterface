import * as express from "express";
import * as morgan from "morgan";
import helmet from "helmet";
import * as cors from "cors";

import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";
import api from "./api";

const app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;

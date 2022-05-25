import app from "./app";
// import config from './config'
import database from "./database/connect";

const port = 5001;

// Connect mongo
database();

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

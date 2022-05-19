import app from "./app";
// import config from './config'
// import database from './database';

const port = 5002;

//Connect mongo
// database(config.database.uri)

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

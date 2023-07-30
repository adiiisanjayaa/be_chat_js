import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as cors from "cors";
import helmet from "helmet";

import routes from "./routes";
import config from "./config/config";

//initialize express app
const app = express();

// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

//morgan to logger
app.use(morgan("tiny"));

//Set all routes from routes folder
app.use("/", routes);

//use handle error
app.use(function (req, res, next) {
  res.status(404).send("Unable to find the requested resource!");
});

app.listen(config.port, () =>
  console.log(`⚡️[server]: Server is running at port ${config.port}`)
);

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import eventsController from "./events/events.controller.js";
import { MongoClient } from "mongodb";

const PORT = process.env.PORT || 4000;

async function main() {
  const app = express();

  app.use(bodyParser.json());

  app.use(async (req, _res, next) => {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    req.db = client.db("DT-API");
    next();
  });

  app.use("/events", eventsController);
  app.listen(PORT, async () => {
    console.log(`listening on ${PORT}...`);
  });
}

main();

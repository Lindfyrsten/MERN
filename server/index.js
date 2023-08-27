import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { getDecksController } from "./controllers/getDecksController.js";
import { createDeckController } from "./controllers/createDeckController.js";
import { deleteDeckController } from "./controllers/deleteDeckController.js";
import { createCardForDeckController } from "./controllers/createCardForDeckController.js";
import { getDeckController } from "./controllers/getDeckController.js";
import { deleteCardFromDeckController } from "./controllers/deleteCardFromDeckController.js";

config();

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardFromDeckController);

const db = await mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(5000);
});

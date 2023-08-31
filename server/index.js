import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import deckController from "./controllers/deckController.js";
import cardController from "./controllers/cardController.js";
import { Login, Signup } from "./controllers/AuthController.js";
import userVerification from "./middleware/AuthMiddleware.js";
import bodyParser from "body-parser";

config();

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/decks", deckController.getAll);
app.get("/decks/:deckId/cards", cardController.getAllCardsInDeck);
app.get("/cards", cardController.getAllCards);
app.get("/decks/:deckId", deckController.get);
app.post("/decks", deckController.create);
app.post("/decks/:deckId/cards", cardController.create);
app.delete("/decks/:deckId", deckController.delete);
app.delete("/decks/:deckId/cards/:cardId", cardController.delete);
app.post("/signup", Signup);
app.post("/login", Login);
app.post("/", userVerification);

const db = await mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(5000);
});

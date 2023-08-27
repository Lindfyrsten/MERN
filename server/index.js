import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck.js";

import { config } from "dotenv";
config();

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/decks", async (req, res) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post("/decks", async (req, res) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete("/decks/:deckId", async (req, res) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
});

const db = await mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(5000);
});

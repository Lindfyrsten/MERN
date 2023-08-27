import Deck from "../models/Deck.js";
export async function getDecksController(req, res) {
  const decks = await Deck.find();
  res.json(decks);
}

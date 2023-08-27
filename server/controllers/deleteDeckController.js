import Deck from "../models/Deck.js";
export async function deleteDeckController(req, res) {
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
}

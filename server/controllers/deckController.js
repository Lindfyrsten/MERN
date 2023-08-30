import Deck from "../models/Deck.js";

let deckController = {
  create: async (req, res) => {
    const newDeck = new Deck({
      title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
  },
  get: async (req, res) => {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    res.json(deck);
  },
  delete: async (req, res) => {
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);
    res.json(deck);
  },

  getAll: async (req, res) => {
    const decks = await Deck.find();
    res.json(decks);
  },
};

export default deckController;

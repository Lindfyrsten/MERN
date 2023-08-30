import Card from "../models/Card.js";
import Deck from "../models/Deck.js";

let cardController = {
  create: async (req, res) => {
    try {
      const deckId = req.params.deckId;
      const deck = await Deck.findById(deckId);

      if (!deck) {
        return res.status(404).json({ message: "Deck not found" });
      }

      const newCard = new Card({
        title: req.body.title,
        ownerId: deckId,
        ownerName: deck.title,
      });

      const createdCard = await newCard.save();
      deck.cards.push(createdCard._id);
      await deck.save();

      res.json(createdCard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getAllCards: async (req, res) => {
    const cards = await Card.find();
    res.json(cards);
  },

  getAllCardsInDeck: async (req, res) => {
    try {
      const deckId = req.params.deckId;

      const deck = await Deck.findById(deckId).populate("cards");

      if (!deck) {
        return res.status(404).json({ message: "Deck not found" });
      }

      res.json(deck.cards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const cardId = req.params.cardId;

      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        { title: req.body.title },
        { new: true }
      );

      if (!updatedCard) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  delete: async (req, res) => {
    console.log("DELETING CARD");
    try {
      const cardId = req.params.cardId;

      const deletedCard = await Card.findByIdAndDelete(cardId);

      if (!deletedCard) {
        return res.status(404).json({ message: "Card not found" });
      }

      const deck = await Deck.findById(deletedCard.owner);
      deck.cards.pull(cardId);
      await deck.save();

      res.json(deletedCard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default cardController;

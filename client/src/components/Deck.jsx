import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createCard } from "../api/createCard";
import { getDeck } from "../api/getDeck";
import { deleteCard } from "../api/deleteCard";

export default function Deck() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [text, setText] = useState("");
  let { deckId } = useParams();

  async function handleCreateCard(e) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId, text);
    setCards(serverCards);
    setText("");
    console.log(cards);
  }

  async function handleDeleteCard(deckId, index) {
    if (!deckId) return;
    await deleteCard(deckId, index);
    setCards(cards.filter((card, i) => i !== index));
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) {
        return;
      }
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div className="App page-width">
      <h1>Cards</h1>
      <ul className="decks">
        {cards.map((card, index) => (
          <li key={card}>
            {card}
            <div
              className="delete-button"
              onClick={() => handleDeleteCard(deckId, index)}
            >
              X
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateCard}>
        <label htmlFor="card-text">Card Text</label>
        <input
          id="card-text"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createCard } from "../api/createCard";
import { getDeck } from "../api/getDeck";
import { deleteCard } from "../api/deleteCard";
import { getCardsInDeck } from "../api/getCardsInDeck";

export default function Deck() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [text, setText] = useState("");
  let { deckId } = useParams();

  async function handleCreateCard(e) {
    e.preventDefault();
    await createCard(deckId, text);
    const updatedCards = await getCardsInDeck(deckId);
    setCards(updatedCards);
    setText("");
  }

  async function handleDeleteCard(deckId, index, cardId) {
    if (!deckId) return;
    await deleteCard(deckId, cardId);
    setCards(cards.filter((card, i) => i !== index));
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) {
        return;
      }
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      const newCards = await getCardsInDeck(deckId);
      setCards(newCards);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div className="App page-width">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards?.map((card, index) => (
          <li key={index}>
            {card.title}
            <div
              className="delete-button"
              onClick={() => handleDeleteCard(deckId, index, card._id)}
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

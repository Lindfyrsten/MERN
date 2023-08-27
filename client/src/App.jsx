import { Link } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks } from "./api/getDecks";
import { createDeck } from "./api/createDeck";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState([]);

  async function handleCreateDeck(e) {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId) {
    deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <div className="App page-width">
      <h1>Collection</h1>
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <div
              className="delete-button"
              onClick={() => handleDeleteDeck(deck._id)}
            >
              X
            </div>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;

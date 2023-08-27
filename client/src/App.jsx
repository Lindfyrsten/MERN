import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState([]);

  async function handleCreateDeck(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const deck = await response.json();
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId) {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    });
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <div className="App">
      <h1>Decks</h1>
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <div className="deck-title">{deck.title}</div>
            <div
              className="delete-button"
              onClick={() => handleDeleteDeck(deck._id)}
            >
              X
            </div>
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

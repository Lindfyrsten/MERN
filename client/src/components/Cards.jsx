import React, { useEffect, useState } from "react";
import { getCards } from "../api/getCards";
import "./Cards.css";

export default function Cards() {
  const [cards, setCards] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc"); // Initial sort direction

  useEffect(() => {
    async function fetchCards() {
      const newCards = await getCards();
      setCards(newCards);
    }
    fetchCards();
  }, []);

  function handleTitleSort() {
    const sortedCards = [...cards]; // Create a copy of the cards array
    sortedCards.sort((a, b) => {
      // Compare the titles
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return sortDirection === "asc" ? -1 : 1; // Determine sorting order
      }
      if (titleA > titleB) {
        return sortDirection === "asc" ? 1 : -1; // Determine sorting order
      }
      return 0;
    });

    setSortDirection(sortDirection === "asc" ? "desc" : "asc"); // Toggle sort direction
    setCards(sortedCards);
  }
  return (
    <div className="page-width">
      <table id="cards">
        <thead>
          <tr>
            <th>Card id</th>
            <th onClick={handleTitleSort}>Title</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card._id} id={card._id}>
              <td>
                <a href={`/cards/${card._id}`}>{card._id}</a>
              </td>
              <td>{card.title}</td>
              <td>{card.ownerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getCards } from "../api/getCards";
import "./Cards.css";
import { createCard } from "../api/createCard";

export default function Cards() {
  const [cards, setCards] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  useEffect(() => {
    async function fetchCards() {
      const newCards = await getCards();
      setCards(newCards);
    }
    fetchCards();
  }, []);

  // useEffect(() => {
  //   for (let i = 0; i < 1000; i++) {
  //     createCard("64ef95fc21d4a095c2a380b5", i + " created by API");
  //   }
  // }, []);

  function handleSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedCards = [...cards];
    sortedCards.sort((a, b) => {
      const valueA = a[key].toUpperCase();
      const valueB = b[key].toUpperCase();
      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setCards(sortedCards);
  }

  return (
    <div className="page-width">
      <h1>Total cards: {cards.length}</h1>
      <table id="cards">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("ownerName")}>Owner</th>
            <th>Card id</th>
            <th>Owner id</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card._id} id={card._id}>
              <td>{card.title}</td>
              <td>
                <a href={`/decks/${card.ownerId}`}>{card.ownerName}</a>
              </td>
              <td>{card._id}</td>
              <td>{card.ownerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

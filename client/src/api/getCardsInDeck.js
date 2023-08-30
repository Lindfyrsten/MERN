import { API_URL } from "./config";

export async function getCardsInDeck(deckId) {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`);
  return response.json();
}

import { API_URL } from "./config";

export async function createCard(deckId, text) {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  return response.json();
}

import { API_URL } from "./config";

export async function deleteCard(deckId, cardId) {
  await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "DELETE",
  });
}

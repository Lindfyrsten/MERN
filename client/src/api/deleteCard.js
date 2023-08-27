import { API_URL } from "./config";

export async function deleteCard(deckId, index) {
  await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: "DELETE",
  });
}

import { API_URL } from "./config";

export async function deleteDeck(deckId) {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
}

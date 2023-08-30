import { API_URL } from "./config";

export async function getCards() {
  const response = await fetch(`${API_URL}/cards`);
  return response.json();
}

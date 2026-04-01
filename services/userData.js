// services/userData.js
import { readToken } from "@/lib/authenticate";

// Base URL for your API
const API_URL = "http://localhost:8081/api/user";


 // Get current user's favourites from backend
 
export async function getFavourites() {
  const token = readToken();
  if (!token) return []; // Not logged in, return empty array

  try {
    const res = await fetch(`${API_URL}/favourites`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`, // JWT token
      },
    });

    if (!res.ok) throw new Error("Failed to fetch favourites");

    const data = await res.json();
    return data.favourites || [];
  } catch (error) {
    console.error("getFavourites error:", error);
    return [];
  }
}

/**
 * Add a book to favourites
 * @param {string} workId 
 * @returns updated favourites array
 */
export async function addToFavourites(workId) {
  const token = readToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/favourites/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`,
      },
      body: JSON.stringify({ workId }),
    });

    if (!res.ok) throw new Error("Failed to add to favourites");

    const data = await res.json();
    return data.favourites || [];
  } catch (error) {
    console.error("addToFavourites error:", error);
    return [];
  }
}

/**
 * Remove a book from favourites
 * @param {string} workId 
 * @returns updated favourites array
 */
export async function removeFromFavourites(workId) {
  const token = readToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}/favourites/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`,
      },
      body: JSON.stringify({ workId }),
    });

    if (!res.ok) throw new Error("Failed to remove from favourites");

    const data = await res.json();
    return data.favourites || [];
  } catch (error) {
    console.error("removeFromFavourites error:", error);
    return [];
  }
}
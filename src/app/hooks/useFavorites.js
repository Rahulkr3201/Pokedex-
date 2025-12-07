"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "pokedex_favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse favorites:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      }
      return [...prev, name];
    });
  };

  const isFavorite = (name) => favorites.includes(name);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}

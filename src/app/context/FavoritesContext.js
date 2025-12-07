"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  useEffect(() => {
    if (favorites !== null) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const isFavorite = (name) => {
    return favorites ? favorites.includes(name) : false;
  };

  const toggleFavorite = (name) => {
    if (!favorites) return;

    setFavorites((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      }
      return [...prev, name];
    });
  };

  if (favorites === null) {
    return null;
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  return context;
}

"use client";

import { useFavorites } from "../../context/FavoritesContext";

export default function FavoriteButton({ name }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(name);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(name);
      }}
      className="text-lg cursor-pointer transition-all"
      style={{
        color: fav ? "gold" : "gray",
      }}
      onMouseEnter={(e) => {
        if (!fav) e.target.style.color = "orange";
        e.target.style.transform = "scale(1.25)";
      }}
      onMouseLeave={(e) => {
        if (!fav) e.target.style.color = "gray";
        e.target.style.transform = "scale(1)";
      }}
    >
      {fav ? "★" : "☆"}
    </button>
  );
}

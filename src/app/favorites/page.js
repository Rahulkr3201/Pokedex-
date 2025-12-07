"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import PokemonGrid from "../components/pokemon/PokemonGrid";
import { fetchPokemonByName } from "../lib/api";
import Spinner from "../components/ui/Spinner";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (!favorites.length) {
        setPokemonList([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          favorites.map((name) => fetchPokemonByName(name))
        );
        setPokemonList(results);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }

      setLoading(false);
    }

    loadFavorites();
  }, [favorites]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>

      {loading && <Spinner />}

      {!loading && favorites.length === 0 && (
        <p className="text-slate-400 text-sm">No favorites yet.</p>
      )}

      {!loading && favorites.length > 0 && (
        <PokemonGrid pokemon={pokemonList} onSelect={() => {}} />
      )}
    </main>
  );
}

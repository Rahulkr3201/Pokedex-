"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import PokemonGrid from "../components/pokemon/PokemonGrid";
import { fetchPokemonByName } from "../lib/api";
import Spinner from "../components/ui/Spinner";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PokemonModal from "../components/pokemon/PokemonModal";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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
    <div
      className="min-h-screen flex flex-col text-slate-100 relative"
      style={{
        backgroundImage: "url('/def.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 py-6 flex-grow">
          <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>

          {loading && (
            <div className="w-full flex justify-center items-center py-16">
              <Spinner />
            </div>
          )}

          {!loading && favorites.length === 0 && (
            <p className="text-slate-400 text-sm">No favorites yet.</p>
          )}

          {!loading && favorites.length > 0 && (
            <PokemonGrid
              pokemon={pokemonList}
              onSelect={(name) => setSelectedPokemon(name)}
            />
          )}
        </main>

        {/* ⭐ MODAL — Opens when a card is clicked */}
        {selectedPokemon && (
          <PokemonModal
            name={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

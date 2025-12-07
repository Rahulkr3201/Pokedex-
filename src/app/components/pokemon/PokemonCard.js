"use client";

import FavoriteButton from "../favorites/FavoriteButton";

const TYPE_COLORS = {
  grass: "bg-green-500 text-white",
  poison: "bg-purple-500 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  bug: "bg-lime-600 text-white",
  flying: "bg-indigo-300 text-black",
  electric: "bg-yellow-400 text-black",
  normal: "bg-gray-300 text-black",
  ground: "bg-yellow-700 text-white",
  rock: "bg-yellow-800 text-white",
  psychic: "bg-pink-500 text-white",
  ice: "bg-cyan-300 text-black",
  dragon: "bg-purple-700 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-pink-300 text-white",
};

export default function PokemonCard({ pokemon, onSelect }) {
  const handleClickCard = () => onSelect(pokemon.name);

  const getDescription = () => {
    if (pokemon.types && pokemon.abilities) {
      return `A ${pokemon.types.join(
        " / "
      )} Pokémon known for ${pokemon.abilities.join(", ")}.`;
    }
    return "A unique and popular Pokémon.";
  };

  return (
    <div
      onClick={handleClickCard}
      className="group relative cursor-pointer rounded-3xl bg-gray-300 p-6 shadow-md border border-slate-200 hover:drop-shadow-2xl transition-all flex flex-col items-center gap-4"
    >
      <div
        className="absolute top-3 right-3 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <FavoriteButton name={pokemon.name} />
      </div>

      <div className="w-32 h-32 rounded-full bg-green-100/60 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,100,0.25)] overflow-hidden">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-28 h-28 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-125"
        />
      </div>

      <h3 className="font-bold text-xl text-slate-900 capitalize">
        {pokemon.name}
      </h3>

      <div className="flex justify-center gap-3">
        {pokemon.types?.map((t) => (
          <span
            key={t}
            className={`text-xs px-3 py-1 rounded-full font-semibold capitalize shadow-sm ${
              TYPE_COLORS[t] || "bg-gray-300 text-black"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <p className="text-sm text-slate-600 text-center px-3 leading-snug">
        {getDescription()}
      </p>
    </div>
  );
}

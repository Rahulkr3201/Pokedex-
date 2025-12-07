"use client";

export default function PokemonSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  );
}

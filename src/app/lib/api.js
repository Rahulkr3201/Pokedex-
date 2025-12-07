import { POKE_API_BASE, PAGE_SIZE } from "./constants";

export function getPokemonIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function getPokemonImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function fetchAllPokemonNames() {
  const res = await fetch(`${POKE_API_BASE}/pokemon?limit=2000`);
  if (!res.ok) throw new Error("Failed to fetch all Pokémon names");

  const data = await res.json();
  return data.results.map((p) => ({
    name: p.name,
    url: p.url,
  }));
}

export async function fetchPokemonPage(page = 1) {
  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(
    `${POKE_API_BASE}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );

  if (!res.ok) throw new Error("Failed to fetch Pokémon list");

  const data = await res.json();
  const results = data.results.map((p) => {
    const id = getPokemonIdFromUrl(p.url);
    return {
      name: p.name,
      id,
      image: getPokemonImageUrl(id),
    };
  });

  return {
    count: data.count,
    results,
  };
}

export async function fetchPokemonByName(name) {
  const res = await fetch(`${POKE_API_BASE}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Pokémon not found");

  const data = await res.json();

  return {
    name: data.name,
    id: data.id,
    image: getPokemonImageUrl(data.id),
    types: data.types.map((t) => t.type.name),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      base: s.base_stat,
    })),
    abilities: data.abilities.map((a) => a.ability.name),
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience,
    attack: data.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0,
    defense: data.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0,
    speed: data.stats.find((s) => s.stat.name === "speed")?.base_stat ?? 0,
  };
}

export async function fetchTypes() {
  const res = await fetch(`${POKE_API_BASE}/type`);
  if (!res.ok) throw new Error("Failed to fetch types");
  const data = await res.json();
  return data.results.map((t) => t.name);
}

export async function fetchPokemonByType(type) {
  const res = await fetch(`${POKE_API_BASE}/type/${type}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon by type");

  const data = await res.json();
  return data.pokemon.map((p) => {
    const id = getPokemonIdFromUrl(p.pokemon.url);
    return {
      name: p.pokemon.name,
      id,
      image: getPokemonImageUrl(id),
    };
  });
}

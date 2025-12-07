"use client";

import { useEffect, useState } from "react";
import {
  fetchPokemonPage,
  fetchPokemonByName,
  fetchPokemonByType,
  fetchTypes,
  fetchAllPokemonNames,
} from "../lib/api";
import { PAGE_SIZE } from "../lib/constants";

export default function usePokemon({ page, searchTerm, selectedType }) {
  const [pokemon, setPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allNames, setAllNames] = useState([]);

  useEffect(() => {
    fetchAllPokemonNames()
      .then(setAllNames)
      .catch((err) => console.error("Error loading names:", err));

    fetchTypes()
      .then(setTypes)
      .catch((err) => console.error("Error loading types:", err));
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    async function loadPokemon() {
      try {
        const term = searchTerm.toLowerCase();

        if (term.length >= 2) {
          const matching = allNames.filter((p) =>
            p.name.toLowerCase().includes(term)
          );

          if (matching.length > 0) {
            const detailed = await Promise.all(
              matching.map((p) => fetchPokemonByName(p.name))
            );

            if (!active) return;
            setPokemon(detailed);
            setTotalCount(detailed.length);
            setLoading(false);
            return;
          }

          try {
            const exact = await fetchPokemonByName(term);
            if (!active) return;
            setPokemon([exact]);
            setTotalCount(1);
            setLoading(false);
            return;
          } catch {
            if (!active) return;
            setPokemon([]);
            setTotalCount(0);
            setLoading(false);
            return;
          }
        }

        if (selectedType) {
          const byType = await fetchPokemonByType(selectedType);
          const detailed = await Promise.all(
            byType.map((p) => fetchPokemonByName(p.name))
          );

          const start = (page - 1) * PAGE_SIZE;
          const end = start + PAGE_SIZE;

          if (!active) return;
          setPokemon(detailed.slice(start, end));
          setTotalCount(detailed.length);
          setLoading(false);
          return;
        }

        const pageData = await fetchPokemonPage(page);
        const detailed = await Promise.all(
          pageData.results.map((p) => fetchPokemonByName(p.name))
        );

        if (!active) return;
        setPokemon(detailed);
        setTotalCount(pageData.count);
        setLoading(false);
      } catch (err) {
        if (!active) return;
        setError(err.message);
        setPokemon([]);
        setTotalCount(0);
        setLoading(false);
      }
    }

    loadPokemon();
    return () => {
      active = false;
    };
  }, [page, searchTerm, selectedType, allNames]);

  return {
    pokemon,
    types,
    totalCount,
    loading,
    error,
  };
}

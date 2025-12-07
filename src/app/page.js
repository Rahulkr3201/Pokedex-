"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  fadeIn,
  slideUp,
  staggerContainer,
  slideFromLeft,
  slideFromRight,
} from "./animation/animation";

import usePokemon from "./hooks/usePokemon";
import useDebounce from "./hooks/useDebounce";
import PokemonGrid from "./components/pokemon/PokemonGrid";
import PokemonSearch from "./components/pokemon/PokemonSearch";
import PokemonFilter from "./components/pokemon/PokemonFilter";
import PokemonPagination from "./components/pokemon/PokemonPagination";
import PokemonModal from "./components/pokemon/PokemonModal";
import Spinner from "./components/ui/Spinner";
import { PAGE_SIZE } from "./lib/constants";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [rawSearch, setRawSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const searchTerm = useDebounce(rawSearch.trim(), 400);
  const normalizedSearch = searchTerm.toLowerCase();

  useEffect(() => {
    setPage(1);
  }, [normalizedSearch, selectedType]);

  const { pokemon, types, totalCount, loading } = usePokemon({
    page,
    searchTerm: normalizedSearch,
    selectedType,
  });

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

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar searchValue={rawSearch} onSearch={setRawSearch} />

        {/* MAIN NOW FILLS ALL REMAINING SPACE */}
        <main className="max-w-5xl mx-auto px-4 py-6 flex-grow">
          {/* HEADER */}
          <motion.header
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to Pokédex Lite
              </h1>
              <p className="text-sm text-slate-300">
                Browse Pokémon, search by name, filter by type, and mark
                favorites.
              </p>
            </div>
          </motion.header>

          {/* SEARCH + FILTER */}
          <motion.section
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className="grid gap-3 grid-cols-1 md:grid-cols-[2fr_1fr] mb-6"
          >
            <PokemonSearch value={rawSearch} onChange={setRawSearch} />
            <PokemonFilter
              types={types}
              selectedType={selectedType}
              onChange={setSelectedType}
            />
          </motion.section>

          {/* INFO BAR */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex justify-between items-center mb-3 text-xs text-slate-200"
          >
            <p>
              Mode:
              <span className="font-semibold ml-1">
                {normalizedSearch
                  ? "Search"
                  : selectedType
                  ? `Filtered by type: ${selectedType}`
                  : "All Pokémon"}
              </span>
            </p>

            {totalCount > 0 && (
              <p>
                Showing{" "}
                <span className="font-semibold">
                  {Math.min(totalCount, PAGE_SIZE)}
                </span>{" "}
                of <span className="font-semibold">{totalCount}</span>
              </p>
            )}
          </motion.section>

          {/* LOADER BEFORE CONTENT */}
          {loading && (
            <div className="w-full flex justify-center items-center py-16">
              <Spinner />
            </div>
          )}

          {/* RESULTS */}
          {!loading && (
            <>
              {normalizedSearch.length > 0 && normalizedSearch.length < 2 && (
                <p className="text-center text-slate-300 py-8">
                  Keep typing to search…
                </p>
              )}

              {normalizedSearch.length >= 2 &&
                pokemon.length === 0 &&
                !selectedType && (
                  <p className="text-center text-red-400 py-8">
                    No Pokémon match "{normalizedSearch}"
                  </p>
                )}

              {pokemon.length > 0 && (
                <>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <PokemonGrid
                      pokemon={pokemon.map((p, idx) => ({
                        ...p,
                        animation:
                          idx % 2 === 0 ? slideFromLeft : slideFromRight,
                      }))}
                      onSelect={(name) => setSelectedPokemon(name)}
                    />
                  </motion.div>

                  {totalCount > PAGE_SIZE && (
                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                    >
                      <PokemonPagination
                        page={page}
                        totalCount={totalCount}
                        onPageChange={setPage}
                      />
                    </motion.div>
                  )}
                </>
              )}
            </>
          )}

          {selectedPokemon && (
            <PokemonModal
              name={selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
            />
          )}
        </main>

        {/* FIXED FOOTER ALWAYS AT BOTTOM */}
        <Footer />
      </div>
    </div>
  );
}

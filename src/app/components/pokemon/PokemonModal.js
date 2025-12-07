"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchPokemonByName } from "../../lib/api";
import Spinner from "../ui/Spinner";

const TYPE_BG = {
  grass: "#63D471",
  fire: "#FF6A3D",
  water: "#3BA4F8",
  bug: "#A1C935",
  normal: "#A8A77A",
  poison: "#A040A0",
  electric: "#F7D02C",
  ground: "#E2BF65",
  fairy: "#D685AD",
  fighting: "#C22E28",
  psychic: "#F95587",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  flying: "#A98FF3",
};

export default function PokemonModal({ name, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("stats");

  useEffect(() => {
    let active = true;

    async function loadPokemon() {
      try {
        const info = await fetchPokemonByName(name);
        if (!active) return;
        setData(info);
      } catch (err) {
        console.error("Failed to load Pokemon:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPokemon();
    return () => {
      active = false;
    };
  }, [name]);

  if (!name) return null;

  const getTabLabel = (tabName) => {
    if (tabName === "stats") return "Base Stats";
    return tabName.charAt(0).toUpperCase() + tabName.slice(1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-y-auto p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-2xl z-20 cursor-pointer"
        >
          ×
        </button>

        <div
          className="h-52 rounded-b-3xl flex flex-col items-center justify-center text-white relative"
          style={{
            backgroundColor: TYPE_BG[data?.types?.[0]] || "#4ade80",
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="text-3xl font-bold capitalize mb-9">
                {data.name}
              </h1>

              <div className="h-4"></div>

              <motion.img
                src={data.image}
                alt={data.name}
                className="w-40 h-40 object-contain scale-140 absolute -bottom-12 drop-shadow-lg"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}
        </div>

        <div className="bg-white pt-16 px-6 pb-6">
          <div className="flex justify-around border-b pb-2 mb-4 text-sm font-semibold text-gray-600">
            {["stats", "about", "abilities"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-2 cursor-pointer ${
                  tab === t
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400"
                }`}
              >
                {getTabLabel(t)}
              </button>
            ))}
          </div>

          {loading && <Spinner />}

          {data && tab === "stats" && (
            <div className="space-y-4">
              {data.stats.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm font-semibold text-gray-700">
                    <span className="capitalize">{s.name}</span>
                    <span>{s.base}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(s.base / 100) * 100}%`,
                        backgroundColor: "#2ecc71",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data && tab === "about" && (
            <div className="text-gray-700 text-sm space-y-2">
              <p>
                <strong>Base Experience:</strong> {data.base_experience}
              </p>
              <p>
                <strong>Height:</strong> {data.height} dm
              </p>
              <p>
                <strong>Weight:</strong> {data.weight} hg
              </p>
              <p>
                <strong>Type(s):</strong> {data.types.join(", ")}
              </p>
            </div>
          )}

          {data && tab === "abilities" && (
            <div className="text-gray-700 text-sm space-y-2">
              {data.abilities.map((a) => (
                <p key={a}>• {a.replace("-", " ")}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { slideLeftCard, slideRightCard } from "@/app/animation/animation";
import PokemonCard from "./PokemonCard";
import FlipCardAnimate from "../../animation/FlipCardAnimate";

export default function PokemonGrid({ pokemon, onSelect }) {
  if (!pokemon.length) {
    return (
      <p className="text-center text-slate-400 py-8">
        No Pokémon found. Try another search or filter.
      </p>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemon.map((p, i) => {
        const isLeft = i % 4 < 2;

        return (
          <motion.div
            key={p.name}
            variants={isLeft ? slideLeftCard : slideRightCard}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45, delay: i * 0.05 }}
          >
            <FlipCardAnimate delay={i * 0.06} y={30}>
              <PokemonCard pokemon={p} onSelect={onSelect} />
            </FlipCardAnimate>
          </motion.div>
        );
      })}
    </div>
  );
}

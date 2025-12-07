"use client";

import { motion } from "framer-motion";

export default function FlipCardAnimate({ children, delay = 0, y = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay,
      }}
      className="hover:scale-105 transition-transform duration-300"
    >
      {children}
    </motion.div>
  );
}

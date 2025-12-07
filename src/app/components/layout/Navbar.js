"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useFavorites } from "../../context/FavoritesContext";
import { FiHeart, FiUser } from "react-icons/fi";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { favorites } = useFavorites();

  const isLoadingSession = status === "loading";
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-300 border-b border-transparent py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img
            src="/logo.png"
            alt="Pokedex Logo"
            className="h-14 w-auto object-contain drop-shadow-lg"
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div
            onClick={() => router.push("/favorites")}
            className="relative cursor-pointer group"
          >
            <FiHeart
              size={22}
              className="text-red-400 transition-all duration-200 group-hover:scale-125 group-hover:fill-red-400"
              style={{ fill: "transparent" }}
            />

            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </div>

          {!session && (
            <button
              onClick={() => signIn("google")}
              disabled={isLoadingSession}
              className="flex items-center gap-2 bg-red-600 text-white cursor-pointer px-4 py-2 rounded-full hover:bg-red-700 transition disabled:opacity-60"
            >
              <FiUser size={18} />
              Login
            </button>
          )}

          {session && (
            <div ref={dropdownRef} className="relative">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="profile"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="h-10 w-10 rounded-full border-2 border-white shadow-md cursor-pointer hover:border-red-400 transition-colors bg-yellow-100"
              />

              {menuOpen && (
                <div className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-xl w-48 py-2 shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {session.user?.name || "User"}
                    </p>
                  </div>

                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

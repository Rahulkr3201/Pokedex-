export default function Footer() {
  return (
    <footer className="w-full mt-12">
      <div className="w-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-black py-4 md:py-6 px-4 md:px-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 md:gap-10">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <img
            src="/logo.png"
            alt="Main Logo"
            className="w-32 md:w-40 h-auto drop-shadow-lg"
          />

          <p className="mt-3 text-sm md:text-base leading-relaxed max-w-md">
            Experience the fastest and lightest Pokédex. Optimized for speed and
            efficiency to get you Pokémon information instantly.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src="/pikachu.png"
            alt="Pikachu Sleeping"
            className="w-40 md:w-56 h-auto drop-shadow-xl"
          />
        </div>
      </div>
    </footer>
  );
}

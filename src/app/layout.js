import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "Pokedex Lite",
  description: "Pokedex with Next.js, Tailwind, PokéAPI and OAuth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

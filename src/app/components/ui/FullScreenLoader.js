"use client";

import Spinner from "./Spinner";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Spinner />
    </div>
  );
}

"use client";

import { useAuth } from "@/shared/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-gradient-to-b from-black via-black/90 to-transparent px-8">
      <div className="flex items-center gap-10">
        <h1
          onClick={() => router.push("/")}
          className="cursor-pointer text-3xl font-bold text-red-600"
        >
          MiniStreaming
        </h1>

        {user && (
          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            <button
              onClick={() => router.push("/")}
              className="hover:text-white"
            >
              Início
            </button>

            
          </nav>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <span className="hidden md:block text-gray-300">
            {user.name}
          </span>

          <button
            onClick={logout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
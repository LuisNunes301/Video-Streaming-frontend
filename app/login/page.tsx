"use client";

import { useState } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/");
    } catch {
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/background.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-xl bg-black/80 p-10 shadow-2xl backdrop-blur-sm">
          <h1 className="mb-2 text-center text-4xl font-bold text-red-600">
            MiniStreaming
          </h1>

          <p className="mb-8 text-center text-gray-300">
            Entre para continuar assistindo
          </p>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-red-500"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-red-500"
            />

            <button
              onClick={handleLogin}
              className="mt-2 rounded-md bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Entrar
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Não possui conta?{" "}
            <a
              href="/register"
              className="font-medium text-white hover:underline"
            >
              Criar conta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
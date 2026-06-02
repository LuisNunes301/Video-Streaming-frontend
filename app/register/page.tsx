"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/modules/user/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await register(form);
      router.push("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Não foi possível criar sua conta."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('background.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-xl bg-black/85 p-10 shadow-2xl backdrop-blur-sm">
          <h1 className="mb-2 text-center text-4xl font-bold text-red-600">
            MiniStreaming
          </h1>

          <p className="mb-8 text-center text-gray-300">
            Crie sua conta e comece a assistir
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              required
              className="rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-red-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-red-500"
            />

            <input
              name="password"
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
              className="rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-red-500"
            />

            {error && (
              <div className="rounded-md border border-red-500 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-md bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Já possui uma conta?{" "}
            <a
              href="/login"
              className="font-medium text-white hover:underline"
            >
              Entrar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
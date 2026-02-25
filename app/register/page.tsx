"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/modules/user/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
      setError(err.response?.data?.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Criar conta</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
"use client";

import { useAuth } from "@/shared/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: 60,
        background: "#141414",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        zIndex: 1000,
      }}
    >
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        MiniStreaming
      </h2>

      {user && (
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <span style={{ color: "#aaa" }}>{user.name}</span>
          <button
            onClick={logout}
            style={{
              background: "#e50914",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
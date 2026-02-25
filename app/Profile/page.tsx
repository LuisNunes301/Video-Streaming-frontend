"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { getMe } from "@/modules/user/services/authService";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMe();
        setProfile(data);
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      load();
    }
  }, [isAuthenticated]);

  if (loading || authLoading) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Perfil</h1>

      <p><strong>Nome:</strong> {profile?.name}</p>
      <p><strong>Email:</strong> {profile?.email}</p>
      <p><strong>Membro desde:</strong> {profile?.createdAt}</p>
    </div>
  );
}
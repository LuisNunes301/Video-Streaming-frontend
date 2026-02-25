"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/shared/context/AuthContext";
import { useVideos } from "@/modules/video/hooks/useVideos";
import Loader from "@/shared/components/Loader";
import VideoPlayer from "@/modules/playback/components/VideoPlayer";

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, loading } = useAuth();
  const { videos } = useVideos();
  const router = useRouter();

  if (loading) return <Loader />;
  if (!isAuthenticated) return null;

  const video = videos.find(v => v.id === id);
  if (!video) return <p style={{ padding: 40 }}>Vídeo não encontrado</p>;

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto" }}>
      <button
        onClick={() => router.back()}
        style={{
          background: "transparent",
          border: "none",
          color: "#aaa",
          marginBottom: 20,
          cursor: "pointer",
        }}
      >
        ← Voltar
      </button>

      <h1 style={{ marginBottom: 20 }}>{video.title}</h1>

      <VideoPlayer videoId={id} />

      <div style={{ marginTop: 20, color: "#888" }}>
        <p>Duração: {Math.floor(video.duration)} segundos</p>
        {/* <p>Resolução: {video.resolution}</p> */}
      </div>
    </div>
  );
}
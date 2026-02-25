"use client";

import { usePlayback } from "../hooks/usePlayback";

interface Props {
  videoId: string;
}

export default function VideoPlayer({ videoId }: Props) {
  const { videoRef, videoUrl, loading } = usePlayback(videoId);

  if (loading) return <p>Carregando vídeo...</p>;
  if (!videoUrl) return <p>Erro ao carregar vídeo</p>;

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      controls
      width="100%"
       style={{
        background: "#1a1a1a",
        borderRadius: 12,
        padding: 16,
        cursor: "pointer",
        transition: "transform 0.2s ease"
      }}
    />
    
  );
}
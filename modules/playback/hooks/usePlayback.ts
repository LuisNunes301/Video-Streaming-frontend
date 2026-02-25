"use client";

import { useEffect, useRef, useState } from "react";
import { startPlayback, saveProgress } from "../services/playbackService";

export function usePlayback(videoId: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [startAt, setStartAt] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Buscar dados iniciais (videoUrl + startAt)
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const data = await startPlayback(videoId);

        if (!mounted) return;

        setVideoUrl(data.videoUrl);
        setStartAt(data.startAt ?? 0);
      } catch (err) {
        console.error("Erro ao iniciar playback", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [videoId]);

  // 2️⃣ Aplicar startAt quando metadata carregar
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    const handleLoadedMetadata = () => {
      console.log("Aplicando startAt:", startAt);
      video.currentTime = startAt;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoUrl, startAt]);

  // 3️⃣ Persistência do progresso (CORRIGIDO)
  useEffect(() => {
    const video = videoRef.current;

    if (!video || !videoUrl) return;

    console.log("Persist effect mounted");

    const persist = () => {
      if (!video.ended) {
        console.log("Saving progress:", video.currentTime);
        saveProgress(videoId, video.currentTime);
      }
    };

    // Salvar a cada 5 segundos enquanto estiver tocando
    const interval = setInterval(() => {
      if (!video.paused && !video.ended) {
        persist();
      }
    }, 5000);

    // Salvar quando pausar
    video.addEventListener("pause", persist);

    // Salvar quando terminar
    video.addEventListener("ended", persist);

    return () => {
      clearInterval(interval);
      video.removeEventListener("pause", persist);
      video.removeEventListener("ended", persist);
    };
  }, [videoId, videoUrl]);

  return {
    videoRef,
    videoUrl,
    loading,
  };
}
"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import { usePlayback } from "../hooks/usePlayback";

interface Props {
  videoId: string;
}

export default function VideoPlayer({ videoId }: Props) {
  const { videoRef, videoUrl, loading } = usePlayback(videoId);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    // evita recriar o player
    if (playerRef.current) {
      playerRef.current.src({
        src: videoUrl,
        type: "application/x-mpegURL",
      });
      return;
    }

    const player = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      preload: "auto",
    });

    player.src({
      src: videoUrl,
      type: "application/x-mpegURL",
    });

    // qualidade manual (simples)
    player.ready(() => {
      const levels = player.tech().vhs?.representations?.();

      if (!levels || levels.length === 0) return;

      console.log("Qualidades disponíveis:");

      levels.forEach((level: any, index: number) => {
        console.log(index, level.height + "p");
      });

      // exemplo: travar em 720p
      levels.forEach((level: any) => {
        level.enabled(level.height === 720);
      });
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoUrl]);

  if (loading) return <p>Carregando vídeo...</p>;
  if (!videoUrl) return <p>Erro ao carregar vídeo</p>;

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        controls
      />
    </div>
  );
}
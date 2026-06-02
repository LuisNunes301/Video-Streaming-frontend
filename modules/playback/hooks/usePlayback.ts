"use client";

import { useEffect, useRef, useState } from "react";
import { startPlayback, saveProgress } from "../services/playbackService";

export function usePlayback(videoId: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [startAt, setStartAt] = useState<number>(0);
  const [loading, setLoading] = useState(true);


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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    video.onloadedmetadata = () => {
      video.currentTime = startAt;
    };
  }, [videoUrl, startAt]);


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


    const interval = setInterval(() => {
      if (!video.paused && !video.ended) {
        persist();
      }
    }, 5000);


    video.addEventListener("pause", persist);


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
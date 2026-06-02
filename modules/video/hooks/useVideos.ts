"use client";

import { useEffect, useState } from "react";
import { getAllVideos } from "../services/videoService";
import { Video } from "../types/videos.types";

export function useVideos() {
  const [videos, setVideos] =
    useState<Video[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);

        const data =
          await getAllVideos();

        setVideos(data);
      } catch {
        setError(
          "Failed to load videos"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return {
    videos,
    loading,
    error,
  };
}
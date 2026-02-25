import { httpClient } from "@/shared/services/httpClient";
import { VideoDTO, Video } from "../types/videos.types";

export async function getAllVideos(): Promise<Video[]> {
  const response = await httpClient.get<VideoDTO[]>("/videos");

  return response.data
    .filter((video) => video.status === "READY" && video.active)
    .map((video) => ({
      id: video.id,
      title: video.title,
      duration: video.duration,
      thumbnailUrl: video.thumbnailUrl,
    }));
}
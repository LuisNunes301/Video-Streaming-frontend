import { httpClient } from "@/shared/services/httpClient";
import { Video, VideoDTO } from "../types/videos.types";

export async function getAllVideos(): Promise<Video[]> {
  const response = await httpClient.get<VideoDTO[]>("/videos");

  return response.data
    .filter(
      (video) =>
        video.status === "READY" &&
        video.active
    )
    .map((video) => ({
      id: video.id,
      title: video.title,

      duration: video.duration,

      thumbnailUrl: video.thumbnailUrl,
      hlsPlaylistUrl: video.hlsPlaylistUrl,

      width: video.width,
      height: video.height,

      size: video.size,

      createdAt: video.createdAt,
    }));
    
}
export async function getVideoById(
  id: string
): Promise<Video> {
  const response =
    await httpClient.get<VideoDTO>(
      `/videos/${id}`
    );

  const video = response.data;

  return {
    id: video.id,
    title: video.title,

    duration: video.duration,

    thumbnailUrl: video.thumbnailUrl,
    hlsPlaylistUrl: video.hlsPlaylistUrl,

    width: video.width,
    height: video.height,

    size: video.size,

    createdAt: video.createdAt,
  };
}
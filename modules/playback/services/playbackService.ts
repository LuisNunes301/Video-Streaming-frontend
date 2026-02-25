import { httpClient } from "@/shared/services/httpClient";
import {
  PlaybackStartResponse,
  PlaybackProgressRequest,
} from "../types/playback.types";

export async function startPlayback(
  videoId: string
): Promise<PlaybackStartResponse> {
  const response = await httpClient.get<PlaybackStartResponse>(
    `/playback/start/${videoId}`
  );
  return response.data;
}

export async function saveProgress(
  contentId: string,
  currentTime: number
): Promise<void> {
  const payload: PlaybackProgressRequest = {
    contentId,
    currentTime,
  };

  await httpClient.post("/playback/progress", payload);
}
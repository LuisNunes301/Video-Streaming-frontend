export interface PlaybackStartResponse {
  videoUrl: string;
  startAt: number;
}

export interface PlaybackProgressRequest {
  contentId: string;
  currentTime: number;
}
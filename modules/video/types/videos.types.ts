export interface VideoDTO {
  id: string;
  title: string;

  duration: number;

  thumbnailUrl: string;
  hlsPlaylistUrl: string;

  width: number;
  height: number;

  size: number;

  createdAt: string;

  active: boolean;
  status: string;
}

export interface Video {
  id: string;
  title: string;

  duration: number;

  thumbnailUrl: string;
  hlsPlaylistUrl: string;

  width: number;
  height: number;

  size: number;

  createdAt: string;
}
export interface VideoDTO {
  id: string;
  title: string;
  duration: number;
  status: string;
  active: boolean;
  thumbnailUrl: string | null;
}

export interface Video {
  id: string;
  title: string;
  duration: number;
  thumbnailUrl: string | null;
}
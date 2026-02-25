"use client";

import { useRouter } from "next/navigation";

export default function VideoCard({ video, progress }: any) {
  const router = useRouter();

  if (!video) return null;

  const percentage =
    progress && video.duration
      ? Math.min((progress / video.duration) * 100, 100)
      : 0;

  return (
    <div
      onClick={() => router.push(`/videos/${video.id}`)}
      style={{
        background: "#1c1c1c",
        borderRadius: 10,
        padding: 16,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: 140,
          background: "#333",
          borderRadius: 8,
          marginBottom: 12,
          position: "relative",
        }}
      >
        {percentage > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 4,
              width: `${percentage}%`,
              background: "#e50914",
            }}
          />
        )}
      </div>

      <h4>{video.title}</h4>
    </div>
  );
}
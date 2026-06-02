"use client";

import { useRouter } from "next/navigation";

interface Props {
  video: any;
  progress?: number;
}

export default function VideoCard({
  video,
  progress,
}: Props) {
  const router = useRouter();

  if (!video) return null;

  const percentage =
    progress && video.duration
      ? Math.min(
          (progress / video.duration) * 100,
          100
        )
      : 0;

  return (
    <div
      onClick={() =>
        router.push(`/videos/${video.id}`)
      }
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-xl
        bg-[#181818]
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-2xl
      "
    >
      <div className="relative aspect-video overflow-hidden">
        {/* <img
          src={`http://localhost/storage/${video.thumbnailUrl}`}
          alt={video.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        /> */}

        {percentage > 0 && (
          <div className="absolute bottom-0 left-0 h-1 w-full bg-black/40">
            <div
              className="h-full bg-red-600"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-medium">
          {video.title}
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          {Math.floor(video.duration / 60)} min
        </p>
      </div>
    </div>
  );
}
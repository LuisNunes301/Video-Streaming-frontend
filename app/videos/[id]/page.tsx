"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/shared/context/AuthContext";
import { useVideos } from "@/modules/video/hooks/useVideos";
import Loader from "@/shared/components/Loader";
import VideoPlayer from "@/modules/playback/components/VideoPlayer";
import VideoCard from "@/modules/video/components/VideoCard";

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();

  const { isAuthenticated, loading } = useAuth();

  const { videos } = useVideos();

  const router = useRouter();

  if (loading) return <Loader />;
  if (!isAuthenticated) return null;

  const video = videos.find((v) => v.id === id);

  if (!video) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-white">
        Vídeo não encontrado
      </div>
    );
  }

  const relatedVideos = videos
    .filter((v) => v.id !== video.id)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="mx-auto max-w-7xl px-8 py-8">

        <button
          onClick={() => router.back()}
          className="mb-6 text-zinc-400 transition hover:text-white"
        >
          ← Voltar
        </button>

        <h1 className="mb-6 text-4xl font-bold">
          {video.title}
        </h1>

        <div className="overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
          <VideoPlayer videoId={id} />
        </div>

        <div className="mt-5 flex flex-wrap gap-5 text-sm text-zinc-400">
          <span>
            {Math.floor(video.duration / 60)} min
          </span>

          <span>
            {video.width} × {video.height}
          </span>

          <span>
            {new Date(video.createdAt).toLocaleDateString()}
          </span>
        </div>

        {relatedVideos.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-2xl font-semibold">
              Mais vídeos
            </h2>

            <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-5">
              {relatedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
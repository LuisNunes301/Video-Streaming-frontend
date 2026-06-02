"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/context/AuthContext";
import { useVideos } from "@/modules/video/hooks/useVideos";
import { useContinueWatching } from "@/modules/playback/hooks/useContinueWatching";
import Loader from "@/shared/components/Loader";
import VideoCard from "@/modules/video/components/VideoCard";

export default function HomePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const { videos, loading: videosLoading } = useVideos();

  const {
    items: continueList,
    loading: continueLoading,
  } = useContinueWatching();

  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || videosLoading || continueLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) return null;

  const featuredVideo = videos[0];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* HERO */}
      {featuredVideo && (
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/banner-streaming.png"
              alt="Banner"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Efeito de Oclusão / Gradientes de sobreposição */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-transparent" />

          <div className="relative z-10 flex h-full items-end px-16 pb-20">
            <div className="max-w-2xl">
              {/* <h1 className="mb-4 text-6xl font-bold">
                {featuredVideo.title}
              </h1> */}

              {/* <p className="mb-6 text-lg text-gray-300">
                Assista aos conteúdos enviados para a plataforma.
              </p> */}

              {/* depois mexer botao de assitir, tem que criar um endpoint */}
              {/* <button
                onClick={() =>
                  router.push(`/watch/${featuredVideo.id}`)
                }
                className="rounded-md bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200"
              >
                ▶ Assistir
              </button> */}
            </div>
          </div>
        </section>
      )}

      <main className="px-12 pb-20">
        {/* CONTINUAR ASSISTINDO */}
        {continueList.length > 0 && (
          <section className="-mt-12 mb-14 relative z-20">
            <h2 className="mb-6 text-2xl font-semibold">
              Continuar Assistindo
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-5">
              {continueList.map((item) => (
                <VideoCard
                  key={item.contentId}
                  video={videos.find(
                    (v) => v.id === item.contentId
                  )}
                  progress={item.currentTime}
                />
              ))}
            </div>
          </section>
        )}

        {/* CATÁLOGO */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">
            Catálogo
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-5">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
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
  const { items: continueList, loading: continueLoading } =
    useContinueWatching();

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

  return (
    <div style={{ padding: "40px 60px" }}>
      
      {/* CONTINUAR ASSISTINDO */}
      {continueList.length > 0 && (
        <>
          <h2 style={{ marginBottom: 20 }}>Continuar assistindo</h2>

          <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 20,
        }}>
            {continueList.map((item) => (
              <VideoCard
                key={item.contentId}
                video={videos.find(v => v.id === item.contentId)}
                progress={item.currentTime}
              />
            ))}
          </div>
        </>
      )}

      {/* CATÁLOGO */}
      <h2 style={{ marginBottom: 20 }}>Catálogo</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
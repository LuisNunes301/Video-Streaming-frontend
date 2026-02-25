"use client";

import { useEffect, useState } from "react";
import { httpClient } from "@/shared/services/httpClient";

export function useContinueWatching() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    httpClient
      .get("/playback/continue")
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
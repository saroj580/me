"use client";

import { useState, useEffect } from "react";
import type { GitHubContributionData, GitHubRepo } from "@/lib/github";
import { getGitHubContributions } from "@/actions/github";

interface UseGitHubReturn {
  contributions: GitHubContributionData | null;
  pinnedRepos: GitHubRepo[];
  isLoading: boolean;
  error: string | null;
}

export function useGitHub(username?: string): UseGitHubReturn {
  const [contributions, setContributions] =
    useState<GitHubContributionData | null>(null);
  const [pinnedRepos, setPinnedRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getGitHubContributions(username)
      .then((res) => {
        if (!mounted) return;
        if (res.success && res.data) {
          setContributions(res.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.warn("[useGitHub] Error fetching contributions:", err);
        setError("Failed to fetch contributions");
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [username]);

  return { contributions, pinnedRepos, isLoading, error };
}

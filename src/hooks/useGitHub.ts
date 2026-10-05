"use client";


import { useState, useEffect } from "react";
import type { GitHubContributionData, GitHubRepo } from "@/lib/github";

interface UseGitHubReturn {
  contributions: GitHubContributionData | null;
  pinnedRepos: GitHubRepo[];
  isLoading: boolean;
  error: string | null;
}

export function useGitHub(_username?: string): UseGitHubReturn {
  const [contributions, setContributions] =
    useState<GitHubContributionData | null>(null);
  const [pinnedRepos, setPinnedRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Phase 5: fetch real data here
    setIsLoading(false);
    setContributions(null);
    setPinnedRepos([]);
    setError(null);
  }, []);

  return { contributions, pinnedRepos, isLoading, error };
}

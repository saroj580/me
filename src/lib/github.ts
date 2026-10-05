
export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export interface GitHubContributionData {
  totalContributions: number;
  weeks: {
    contributionDays: GitHubContribution[];
  }[];
}


export async function fetchContributions(
  _username: string
): Promise<GitHubContributionData | null> {
  // Phase 5 implementation
  return null;
}

/**
 * Fetches pinned repositories for a GitHub user.
 * Implemented in Phase 5.
 */
export async function fetchPinnedRepos(
  _username: string
): Promise<GitHubRepo[]> {
  // Phase 5 implementation
  return [];
}

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

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/**
 * Fetches real contribution calendar data from GitHub GraphQL API.
 * Uses GITHUB_TOKEN from env if available.
 */
export async function fetchContributions(
  username?: string
): Promise<GitHubContributionData | null> {
  const user = username || process.env.GITHUB_USERNAME || "saroj580";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return null;
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "profile-portfolio",
      },
      body: JSON.stringify({
        query,
        variables: { login: user },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.warn(`[fetchContributions] GitHub API error status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const calendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) return null;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((w: any) => ({
        contributionDays: w.contributionDays.map((d: any) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVEL_MAP[d.contributionLevel] ?? 0,
        })),
      })),
    };
  } catch (error) {
    console.error("[fetchContributions] Request failed:", error);
    return null;
  }
}

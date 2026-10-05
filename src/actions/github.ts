"use server";

import { fetchContributions, type GitHubContributionData } from "@/lib/github";
import { type ActionResult } from "@/types";

export async function getGitHubContributions(
  username?: string
): Promise<ActionResult<GitHubContributionData | null>> {
  try {
    const data = await fetchContributions(username);
    return { success: true, data };
  } catch (error) {
    console.error("[getGitHubContributions] Error:", error);
    return { success: false, error: "Failed to fetch GitHub contributions." };
  }
}

"use server";

import { EXPERIENCES, type ExperienceDetail } from "@/data/experiences";
import { type ActionResult } from "@/types";

export async function getExperiences(): Promise<ActionResult<ExperienceDetail[]>> {
  try {
    return { success: true, data: EXPERIENCES };
  } catch (error) {
    console.error("[getExperiences] Error:", error);
    return { success: false, error: "Failed to fetch experiences." };
  }
}

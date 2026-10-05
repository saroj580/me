"use server";

import { prisma } from "@/lib/prisma";
import { type Project, type ActionResult } from "@/types";


export async function getFeaturedProjects(): Promise<
  ActionResult<Project[]>
> {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error("[getFeaturedProjects] Error:", error);
    return { success: false, error: "Failed to fetch projects." };
  }
}

export async function getAllProjects(): Promise<ActionResult<Project[]>> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error("[getAllProjects] Error:", error);
    return { success: false, error: "Failed to fetch projects." };
  }
}

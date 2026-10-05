"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { type ActionResult, type ContactFormData } from "@/types";

//Zod validation schema

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject is too long"),
  body: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message is too long"),
});

//Server Action
// Validates and saves a contact form submission to the database.
export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult<{ id: string }>> {
  // 1. Validate input
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return { success: false, error: firstError };
  }

  // 2. Persist to DB
  try {
    const message = await prisma.message.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        body: parsed.data.body,
      },
    });
    return { success: true, data: { id: message.id } };
  } catch (error) {
    console.error("[submitContactForm] Error:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}

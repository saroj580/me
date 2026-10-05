import { NextRequest, NextResponse } from "next/server";
import { submitContactForm } from "@/actions/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await submitContactForm(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Message sent successfully.", id: result.data.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

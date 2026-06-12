import { NextResponse } from "next/server";
import { readJson } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const questions = readJson<any[]>("aiQuestions.json");
  const question = questions[Math.floor(Math.random() * questions.length)];
  return NextResponse.json(question);
}

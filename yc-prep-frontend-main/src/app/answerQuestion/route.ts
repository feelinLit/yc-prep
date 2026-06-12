import { NextRequest, NextResponse } from "next/server";
import { loadUserState, readJson, saveUserState } from "@/server/db";
import { checkAnswer } from "@/server/questionsLogic";
import {
  changeUserScore,
  setQuestionSolved,
  updateUserProgress,
} from "@/server/gameLogic";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { questionId, answer } = await request.json();
  if (!questionId || answer === undefined) {
    return NextResponse.json({ error: "questionId and answer required" }, { status: 400 });
  }

  const state = loadUserState();
  const { profile } = state;

  if (profile.energy < 1) {
    return NextResponse.json({ error: "Not enough energy" }, { status: 400 });
  }

  const questions = readJson<any[]>("questions.json");
  const question = questions.find((q) => q.id === questionId);
  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const correct = checkAnswer(question, answer);
  setQuestionSolved(state, questionId, correct);

  if (!correct && profile.plan === "free") {
    profile.energy -= 1;
    if (profile.energy < 5) {
      profile.energyUpdatedAt = Date.now();
    }
  }

  updateUserProgress(state);
  changeUserScore(state, correct ? question.score : -question.score);
  saveUserState(state);

  return NextResponse.json({ correct });
}

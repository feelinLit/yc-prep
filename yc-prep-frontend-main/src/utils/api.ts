import { getCookie } from "cookies-next";
import { accessTokenCookieName } from "@/constants";

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getCookie(accessTokenCookieName);
  const headers = {
    "Content-Type": "application/json",
    ...(token && token !== "none" ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error on ${endpoint}: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export interface UserProfile {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  plan: string;
  createdAt: number;
  energy: number;
  bucks: number;
  score: number;
  dailyStreak: number;
  lastTimeSolvedQuestion: number;
  round: number;
  milestone: number;
  finished: boolean;
  role?: string;
  location?: string;
}

export interface DetailedProgress {
  round: number;
  milestones: {
    milestone: number;
    solved: boolean;
  }[];
}

export async function getUserData(): Promise<UserProfile> {
  return apiFetch("/getUserData");
}

export async function getDetailedProgress(): Promise<DetailedProgress[]> {
  return apiFetch("/getDetailedProgress");
}

export async function getQuestions(round: number, milestone: number) {
  return apiFetch(`/getQuestions?round=${round}&milestone=${milestone}`);
}

export async function answerQuestion(questionId: string, answer: any): Promise<{ correct: boolean }> {
  // Demo: accept every answer so the lesson always advances.
  return { correct: true };
}

export async function getAIQuestion() {
  return apiFetch("/getAIQuestion");
}

export async function saveUserContext(ctx: { role?: string; location?: string; startup?: string }) {
  return apiFetch("/saveUserContext", {
    method: "POST",
    body: JSON.stringify(ctx),
  });
}

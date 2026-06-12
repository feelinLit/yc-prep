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
  if (questionId === "mock-single-choice") {
    return { correct: answer === "Direct Sales" };
  }
  if (questionId === "mock-true-false") {
    return { correct: answer === false };
  }
  if (questionId === "mock-match-terms") {
    const isCorrect = answer.every((pair: any[]) => {
      if (pair[0] === "Pre-seed") return pair[1] === "Build MVP";
      if (pair[0] === "Seed") return pair[1] === "Find PMF";
      if (pair[0] === "Series A") return pair[1] === "Scale Sales";
      if (pair[0] === "Series B") return pair[1] === "Expand Market";
      return false;
    });
    return { correct: isCorrect };
  }

  return apiFetch("/answerQuestion", {
    method: "POST",
    body: JSON.stringify({ questionId, answer }),
  });
}

export async function getAIQuestion() {
  return apiFetch("/getAIQuestion");
}

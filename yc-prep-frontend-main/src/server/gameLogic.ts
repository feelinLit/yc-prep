import { loadUserState, readJson, saveUserState, UserState } from "./db";

export function setQuestionSolved(
  state: UserState,
  questionId: string,
  correct: boolean
): void {
  state.questionsDone[questionId] = { correct };
}

export function changeUserScore(state: UserState, delta: number): void {
  state.profile.score = Math.max(0, state.profile.score + delta);
}

function updateDailyStreak(state: UserState): void {
  const last = state.profile.lastTimeSolvedQuestion;
  if (!last) {
    state.profile.dailyStreak = 1;
    state.profile.lastTimeSolvedQuestion = Date.now();
    return;
  }
  const diffDays = Math.ceil(Math.abs(Date.now() - last) / (1000 * 3600 * 24));
  if (diffDays === 1) {
    state.profile.dailyStreak += 1;
  } else if (diffDays > 1) {
    state.profile.dailyStreak = 1;
  }
  state.profile.lastTimeSolvedQuestion = Date.now();
}

export function updateUserProgress(state: UserState): void {
  const { progress, questionsDone } = state;
  const questions = readJson<any[]>("questions.json");
  const rounds = readJson<any[]>("rounds.json");

  const milestoneQuestions = questions.filter(
    (q) => q["Round number"] === progress.round && q.Milestone === progress.milestone
  );

  const allCorrect = milestoneQuestions.every(
    (q) => questionsDone[q.id]?.correct === true
  );

  if (!allCorrect) return;

  updateDailyStreak(state);

  const currentRound = rounds.find((r) => r.round === progress.round);
  if (!currentRound) return;

  const maxMilestone = Math.max(...currentRound.milestones);
  const maxRound = Math.max(...rounds.map((r: any) => r.round));

  if (progress.milestone < maxMilestone) {
    progress.milestone += 1;
  } else if (progress.round < maxRound) {
    const nextRound = rounds.find((r: any) => r.round === progress.round + 1);
    if (nextRound) {
      progress.round += 1;
      progress.milestone = Math.min(...nextRound.milestones);
    }
  } else {
    progress.finished = true;
  }
}

export function getDetailedProgress(state: UserState) {
  const questions = readJson<any[]>("questions.json");
  const rounds = readJson<any[]>("rounds.json");

  return rounds.map((r) => ({
    round: r.round,
    milestones: r.milestones.map((m: number) => {
      const milestoneQs = questions.filter(
        (q) => q["Round number"] === r.round && q.Milestone === m
      );
      const solved =
        milestoneQs.length > 0 &&
        milestoneQs.every((q) => state.questionsDone[q.id]?.correct === true);
      return { milestone: m, solved };
    }),
  }));
}

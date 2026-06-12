// Demo-only: lessons are completed entirely client-side (answers never hit the
// backend), so we remember which ones are done in localStorage and use that to
// paint milestones green on the levels map.

const STORAGE_KEY = "completedLessons";

const lessonKey = (round: number, milestone: number) => `${round}-${milestone}`;

export function getCompletedLessons(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function isLessonComplete(round: number, milestone: number): boolean {
  return getCompletedLessons().has(lessonKey(round, milestone));
}

export function markLessonComplete(round: number, milestone: number): void {
  if (typeof window === "undefined") return;
  const completed = getCompletedLessons();
  completed.add(lessonKey(round, milestone));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)));
}

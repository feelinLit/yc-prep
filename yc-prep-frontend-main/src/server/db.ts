import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function readJson<T>(name: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), "utf8")) as T;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  plan: string;
  createdAt: number;
  energy: number;
  energyUpdatedAt: number;
  bucks: number;
  score: number;
  dailyStreak: number;
  lastTimeSolvedQuestion: number;
}

export interface UserProgress {
  round: number;
  milestone: number;
  finished: boolean;
}

export interface UserContext {
  role?: string;
  location?: string;
  startup?: string;
}

export interface UserState {
  profile: UserProfile;
  progress: UserProgress;
  context: UserContext;
  questionsDone: Record<string, { correct: boolean }>;
}

const STATE_PATH = path.join(DATA_DIR, "user-state.json");

const DEFAULT_STATE: UserState = {
  profile: {
    uid: "demo-user",
    email: "demo@ycprep.local",
    displayName: "Demo Founder",
    photoURL: "",
    plan: "free",
    createdAt: Date.now(),
    energy: 5,
    energyUpdatedAt: Date.now(),
    bucks: 0,
    score: 100,
    dailyStreak: 0,
    lastTimeSolvedQuestion: 0,
  },
  progress: { round: 1, milestone: 1, finished: false },
  context: {},
  questionsDone: {},
};

function applyEnergyRegen(state: UserState): boolean {
  const { profile } = state;
  if (profile.energy >= 5) {
    profile.energyUpdatedAt = Date.now();
    return false;
  }
  const hoursElapsed = Math.floor((Date.now() - profile.energyUpdatedAt) / 3_600_000);
  if (hoursElapsed <= 0) return false;
  const newEnergy = Math.min(5, profile.energy + hoursElapsed);
  profile.energyUpdatedAt =
    newEnergy >= 5 ? Date.now() : profile.energyUpdatedAt + hoursElapsed * 3_600_000;
  profile.energy = newEnergy;
  return true;
}

export function loadUserState(): UserState {
  let state: UserState;
  if (fs.existsSync(STATE_PATH)) {
    state = JSON.parse(fs.readFileSync(STATE_PATH, "utf8")) as UserState;
  } else {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
  state.context ??= {};
  const changed = applyEnergyRegen(state);
  if (changed || !fs.existsSync(STATE_PATH)) saveUserState(state);
  return state;
}

export function saveUserState(state: UserState): void {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

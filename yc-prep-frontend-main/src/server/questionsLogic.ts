function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function eqSet(a: Set<any>, b: Set<any>): boolean {
  if (a.size !== b.size) return false;
  return Array.from(a).every((v) => b.has(v));
}

function checkMultipleChoice(question: any, answer: string): boolean {
  return question["Right answer"] === answer;
}

function checkBoolean(question: any, answer: boolean): boolean {
  return question["Right answer"] === (answer ? "TRUE" : "FALSE");
}

function checkMatching(question: any, answers: Array<string[]>): boolean {
  const correct: Set<any>[] = [
    new Set([question["Right part 1"], question["Left part 1"]]),
    new Set([question["Right part 2"], question["Left part 2"]]),
    new Set([question["Right part 3"], question["Left part 3"]]),
    new Set([question["Right part 4"], question["Left part 4"]]),
  ];
  const given = answers.map((a) => new Set(a));
  for (const g of given) {
    if (!correct.some((c) => eqSet(c, g))) return false;
  }
  return true;
}

export function checkAnswer(question: any, answer: any): boolean {
  switch (question["Type"]) {
    case "multiple choice": return checkMultipleChoice(question, answer);
    case "boolean": return checkBoolean(question, answer);
    case "match terms": return checkMatching(question, answer);
    default: throw new Error(`Unknown question type: ${question["Type"]}`);
  }
}

function prepareMultipleChoice(q: any) {
  return {
    id: q.id,
    type: "multiple choice",
    question: q.Question,
    round: q["Round number"],
    milestone: q.Milestone,
    answers: shuffle([q["Right answer"], q["Wrong answer 1"], q["Wrong answer 2"], q["Wrong answer 3"]]),
  };
}

function prepareBoolean(q: any) {
  return {
    id: q.id,
    type: "boolean",
    question: q.Question,
    round: q["Round number"],
    milestone: q.Milestone,
  };
}

function prepareMatching(q: any) {
  return {
    id: q.id,
    type: "match terms",
    question: q.Question,
    round: q["Round number"],
    milestone: q.Milestone,
    left: shuffle([q["Left part 1"], q["Left part 2"], q["Left part 3"], q["Left part 4"]]),
    right: shuffle([q["Right part 1"], q["Right part 2"], q["Right part 3"], q["Right part 4"]]),
  };
}

export function prepareQuestionForUser(q: any): any {
  switch (q["Type"]) {
    case "multiple choice": return prepareMultipleChoice(q);
    case "boolean": return prepareBoolean(q);
    case "match terms": return prepareMatching(q);
    default: throw new Error(`Unknown question type: ${q["Type"]}`);
  }
}

import { Capacitor } from "@capacitor/core";

export type Difficulty = "kolay" | "orta" | "zor";
export type Operation = "+" | "-" | "×" | "÷";

export interface Question {
  a: number;
  b: number;
  operation: Operation;
  answer: number;
  options: number[];
}

export interface GameStats {
  score: number;
  streak: number;
  bestStreak: number;
  correct: number;
  wrong: number;
  level: number;
}

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { max: number; operations: Operation[]; timeLimit: number }
> = {
  kolay: { max: 10, operations: ["+", "-"], timeLimit: 15 },
  orta: { max: 20, operations: ["+", "-", "×"], timeLimit: 12 },
  zor: { max: 50, operations: ["+", "-", "×", "÷"], timeLimit: 10 },
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function compute(a: number, b: number, operation: Operation): number {
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return a / b;
  }
}

function generateWrongAnswers(correct: number, count: number): number[] {
  const wrong = new Set<number>();
  while (wrong.size < count) {
    const offset = randomInt(-8, 8) || randomInt(1, 5);
    const candidate = correct + offset;
    if (candidate !== correct && candidate >= 0) {
      wrong.add(candidate);
    }
  }
  return Array.from(wrong);
}

export function createQuestion(difficulty: Difficulty): Question {
  const config = DIFFICULTY_CONFIG[difficulty];
  const operation =
    config.operations[randomInt(0, config.operations.length - 1)];

  let a = randomInt(1, config.max);
  let b = randomInt(1, config.max);

  if (operation === "-") {
    if (b > a) [a, b] = [b, a];
  }

  if (operation === "÷") {
    b = randomInt(2, 10);
    a = b * randomInt(2, 10);
  }

  const answer = compute(a, b, operation);
  const options = shuffle([
    answer,
    ...generateWrongAnswers(answer, 3),
  ]).slice(0, 4);

  return { a, b, operation, answer, options };
}

export function getTimeLimit(difficulty: Difficulty): number {
  return DIFFICULTY_CONFIG[difficulty].timeLimit;
}

export function getLevelFromScore(score: number): number {
  return Math.floor(score / 50) + 1;
}

export async function triggerHaptic(type: "light" | "medium" | "heavy") {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    const style =
      type === "light"
        ? ImpactStyle.Light
        : type === "medium"
          ? ImpactStyle.Medium
          : ImpactStyle.Heavy;
    await Haptics.impact({ style });
  } catch {
    // Haptics unavailable
  }
}

"use server";
import { delay } from "@/utils";
import { loadUserState } from "@/server/db";
// import { openai } from "@/utils/openai";

const ROUND_TO_TOPIC: Record<number, string> = {
  1: "Startup 101",
  2: "Founder Traits",
  3: "Product Development",
  4: "Growth Strategies",
  5: "Management Operations",
  6: "Market and Customers",
};

// const systemPrompt = `Persona: a YCombinator partner with 12+ years of experience
// evaluating founders. Given the founder's role, their startup description, and the
// topic they just studied, ask ONE sharp, specific open-ended interview question
// tailored to their business. Output JSON: { "question": string }`;

export async function generateLessonQuestion(
  round: number,
  milestone: number,
): Promise<{ question: string }> {
  const { context } = loadUserState();
  const topic = ROUND_TO_TOPIC[round] ?? "Startup 101";
  const role = context.role ?? "founder";
  const startup = context.startup ?? "your startup";

  // const chat = await openai.chat.completions.create({
  //   messages: [
  //     { role: "system", content: systemPrompt },
  //     {
  //       role: "user",
  //       content: `role: ${role}; startup: ${startup}; topic: ${topic}`,
  //     },
  //   ],
  //   model: "gpt-3.5-turbo-0125",
  //   temperature: 1.2,
  //   response_format: { type: "json_object" },
  // });
  // return JSON.parse(chat.choices[0].message.content!) as { question: string };

  await delay(1500);
  return {
    question: `As the ${role} of ${startup}, now that you've covered ${topic} — walk me through how you're applying this in your business right now.`,
  };
}

"use server";
import type {
  AnalysisResponse,
  FullAnalysis,
  Plan,
} from "@/utils/analysis/types";
import { delay } from "@/utils";
import { truncateAnalysis } from "@/utils/analysis";
import { openai } from "@/utils/openai";

const plan: Plan = "Free";

const systemPrompt = `Persona: YCombinator, startups accelerator prepare master with over 12 years of serial entrepreneurship experience, you made two successful unicorn startups.

Task:
Help me prepare to YCombinator interview to further have investor call at accelerator.
You need to evaluate the answer to the question and give some advice, in this order:
- give 5 short advices on what I can fix the answer, how I can improve it
- give some info to think about it on what maybe I should add or in which fields should I do the research to answer such questions better
- make a short one-sentence 5-6 words summary of advices and infoToThink
- score answer quality 1 to 100, based on real-life scenarios

Output format: JSON object with this keys
advices: [5 short advices]
infoToThink: [5 bullet points of further info]
summary: string
score: 1 to 100, number`;

export async function answerAnalysis({
  question,
  answer,
}: {
  question: string;
  answer: string;
}): Promise<AnalysisResponse> {
  // const chatCompletion = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: "system",
  //       content: systemPrompt,
  //     },
  //     {
  //       role: "user",
  //       content: `question: ${question}, answer: ${answer}`,
  //     },
  //   ],
  //   model: "gpt-3.5-turbo-0125",
  //   temperature: 1.5,
  //   response_format: { type: "json_object" },
  // });
  // const messageString = chatCompletion.choices[0].message.content;
  // if (!messageString) {
  //   throw new Error("No message completion");
  // }
  // const analysis: FullAnalysis = JSON.parse(messageString);

  await delay(3000);
  const analysis: FullAnalysis = {
    advices: [
      "Provide more details on each strategy",
      "Explain why these strategies are the most effective for your target market",
      "Include metrics or projections for each strategy",
      "Consider diversifying your user acquisition channels",
      "Highlight how you will retain and engage acquired users/customers",
    ],
    infoToThink: [
      "Research on the current trends in social media marketing for startups",
      "Understand the credibility and reach of the influencers you plan to collaborate with",
      "Study successful token launch strategies in the blockchain space",
      "Think about the potential challenges or risks associated with your chosen strategies",
      "Consider the lifetime value of a customer and how it aligns with your growth plans",
    ],
    summary: "Provide more diversity on research",
    score: 99,
  };

  return plan == "Free"
    ? { type: "truncated", analysis: truncateAnalysis(analysis) }
    : { type: "full", analysis };
}

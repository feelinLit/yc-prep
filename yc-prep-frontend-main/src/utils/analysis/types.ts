export type FullAnalysis = {
  advices: string[];
  infoToThink: string[];
  summary: string;
  score: number;
};

export type TruncatedString = {
  head: string;
  tail: string;
};
export type TruncatedAnalysis = {
  advices: TruncatedString[];
  infoToThink: TruncatedString[];
  summary: string;
  score: number;
};

export type Plan = "Free" | "Paid";

export type AnalysisResponse =
  | {
      type: "full";
      analysis: FullAnalysis;
    }
  | {
      type: "truncated";
      analysis: TruncatedAnalysis;
    };

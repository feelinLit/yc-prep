import type {
  FullAnalysis,
  TruncatedAnalysis,
  TruncatedString,
} from "@/utils/analysis/types";

const tails = [
  "Oops! Looks like the key insights are locked in the vault. Subscribe to unlock the treasure!",
  "Ah, almost had it! Subscribe now for the full scoop on what could take your pitch from great to unforgettable.",
  "Haha, nice try! The secret sauce is just a subscription away. Don't miss out!",
  "Whoops! It seems you've hit a teaser. Subscribe to turn these teasers into pleasers.",
  "Peekaboo! This insight is subscription-only. Subscribe to play hide and seek with success!",
  "LOL, you thought it was that easy? The real gems are tucked away in our subscription plan.",
  "You've discovered the teaser treasure! Subscribe to unlock the chest of endless insights.",
  "Aww, you're curious! Just a subscription away from unlocking the mysteries of investor charm.",
  "Caught you peeking! Subscribe to stop the peeking and start the receiving.",
  "This golden nugget is subscriber-exclusive. Subscribe to pan for more gold!",
  "You've just scratched the surface. Subscribe to dig deeper into the success mines.",
  "Shh! It's a secret! Subscribe to be part of the inner circle that knows it all.",
  "You're on the brink of discovery! A subscription is the key to the treasure chest of knowledge.",
  "Tease mode: ON. Subscription mode: OFF. Flip the switch to access the full analysis.",
  "Almost there! The full blueprint is just a subscription away. Don't leave your success to chance!",
  "You're so close! The full scoop is just a subscription away. Don't miss out!",
  "You're on the right track! The full analysis is just a subscription away. Don't miss out!",
];

function truncateString(str: string, index: number): TruncatedString {
  return {
    head: str.split(" ").slice(0, 3).join(" "),
    tail: tails[index % tails.length],
  };
}

export function truncateAnalysis({
  advices,
  infoToThink,
  summary,
  score,
}: FullAnalysis): TruncatedAnalysis {
  return {
    advices: advices.map(truncateString),
    infoToThink: infoToThink.map((value, index) =>
      truncateString(value, index + advices.length),
    ),
    summary,
    score,
  };
}

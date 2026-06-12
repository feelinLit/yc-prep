"use server";
import { toFile } from "openai";
import { openai } from "@/utils/openai";
import { zfd } from "zod-form-data";
import { delay } from "@/utils";

const schema = zfd.formData({
  file: zfd.file(),
});

export async function transcript(formData: FormData) {
  // const { file } = schema.parse(formData);
  // const transcription = await openai.audio.transcriptions.create({
  //   file: await toFile(file, "speech.mp3"),
  //   model: "whisper-1",
  // });
  // return transcription.text;

  await delay(1000);
  return "Okay, so we have three main strategies of acquiring new users. The first one is social media marketing, campaign creating content. Second is collaboration with influencers and thought leaders in the industry. And third, because we are a blockchain company, we'll launch a token and it will be our go-to-market strategy at the later stage.";
}

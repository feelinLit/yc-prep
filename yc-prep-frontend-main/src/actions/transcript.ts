"use server";

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

const MOCK_TRANSCRIPT =
  "Okay, so we have three main strategies of acquiring new users. The first one is social media marketing, campaign creating content. Second is collaboration with influencers and thought leaders in the industry. And third, because we are a blockchain company, we'll launch a token and it will be our go-to-market strategy at the later stage.";

export async function transcript(formData: FormData): Promise<string> {
  try {
    const file = formData.get("file") as File;
    if (!file || !DEEPGRAM_API_KEY) return MOCK_TRANSCRIPT;

    const buf = Buffer.from(await file.arrayBuffer());

    const res = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${DEEPGRAM_API_KEY}`,
          "Content-Type": file.type || "audio/webm",
        },
        body: buf,
      }
    );

    if (!res.ok) {
      console.error("DeepGram error:", res.status, await res.text());
      return MOCK_TRANSCRIPT;
    }

    const json = await res.json();
    const text: string =
      json?.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? "";

    return text.trim() || MOCK_TRANSCRIPT;
  } catch (err) {
    console.error("Transcription failed, using mock:", err);
    return MOCK_TRANSCRIPT;
  }
}

import React, { useCallback, useEffect, useState } from "react";
import { Title } from "@/components/questions/voice-answer/Title";
import {
  QuestionProgress,
  QuestionsProgress,
} from "@/components/questions/Progress";
import { VoiceRecognitionAnimation } from "@/components/questions/voice-answer/VoiceRecognitionAnimation";
import { Stop } from "@/icons/Stop";
import { Play } from "@/icons/Play";
import { AnalysisResponse } from "@/utils/analysis/types";
import { transcript } from "@/actions/transcript";
import { answerAnalysis } from "@/actions/answer-analysis";

const interval = 300; // 30 seconds total
export function Answer({
  question,
  setAnalysis,
}: {
  question: string;
  setAnalysis: React.Dispatch<React.SetStateAction<AnalysisResponse | null>>;
}) {
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  // analyzing answer is when the audio is being transcribed, plus while we are waiting for response analysis
  const [analyzingAnswer, setAnalyzingAnswer] = useState(false);
  const [micAccess, setMicAccess] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [progress, setProgress] = useState(10);

  const stopRecording = useCallback(() => {
    stream?.getTracks().forEach((track) => track.stop());
    setProgress(100);
    setRecording(false);
    setAnalyzingAnswer(true);
  }, [stream]);

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalID);
          stopRecording();
          // router.push("/questions/wrong");
        }
        return p + 1;
      });
    }, interval);

    return () => clearInterval(intervalID);
  }, [stopRecording]);

  const getMicrophonePermission = () => {
    if ("MediaRecorder" in window) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((streamData) => {
          if (streamData) {
            setMicAccess(true);
            setStream(streamData);
            setError("");
            setRecording(true);
          } else {
            setMicAccess(false);
            setError("Microphone access denied");
          }
        })
        .catch((err) => {
          setMicAccess(false);
          setError("Microphone access denied");
        });
    } else {
      setMicAccess(false);
      setError("Media recording is not supported in your browser.");
    }
  };

  const getAnimation = () => {
    if ((!recording && !analyzingAnswer) || !micAccess) {
      return "none";
    } else if (recording) {
      return "recording";
    } else {
      return "transcripting";
    }
  };

  const [transcribedText, setTranscribedText] = useState("");

  async function transcriptAudio(audio: Blob) {
    const formData = new FormData();
    formData.append("file", audio, "voice-chat.mp3");

    const transcription = await transcript(formData);
    setTranscribedText(transcription);
  }

  useEffect(() => {
    if (transcribedText) {
      answerAnalysis({ question, answer: transcribedText }).then((data) => {
        setAnalyzingAnswer(false);
        setAnalysis(data);
      });
    }
  }, [transcribedText]);

  useEffect(() => {
    let mediaRecorder: MediaRecorder | null = null;
    const audioChunks: Blob[] = [];

    const startRecording = () => {
      if (stream && recording && micAccess && !mediaRecorder) {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(1000);

        mediaRecorder.ondataavailable = (e) => {
          audioChunks.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          setAnalyzingAnswer(true);
          const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
          // const audioUrl = URL.createObjectURL(audioBlob);
          // const audio = new Audio(audioUrl);
          // await audio.play();
          await transcriptAudio(audioBlob);
        };
      }
    };

    startRecording();
  }, [stream, recording]);

  return (
    <div className="flex h-dvh flex-col items-center justify-between bg-bright-blue pb-6">
      <div className="flex w-full flex-col items-center gap-2">
        <QuestionsProgress progress={30} className="w-56" />
      </div>
      <div className="flex max-w-64 flex-col items-center gap-8 self-center p-4">
        <Title color="white">{question}</Title>
        <QuestionProgress
          variant="light"
          progress={progress}
          title={
            !analyzingAnswer ? (recording ? "Speak" : "") : "Answer analyze..."
          }
        />
        <Title className="invisible">
          How are you going to get users/customers?
        </Title>
      </div>
      <div className="flex flex-col items-center gap-1">
        {error && <p>{error}</p>}
        <div className="flex items-center gap-2">
          <VoiceRecognitionAnimation animation={getAnimation()} />
          <div>
            {!recording ? (
              <Play className="text-white/40" />
            ) : (
              <Stop onClick={stopRecording} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

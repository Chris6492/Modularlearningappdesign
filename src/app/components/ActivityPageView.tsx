import { useState, useEffect } from "react";
import { HelpCircle, Trophy } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription } from "./ui/card";
import { LLMCodeGenerator } from "./LLM";
import { MultipleChoiceActivity } from "./MultipleChoiceActivity";
import { HelpModal } from "./HelpModal";

export interface Option {
  id: string;
  code: string;
  isCorrect: boolean;
  explanation: string;
}

interface ActivityPageViewProps {
  activity: string;
  description: string;
  onBack: () => void;
}

export function ActivityPageView({
  activity,
  description,
  onBack,
}: ActivityPageViewProps) {
  const ACTIVITY_TIME_LIMIT = 600;
  const [code, setCode] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [canGenerate, setCanGenerate] = useState(true);
  const [score, setScore] = useState(0);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ACTIVITY_TIME_LIMIT);
  const [activityEnded, setActivityEnded] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy",
  );
  const [streak, setStreak] = useState(0);

  // Main Question Generator
  const generateQuestion = async () => {
    if (!canGenerate) return;

    setLoading(true);
    setError(null);
    setCanGenerate(false);

    try {
      const res = await fetch("/api/generate_v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Generate ${difficulty} difficulty vulnerable Python code and 4 possible fixes in JSON format with keys: vulnerableCode and options.`,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const parsed = data.response ? data.response : data;

      if (!parsed.vulnerableCode || !Array.isArray(parsed.options)) {
        throw new Error("Invalid AI response structure");
      }

      setCode(parsed.vulnerableCode);
      setOptions(parsed.options);
    } catch (err) {
      console.error("Generation error:", err);
      setError((err as Error).message);
      setCanGenerate(true); // unlock if failed
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (activityEnded) return;

    if (timeLeft <= 0) {
      setActivityEnded(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, activityEnded]);

  useEffect(() => {
    if (difficulty !== "easy") {
      generateQuestion();
    }
  }, [difficulty]);

  // Unlock when correct answer selected
  const handleCorrect = () => {
    setScore((prev) => prev + 1);
    setStreak((prev) => {
      const newStreak = prev + 1;
      if (newStreak >= 3 && difficulty === "easy") setDifficulty("medium");
      else if (newStreak >= 6 && difficulty === "medium") setDifficulty("hard");
      return newStreak;
    });
    setCanGenerate(true);
  };

  const handleWrong = () =>{
    setStreak(0);
  };

  if (activityEnded) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-6 pt-20">
        <h2 className="text-3xl font-bold text-white">Time's Up!</h2>
        <p className="text-xl text-slate-300">Final Score: {score}</p>

        <Button
          onClick={() => {
            setTimeLeft(ACTIVITY_TIME_LIMIT);
            setScore(0);
            setActivityEnded(false);
            setCode("");
            setOptions([]);
            setCanGenerate(true);
          }}
          className="mt-4"
        >
          Restart Activity
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative pb-20">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-primary/10 transition-colors"
        >
          ← Back to Lesson
        </Button>
        <div
          className={`text-xl font-mono font-bold px-4 py-2 rounded-lg bg-white-900 border border-slate-800 ${
            timeLeft <= 60
              ? "text-red-500 animate-pulse border-red-500/50"
              : "text-primary"
          }`}
        >
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-6 space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-start border-b border-primary/10 pb-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex gap-2">
              {isCompleted && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20">
                  <Trophy className="h-4 w-4" />
                  Completed
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsHelpOpen(true)}
                className="gap-2 rounded-full border-primary/20 hover:bg-primary/10"
              >
                <HelpCircle className="h-4 w-4 bg-gray-200" />
                Help
              </Button>
            </div>
          </div>

          {/* Generator Section - Centered */}
          <div className="flex justify-center py-4">
            <LLMCodeGenerator
              onGenerate={generateQuestion}
              canGenerate={canGenerate && !loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Code Display */}
          {code && (
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
              <Editor
                height="250px"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "Fira Code, monospace",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 20, bottom: 20 },
                }}
              />
            </div>
          )}

          {/* Multiple Choice */}
          {options.length > 0 && (
            <div className="pt-6 border-t border-primary/10">
              <MultipleChoiceActivity
                options={options}
                onCorrect={handleCorrect}
                onWrong={handleWrong}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floating Score - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl border-2 border-white/10 backdrop-blur-md flex items-center gap-3 hover:scale-105 transition-transform group">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">
              Total Score
            </span>
            <span className="text-2xl font-black leading-tight">{score}</span>
          </div>
          <div className="h-8 w-[1px] bg-white/20 mx-1" />
          <Trophy className="h-6 w-6 text-yellow-400 group-hover:rotate-12 transition-transform" />
        </div>
      </div>

      <div className="fixed bottom-7 left-8 z-50">
        <div className="bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl border-2 border-white/10 backdrop-blur-md flex items-center gap-3 hover:scale-105 transition-transform group">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">
              Streak
            </span>
            <span className="text-2xl font-black leading-tight">{streak}</span>
          </div>
          <div className="h-8 w-[1px] bg-white/20 mx-1" />
        
        </div>
      </div>

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Activity Help"
        description={description}
      />
    </div>
  );
}

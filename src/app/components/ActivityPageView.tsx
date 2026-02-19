// import React, { useState, useEffect } from "react";
// import { ArrowLeft, HelpCircle, X, Code2, Play, Trophy } from "lucide-react";
// import { Button } from "./ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
// import { HelpModal } from "./HelpModal";
// import { MultipleChoiceActivity } from "./MultipleChoiceActivity";
// import { Option } from "./LLM";

// interface ActivityPageViewProps {
//   activity: string;
//   description: string;
//   onBack: () => void;
//   code: string;
//   options: Option[];
// }
// const ACTIVITY_TIME_LIMIT = 600;

// export function ActivityPageView({ activity, description, onBack, code, options }: ActivityPageViewProps) {
//   const [isHelpOpen, setIsHelpOpen] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [questionsAnswered, setQuestionsAnswered] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(ACTIVITY_TIME_LIMIT);
//   const [activityEnded, setActivityEnded] = useState(false);
//   const [canGenerate, setCanGenerate] = useState(true);
  

  
  
//   // Countdown effect fuctionality
//   useEffect(() => {
//     if (activityEnded) return;

//     if (timeLeft <= 0) {
//       setActivityEnded(true);
//       return;
//     }

//     const timer = setTimeout(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [timeLeft, activityEnded]);

//   const handleCorrect = () => {
//     if (activityEnded) return;
//     setCanGenerate(true);

//     setScore((prev) => prev + 1);
//     setQuestionsAnswered((prev) => prev + 1);

//     // generateNextQuestion();
//   };
//   // {activityEnded ? (
//   //   <div className="text-center space-y-4">
//   //     <h2 className="text-2xl font-bold">Time's Up!</h2>
//   //     <p>Final Score: {score}</p>
//   //     <p>Questions Answered: {questionsAnswered}</p>
//   //     <Button onClick={restartActivity}>Restart</Button>
//   //   </div>
//   //   )};

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <div className="flex items-center justify-between">
//         <Button variant="ghost" onClick={onBack} className="gap-2">
//           <ArrowLeft className="h-4 w-4" />
//           Back to Lesson
//         </Button>
//         <div className="flex justify-between items-center mb-6">
//           {/* <div className="text-lg font-semibold">
//             Score: {score}
//           </div>
//  */}
//           <div className={`text-xl font-bold ${
//             timeLeft <= 60 ? "text-red-500 animate-pulse" : ""
//           }`}>
//             {Math.floor(timeLeft / 60)}:
//             {(timeLeft % 60).toString().padStart(2, "0")}
//           </div>
//         </div>
//         <div className="flex gap-2">
//           {isCompleted && (
//             <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//               <Trophy className="h-4 w-4" />
//               Activity Completed!
//             </div>
//           )}
//           <Button variant="outline" size="sm" onClick={() => setIsHelpOpen(true)} className="gap-2">
//             <HelpCircle className="h-4 w-4" />
//             Help
//           </Button>
//         </div>
//       </div>

//       <Card className="border-primary/20 bg-primary/5">
//         <CardHeader>
//           <CardTitle className="text-xl flex items-center gap-2">
//             <Code2 className="h-5 w-5 text-primary" />
//             Activity: {activity}
//           </CardTitle>
//           <CardDescription>
//             Identify the security risk in the AI-generated code and select the correct fix from the 4 options below.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">

//           <div className="relative group">
//             <textarea
//               value={code}
//               readOnly
//               className="w-full h-64 p-4 font-mono text-sm bg-slate-950 text-slate-50 rounded-lg border border-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
//               spellCheck={false}
//             />
//           </div>

//           {options.length > 0 && (
//             <div className="pt-4 border-t border-primary/10">
//               <h3 className="text-lg font-semibold mb-4">Choose the correct fix:</h3>
//               <MultipleChoiceActivity 
//                 options={options} 
//                 onCorrect={() =>{ 
//                   setIsCompleted(true) 
//                 }} 
//               />
//             </div>
//           )}
          
//         </CardContent>
//       </Card>

//       <HelpModal
//         isOpen={isHelpOpen}
//         onClose={() => setIsHelpOpen(false)}
//         title="Activity Help"
//         description={description}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import { HelpCircle,Trophy } from "lucide-react";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
          prompt:
            "Generate vulnerable Python code and 4 possible fixes in JSON format with keys: vulnerableCode and options.",
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

  // Unlock when correct answer selected
  const handleCorrect = () => {
    setScore((prev) => prev + 1);
    setCanGenerate(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={onBack}>
        ← Back to Lesson
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{activity}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score + Generate */}
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">
              Score: {score}
            </div>
             

            <LLMCodeGenerator
              onGenerate={generateQuestion}
              canGenerate={canGenerate && !loading}
            />
          </div>
          <div className={`text-xl font-bold ${
                 timeLeft <= 60 ? "text-red-500 animate-pulse" : ""
               }`}>
                 {Math.floor(timeLeft / 60)}:
                 {(timeLeft % 60).toString().padStart(2, "0")}
               </div>
             <div className="flex gap-2">
               {isCompleted && (
                 <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                   <Trophy className="h-4 w-4" />
                   Activity Completed!
                 </div>
               )}
               <Button variant="outline" size="sm" onClick={() => setIsHelpOpen(true)} className="gap-2">
                 <HelpCircle className="h-4 w-4" />
                 Help
               </Button>
             </div>
          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Code Display */}
          {code && (
            <Editor
              height="300px"
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
              }}
            />
          )}

          {/* Multiple Choice */}
          {options.length > 0 && (
            <MultipleChoiceActivity
              options={options}
              onCorrect={handleCorrect}
            />
          )}
        </CardContent>
      </Card>
             <HelpModal
               isOpen={isHelpOpen}
               onClose={() => setIsHelpOpen(false)}
               title="Activity Help"
               description={description}
             />
    </div>
  );
}


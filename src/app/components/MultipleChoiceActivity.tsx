import React, { useState, useEffect} from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import monaco from "monaco-editor"


export interface Option {
  id: string;
  code: string;
  isCorrect: boolean;
  explanation: string;
}

interface MultipleChoiceActivityProps {
  options: Option[];
  onCorrect: () => void;
  onWrong: () => void;
}

export function MultipleChoiceActivity({ options, onCorrect, onWrong }: MultipleChoiceActivityProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  
  useEffect(() => {
    setSelectedId(null);
    setShowResult(false);
  }, [options]);

  const handleSelect = (id: string) => {
    if (showResult) return;

    setSelectedId(id);
    setShowResult(true);

    const selectedOption = options.find((o) => o.id === id);

    if (selectedOption?.isCorrect) {
      onCorrect();
    }else{
      onWrong();
    }
  };

  const handleRetry = () => {
    setSelectedId(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          const isCorrect = option.isCorrect;

          return (
            <Card
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`cursor-pointer transition-all border-2 ${
                showResult && isSelected
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-transparent hover:border-primary/50 bg-slate-900"
              }`}
            >
              <CardContent className="p-4 space-y-3">
                {/* Code Block */}
                <pre className="text-xs font-mono bg-black/50 p-3 rounded overflow-x-auto text-slate-300">
                  {option.code}
                </pre>

                {/* Result Feedback */}
                {showResult && isSelected && (
                  <div
                    className={`flex items-start gap-2 text-sm ${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    )}
                    <p>{option.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Retry Button */}
      {showResult && (
        <div className="flex justify-center">
          <Button onClick={handleRetry}>Try Again</Button>
        </div>
      )}
    </div>
  );
  
}

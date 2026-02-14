import React, { useState } from "react";
import { ArrowLeft, HelpCircle, X, Code2, Play, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { HelpModal } from "./HelpModal";
import { MultipleChoiceActivity } from "./MultipleChoiceActivity";
import { Option } from "./LLM";

interface ActivityPageViewProps {
  activity: string;
  description: string;
  onBack: () => void;
  code: string;
  options: Option[];
}


export function ActivityPageView({ activity, description, onBack, code, options }: ActivityPageViewProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Lesson
        </Button>
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
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Activity: {activity}
          </CardTitle>
          <CardDescription>
            Identify the security risk in the AI-generated code and select the correct fix from the 4 options below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          <div className="relative group">
            <textarea
              value={code}
              readOnly
              className="w-full h-64 p-4 font-mono text-sm bg-slate-950 text-slate-50 rounded-lg border border-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              spellCheck={false}
            />
          </div>

          {options.length > 0 && (
            <div className="pt-4 border-t border-primary/10">
              <h3 className="text-lg font-semibold mb-4">Choose the correct fix:</h3>
              <MultipleChoiceActivity 
                options={options} 
                onCorrect={() => setIsCompleted(true)} 
              />
            </div>
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

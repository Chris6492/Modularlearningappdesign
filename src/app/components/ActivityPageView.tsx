import React, { useState } from "react";
import { ArrowLeft, HelpCircle, X, Code2, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { HelpModal } from "./HelpModal";

interface ActivityPageViewProps {
  activity: string;
  description: string;
  onBack: () => void;
}

export function ActivityPageView({ activity, description, onBack }: ActivityPageViewProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [code, setCode] = useState(`// AI Generated Code with potential issues
function processUserData(userData) {
  // Blindly trust that userData has the expected structure
  const name = userData.name;
  const email = userData.email;
  
  console.log("Processing user: " + name + " (" + email + ")");
  
  // Potential SQL Injection vulnerability
  const query = "INSERT INTO users (name, email) VALUES ('" + name + "', '" + email + "')";
  return db.execute(query);
}

// How would you fix the issues above?`);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Lesson
        </Button>
        <Button variant="outline" size="sm" onClick={() => setIsHelpOpen(true)} className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Help
        </Button>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Activity: {activity}
          </CardTitle>
          <CardDescription>
            Analyze the AI-generated code below and identify security risks or bad practices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative group">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 p-4 font-mono text-sm bg-slate-950 text-slate-50 rounded-lg border border-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              spellCheck={false}
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="sm" className="gap-2">
                <Play className="h-3 w-3" />
                Run Code
              </Button>
            </div>
          </div>
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

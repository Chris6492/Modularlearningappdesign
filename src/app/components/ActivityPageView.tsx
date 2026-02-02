import React, { useState } from "react";
import { ArrowLeft, HelpCircle, X, Code2, Play, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { HelpModal } from "./HelpModal";
import { MultipleChoiceActivity } from "./MultipleChoiceActivity";

interface ActivityPageViewProps {
  activity: string;
  description: string;
  onBack: () => void;
}

const BAD_CODING_OPTIONS = [
  {
    id: "1",
    code: `function saveUser(user) {
  const sql = "INSERT INTO users VALUES ('" + user.name + "')";
  db.execute(sql);
}`,
    isCorrect: false,
    explanation: "This is vulnerable to SQL injection. Never concatenate user input directly into SQL queries."
  },
  {
    id: "2",
    code: `function saveUser(user) {
  const sql = "INSERT INTO users (name) VALUES (?)";
  db.execute(sql, [user.name]);
}`,
    isCorrect: true,
    explanation: "Correct! Using parameterized queries (prepared statements) prevents SQL injection by separating code from data."
  },
  {
    id: "3",
    code: `function saveUser(user) {
  eval("db.insert('users', " + JSON.stringify(user) + ")");
}`,
    isCorrect: false,
    explanation: "Using eval() is extremely dangerous and can lead to arbitrary code execution."
  },
  {
    id: "4",
    code: `function saveUser(user) {
  localStorage.setItem('lastUser', user.name);
  db.execute("INSERT INTO users VALUES ('" + user.name + "')");
}`,
    isCorrect: false,
    explanation: "This still has the SQL injection vulnerability and adds unnecessary side effects."
  }
];

export function ActivityPageView({ activity, description, onBack }: ActivityPageViewProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
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

// Select the correct fix from the options below!`);

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

          <div className="pt-4 border-t border-primary/10">
            <h3 className="text-lg font-semibold mb-4">Choose the correct fix:</h3>
            <MultipleChoiceActivity 
              options={BAD_CODING_OPTIONS} 
              onCorrect={() => setIsCompleted(true)} 
            />
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

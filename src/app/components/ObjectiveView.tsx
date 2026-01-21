import React from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

interface ObjectiveViewProps {
  objective: string;
  lessonTitle: string;
  onBack: () => void;
}

export function ObjectiveView({ objective, lessonTitle, onBack }: ObjectiveViewProps) {
  const [note, setNote] = React.useState("");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">{lessonTitle}</h2>
          <h1 className="text-2xl font-bold">{objective}</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Take Notes</CardTitle>
          <CardDescription>
            Record your thoughts, questions, or key takeaways for this learning objective.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your notes here..."
            className="min-h-[300px] resize-none focus-visible:ring-primary"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="flex justify-end">
            <Button className="gap-2">
              <Send className="h-4 w-4" />
              Save Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

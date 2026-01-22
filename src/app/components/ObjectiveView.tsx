import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

interface ObjectiveViewProps {
  objective: string;
  description: string;
  lessonTitle: string;
  onBack: () => void;
}

export function ObjectiveView({ objective, description, lessonTitle, onBack }: ObjectiveViewProps) {
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
          <CardTitle>{objective}</CardTitle>
          <CardDescription>
            Detailed overview of this learning objective.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

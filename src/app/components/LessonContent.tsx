import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { CarPromptExample } from "./Carpromptexample";

interface LessonContentProps {
  title: string;
  content: string;
  objectives: string[];
  activities: string[];
  completed: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onObjectiveClick: (objective: string) => void;
  ShowCarPromptExample?: boolean;
}

export function LessonContent({
  title,
  content,
  objectives,
  activities,
  completed,
  hasNext,
  hasPrevious,
  ShowCarPromptExample,
  onComplete,
  onNext,
  onPrevious,
  onObjectiveClick,
}: LessonContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{title}</CardTitle>
              <CardDescription>
                Master the fundamentals and apply your knowledge
              </CardDescription>
            </div>
            {completed && (
              <Badge
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Learning Objectives</h3>
            <ul className="space-y-2">
              {objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <button
                    onClick={() => onObjectiveClick(objective)}
                    className="text-muted-foreground hover:text-primary hover:underline text-left transition-colors duration-200"
                  >
                    {objective}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Learning Activities</h3>
            <ul className="space-y-2">
              {activities?.map((activity, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
              {content}
            </div>{" "}
            { ShowCarPromptExample && <CarPromptExample />}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          variant={completed ? "outline" : "default"}
          onClick={onComplete}
          className="flex-1 max-w-xs"
        >
          {completed ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Completed
            </>
          ) : (
            "Mark as Complete"
          )}
        </Button>

        <Button variant="outline" onClick={onNext} disabled={!hasNext}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

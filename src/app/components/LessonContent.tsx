import { CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

interface LessonContentProps {
  title: string;
  content: string;
  image?: string;
  objectives: string[];
  completed: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onObjectiveClick: (objective: string) => void;
}

export function LessonContent({
  title,
  content,
  image,
  objectives,
  completed,
  hasNext,
  hasPrevious,
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
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {image && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
              <img 
                src={image} 
                alt={title} 
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
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

          <Separator />

          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
              {content}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
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

        <Button
          variant="outline"
          onClick={onNext}
          disabled={!hasNext}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface LessonItemProps {
  title: string;
  duration: string;
  completed: boolean;
  isActive?: boolean;
  onClick: () => void;
}

export function LessonItem({
  title,
  duration,
  completed,
  isActive,
  onClick,
}: LessonItemProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isActive 
          ? "border-primary shadow-md" 
          : "hover:border-primary/50"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
          ) : isActive ? (
            <PlayCircle className="h-5 w-5 text-primary flex-shrink-0" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium ${completed ? "text-muted-foreground" : ""}`}>
              {title}
            </h4>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
          {isActive && (
            <Badge variant="default" className="ml-2">
              Active
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

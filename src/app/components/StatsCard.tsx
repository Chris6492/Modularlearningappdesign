import { TrendingUp, Target, Award, BookOpen, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface StatsCardProps {
  icon: "trending" | "target" | "award" | "book";
  title: string;
  value: string | number;
  subtitle: string;
  color?: string;
}

const iconMap: Record<string, LucideIcon> = {
  trending: TrendingUp,
  target: Target,
  award: Award,
  book: BookOpen,
};

const colorMap: Record<string, string> = {
  trending: "text-blue-500",
  target: "text-purple-500",
  award: "text-yellow-500",
  book: "text-green-500",
};

export function StatsCard({ icon, title, value, subtitle, color }: StatsCardProps) {
  const Icon = iconMap[icon] || BookOpen;
  const iconColor = color || colorMap[icon] || "text-primary";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
}

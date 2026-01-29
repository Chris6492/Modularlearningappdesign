import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  GraduationCap,
  LayoutDashboard,
  Search,
  User,
  BookOpen,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Table } from "./components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Calendar } from "./components/ui/calendar";
import { CourseCard } from "./components/CourseCard";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { LessonItem } from "./components/LessonItem";
import { LessonContent } from "./components/LessonContent";
import { StatsCard } from "./components/StatsCard";
import { ObjectiveView } from "./components/ObjectiveView";

import { ExampleType } from "./components/example/ExampleRegistry";
import { UserDialog } from "./components/UserDialog";

interface ObjectiveDetail {
  title: string;
  description: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  objectives: string[];
  objectiveDetails?: Record<string, ObjectiveDetail>;
  exampleType?: ExampleType;
  activities: string[];
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  lessons: Lesson[];
}

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setLoading(false);
      });
  }, []);

  const [activeTab, setActiveTab] = useState("all");
  const [activeView, setActiveView] = useState<"dashboard" | "course" | "lesson">("dashboard");
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const stats = [
    { label: "Total Courses", value: courses.length.toString(), icon: GraduationCap },
    { label: "Completed", value: "0", icon: BookOpen },
    { label: "Hours Learned", value: "0h", icon: Clock },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleCourseClick = (course: Course) => {
    setCurrentCourse(course);
    setActiveView("course");
  };

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setActiveView("lesson");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">LMS Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8 w-64"
                />
              </div>
              <Avatar className="cursor-pointer" onClick={() => setUserDialogOpen(true)}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{currentUser ? currentUser.username[0].toUpperCase() : "CN"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <UserDialog 
        open={userDialogOpen} 
        onOpenChange={setUserDialogOpen} 
        onUserCreated={(user) => setCurrentUser(user)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === "dashboard" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Welcome back{currentUser ? `, ${currentUser.username}` : ''}!</h1>
                <p className="text-muted-foreground">Continue where you left off or explore new courses.</p>
              </div>
              <Button>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                My Dashboard
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onClick={() => handleCourseClick(course)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeView === "course" && currentCourse && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setActiveView("dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-bold">{currentCourse.title}</h2>
              <p className="text-muted-foreground mt-2">{currentCourse.description}</p>
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Lessons</h3>
                <div className="grid gap-4">
                  {currentCourse.lessons.length > 0 ? (
                    currentCourse.lessons.map((lesson) => (
                      <LessonItem
                        key={lesson.id}
                        lesson={lesson}
                        onClick={() => handleLessonClick(lesson)}
                      />
                    ))
                  ) : (
                    <p className="text-muted-foreground italic">No lessons available yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === "lesson" && currentLesson && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setActiveView("course")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LessonContent lesson={currentLesson} />
              </div>
              <div className="space-y-6">
                <ObjectiveView objectives={currentLesson.objectives} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

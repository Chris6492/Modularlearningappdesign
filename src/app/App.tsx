import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  GraduationCap,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { CourseCard } from "./components/CourseCard";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { LessonItem } from "./components/LessonItem";
import { LessonContent } from "./components/LessonContent";
import { StatsCard } from "./components/StatsCard";
import { ObjectiveView } from "./components/ObjectiveView";
import { ActivityPageView } from "./components/ActivityPageView";
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
  activityDescriptions?: Record<string, string>;
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
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
          });
        }
        return res.json();
      })
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
  const [activeView, setActiveView] = useState<"dashboard" | "course" | "lesson" | "objective" | "activity-page">("dashboard");
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentObjective, setCurrentObjective] = useState<{title: string, description: string} | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [canGenerate, setCanGenerate] = useState(true);

  const stats = [
    { title: "Total Courses", value: courses.length, subtitle: "Available now", icon: "book" as const },
    { title: "Target Progress", value: "0%", subtitle: "Weekly goal", icon: "target" as const },
    { title: "Learning Streak", value: "0 days", subtitle: "Keep it up", icon: "trending" as const },
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

  const handleObjectiveClick = (objectiveTitle: string) => {
    if (currentLesson?.objectiveDetails?.[objectiveTitle]) {
      setCurrentObjective({
        title: objectiveTitle,
        description: currentLesson.objectiveDetails[objectiveTitle].description
      });
      setActiveView("objective");
    }
  };

  const handleActivityClick = (activity: string) => {
    setSelectedActivity(activity);
    setGeneratedCode(""); 
    setActiveView("activity-page");
  };

  const handleLessonComplete = () => {
    if (currentLesson) {
      // In a real app, this would be an API call
      const updatedLessons = currentCourse?.lessons.map(l => 
        l.id === currentLesson.id ? { ...l, completed: true } : l
      ) || [];
      if (currentCourse) {
        setCurrentCourse({ ...currentCourse, lessons: updatedLessons });
        setCurrentLesson({ ...currentLesson, completed: true });
      }
    }
  };

  const handleNextLesson = () => {
    if (currentCourse && currentLesson) {
      const currentIndex = currentCourse.lessons.findIndex(l => l.id === currentLesson.id);
      if (currentIndex < currentCourse.lessons.length - 1) {
        setCurrentLesson(currentCourse.lessons[currentIndex + 1]);
      }
    }
  };

  const handlePreviousLesson = () => {
    if (currentCourse && currentLesson) {
      const currentIndex = currentCourse.lessons.findIndex(l => l.id === currentLesson.id);
      if (currentIndex > 0) {
        setCurrentLesson(currentCourse.lessons[currentIndex - 1]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">LearnHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8 w-64"
                />
              </div>
              <Avatar className="cursor-pointer" onClick={() => setUserDialogOpen(true)}>
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || 'Guest'}`} />
                <AvatarFallback>{currentUser ? currentUser.username[0].toUpperCase() : "U"}</AvatarFallback>
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
                      id={course.id}
                      title={course.title}
                      description={course.description}
                      category={course.category}
                      duration={course.duration}
                      lessonsCount={course.lessons.length}
                      progress={0}
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
                        title={lesson.title}
                        duration={lesson.duration}
                        completed={lesson.completed}
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

        {activeView === "lesson" && currentLesson && currentCourse && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setActiveView("course")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>

            <LessonContent
              title={currentLesson.title}
              content={currentLesson.content}
              objectives={currentLesson.objectives}
              activities={currentLesson.activities}
              completed={currentLesson.completed}
              exampleType={currentLesson.exampleType}
              hasNext={currentCourse.lessons.findIndex(l => l.id === currentLesson.id) < currentCourse.lessons.length - 1}
              hasPrevious={currentCourse.lessons.findIndex(l => l.id === currentLesson.id) > 0}
              onComplete={handleLessonComplete}
              onNext={handleNextLesson}
              onPrevious={handlePreviousLesson}
              onObjectiveClick={handleObjectiveClick}
              onActivityClick={handleActivityClick}
            />
          </div>
        )}

        {activeView === "objective" && currentObjective && currentLesson && (
          <div className="space-y-6">
            <ObjectiveView 
              objective={currentObjective.title}
              description={currentObjective.description}
              lessonTitle={currentLesson.title}
              onBack={() => setActiveView("lesson")}
            />
          </div>
        )}

        {activeView === "activity-page" && currentLesson && selectedActivity && (
          <div>
            <ActivityPageView
              activity={selectedActivity}
              description={
                currentLesson?.activityDescriptions?.[
                  selectedActivity
                ] || ""
              }
              onBack={() => setActiveView("lesson")}
            />
          </div>
          
        )}
      </main>
    </div>
  );
};

export default App;

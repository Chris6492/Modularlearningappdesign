import React, { useState } from "react";
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
import { LessonItem } from "./components/LessonItem";
import { LessonContent } from "./components/LessonContent";
import { StatsCard } from "./components/StatsCard";
import { ObjectiveView } from "./components/ObjectiveView";

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

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Software Development",
    description:
      "Master the essentials of AI-assisted development, from foundational skills to advanced prompting frameworks and identifying bad practices.",
    category: "AI Development",
    duration: "4 hours",
    lessons: [
      {
        id: "1-1",
        title: "AI Foundational Skills",
        duration: "60 min",
        content:
          "Explore the core concepts of AI in software development. Understand how Large Language Models work, their capabilities, and how to integrate them into your development workflow effectively.",
        objectives: [
          "Understand LLM basics for developers",
          "Set up AI development tools",
          "Learn core AI interaction patterns",
          "Identify best use cases for AI assistance",
        ],
        objectiveDetails: {
          "Understand LLM basics for developers": {
            title: "LLM Fundamentals",
            description:
              "Deep dive into how Large Language Models work, tokenization, and their probabilistic nature.",
          },
          "Set up AI development tools": {
            title: "Toolchain Configuration",
            description:
              "Properly configuring your IDE and CLI tools to leverage AI assistance effectively.",
          },
          "Learn core AI interaction patterns": {
            title: "Interaction Design",
            description:
              "Mastering zero-shot, few-shot, and chain-of-thought prompting for better code generation.",
          },
          "Identify best use cases for AI assistance": {
            title: "Value Recognition",
            description:
              "Learning where AI excels and where human intervention is critical in the dev lifecycle.",
          },
        },
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "1-1-1",
        title: "Understand LLM basics for developers",
        duration: "15 min",
        content:
          "Large Language Models (LLMs) are a type of artificial intelligence trained on vast amounts of text data. For developers, understanding LLMs means recognizing they are probabilistic next-token predictors, not reasoning engines with consciousness. This fundamental distinction is crucial for setting realistic expectations and designing effective AI-integrated systems.\n\nWhen working with LLMs, developers should focus on their ability to handle unstructured data, perform translation tasks, and assist in code generation while being mindful of their limitations, such as hallucinations and context window constraints. Mastering the interface between deterministic code and probabilistic AI outputs is the key to building robust AI-enhanced applications.",
        objectives: ["Neural Network Foundations", "Tokenization and Embeddings"],
        activities: ["activity goes here"],
        completed: false,
      },

      {
        id: "1-1-3",
        title: "Learn core AI interaction patterns",
        duration: "25 min",
        content:
          "Effective interaction with AI requires moving beyond simple questions to structured interaction patterns. Patterns like 'Chain of Thought' prompting, where you ask the AI to explain its reasoning step-by-step, can lead to much more reliable complex code outputs. Another powerful pattern is the 'Flipped Interaction', where you ask the AI to interview you about your requirements before it generates any code.\n\nUnderstanding these interaction patterns allows developers to treat the AI as a junior partner rather than just a search engine. By providing clear constraints and using iterative refinement, you can guide the AI to produce production-ready code that adheres to your specific design patterns and architectural standards.",
        objectives: ["Chain of Thought Prompting", "Iterative Refinement"],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "1-2",
        title: "AI Bad Coding Practices",
        duration: "45 min",
        content:
          "Learn to identify and avoid common pitfalls when using AI for coding. We'll cover over-reliance, hallucination checks, legal risks, and maintaining code quality.",
        objectives: [
          "Blindly trusting AI-generated code",
          "Bad Prompting and Lack of Context",
          "Over-Reliance",
          "Licensing & ip risk",
        ],

        objectiveDetails: {
          "Blindly trusting AI-generated code": {
            title: "ssss",
            description:
              "Overreliance on AI occurs when individuals or organizations depend too heavily on AI tools without sufficient validation or critical oversight. In a software development context, this can lead developers to accept AI-generated code, designs, or explanations at face value, even when they are incomplete, inefficient, or subtly incorrect. Over time, this reduces active engagement in independent problem-solving and weakens core skills such as debugging, system design, and reasoning through edge cases. When developers stop questioning outputs, AI shifts from being an assistive tool to an unquestioned authority, increasing the risk of technical debt and hidden defects.  Another major drawback of AI overreliance is the erosion of contextual and domain understanding. AI tools generate output based on patterns in data, not on a true understanding of a project’s unique constraints, business goals, or long-term architecture. Developers who rely too heavily on AI may miss important trade-offs related to performance, security, scalability, or maintainability. This is especially risky in complex systems, where blindly integrating AI-generated solutions can introduce vulnerabilities or misalignments that only surface in production. Without human judgment and review, small mistakes can scale into costly failures."
              //Finally, excessive dependence on AI can limit professional growth and adaptability. Learning in software development comes from struggling with problems, making mistakes, and refining mental models over time. If AI is always used as the first and final step, developers may progress faster in the short term but plateau in the long term. This creates teams that can assemble solutions quickly but lack the deep expertise needed to innovate, troubleshoot novel issues, or operate effectively when AI tools are unavailable or incorrect. Used thoughtfully, AI should amplify human capability—not replace critical thinking, accountability, or learning.",
          },
          "Bad Prompting and Lack of Context": {
            title: "LLM Fundamentals",
            description: "111111.",
          },
          "Over-Reliance": {
            title: "Toolchain Configuration",
            description: "22222.",
          },
          "Licensing & ip risk": {
            title: "Toolchain Configuration",
            description: "3333.",
          },
        },
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "1-3",
        title: "AI C.A.R. Prompting Framework",
        duration: "75 min",
        content:
          "Master the C.A.R. (Context, Action, Result) prompting framework to get high-quality, relevant code from AI. Learn how to structure your requests for maximum efficiency and accuracy.",
        objectives: [
          "Master the Context-Action-Result structure",
          "Senior Level Prompts Workflow",
          "Refine AI output through iterative prompting",
          "Build a library of effective developer prompts",
        ],
        objectiveDetails: {
          "Master the Context-Action-Result structure": {
            title: "LLM Fundamentals",
            description:
              `The C.A.R. Prompting Method (Context → Action → Result) is a practical framework developers use directly when talking to an LLM to unlock senior-level thinking while still producing junior-friendly execution. The core idea is simple: think like a senior engineer, execute like a junior, and let AI act as the multiplier. Instead of vague, low‑leverage prompts such as “fix this code” or “make this better,” C.A.R. forces structure, intent, and professional standards into the prompt itself. This structure mirrors how experienced developers naturally think about problems and how they communicate expectations during real code reviews.

              The first part, Context, represents how senior developers frame problems before touching the keyboard. A developer with several years of experience understands where the code lives, why it exists, and what constraints it must operate under. Context includes the programming language, framework, and the purpose of the code, as well as non‑negotiable constraints such as readability, security, performance, and maintainability. It also defines the skill level of the original author, which is critical for shaping explanations. By explicitly stating that the AI should act as a senior engineer mentoring a junior developer, the model is guided to respond with clearer explanations, better judgment, and realistic trade‑offs instead of generic advice.

              The second part, Action, reflects how senior engineers give instructions. Rather than asking only for an answer, seniors ask for process and reasoning. In C.A.R., the Action section tells the AI exactly how to approach the task: review the code, identify code smells, explain why each issue is a problem in simple terms, refactor step‑by‑step, and follow industry best practices. This mimics a real-world code review, where the goal is not just to fix the problem but to teach the developer how to think better next time. By breaking the work into explicit steps, the output becomes educational, structured, and easier for a junior developer to follow.

              The final part, Result, captures what experienced developers actually care about once the code works. While juniors often focus on whether the code runs, seniors focus on maintainability, scalability, readability, and risk. The Result section instructs the AI to output clean, production‑ready code with comments that explain key decisions, describe how the solution would scale, and call out potential risks or edge cases. This ensures the response goes beyond surface‑level fixes and instead reflects how software is evaluated in professional environments.

              When combined, Context, Action, and Result form a reusable prompt template that developers can apply to almost any task. A full C.A.R. prompt clearly defines the role of the AI as a senior mentor, specifies the technical environment, outlines the review and refactor process, and sets expectations for production‑quality output and learning outcomes. This makes the prompt itself a tool for skill development, not just a way to get an answer.

              Without C.A.R., a junior developer might ask something like, “Can you fix this React code?” which typically results in shallow fixes, limited reasoning, and little long‑term learning. Using the C.A.R. method, the same developer instead provides structured context about the component’s purpose, constraints such as handling loading and error states, and explicit actions like identifying issues and explaining trade‑offs. The result is a higher‑leverage interaction where the AI delivers senior‑level insights, clearer code, and concrete lessons the junior can apply in future work. In practice, C.A.R. is not hidden logic or backend magic—it is simply a disciplined way of writing prompts that turns AI into a realistic senior engineer sitting next to you during a code review.`,
          },
          "Senior Level Prompts Workflow": {
            title: "LLM Fundamentals",
            description: `DAILY WORKFLOW (REALISTIC & HIGH-IMPACT)
1️⃣ Context Sync (5–10 min)
Why seniors do this: avoid thrash & rework.
What YOU do
• Skim commits, issues, failing tests, logs
AI Prompt
“Given this repo state, recent commits, and open issues:
summarize current risks, technical debt, and the most impactful next action.”
Outcome
• You work on risk, not random tasks
• This is senior thinking 🔥
________________________________________
2️⃣ Requirement Clarifier (Before Any Code)
Why seniors win: they prevent wrong work.
AI Prompt
“Rewrite this task as clear requirements.
Identify missing assumptions, edge cases, and non-functional needs (performance, security, scale).”
You sanity-check
• Is failure behavior defined?
• Is rollback mentioned?
• Is “done” measurable?
🚨 If this isn’t clear → don’t code yet
________________________________________
3️⃣ Architecture Lite
You don’t need a 20-page doc — you need correct decisions.
AI Prompts (in order)
1.
“Propose 2–3 architectures given these constraints (small team, cloud, CI/CD).”
2.        
“Which option is the most boring and stable?”
3.        
“What breaks first if usage doubles?”
You choose
• Prefer boring
• Write one paragraph explaining why
That paragraph = senior-level ownership
________________________________________
4️⃣ Implementation (AI = Mid-Level Dev)
Your mindset: “I don’t type, I review.”
AI Prompt
“Implement this feature with clean, readable code.
Optimize for maintainability over cleverness.”
Your review checklist
• Can I explain this out loud?
• Are failures explicit?
• Are logs meaningful?
• Would I want to maintain this in 6 months?
🚨 If not → refactor immediately
________________________________________
5️⃣ Testing Like a Senior (Failure-First)
This is where most devs fall short.
AI Prompts
1.
“List the top 10 ways this feature could fail in production.”
2.        
“Generate tests for those failure scenarios.”
You ensure
• Timeouts tested
• Invalid input tested
• Partial failures tested
• Permissions tested
🔥 This is senior-level QA thinking
________________________________________
6️⃣ AI-Assisted Self Code Review (CRITICAL)
This is how you level up fastest.
AI Prompt
“Review this code as a strict senior engineer.
Call out bugs, performance issues, security risks, and maintainability concerns.”
Then:
“What would cause pain 6 months from now?”
You fix
• Naming
• Tight coupling
• Silent failures
• Over-engineering
This is where juniors become seniors.
________________________________________
7️⃣ CI/CD & Deployment Safety
Senior rule: Deployments should be boring.
AI Prompt
“What could go wrong during deployment or runtime?
Suggest safeguards and rollback strategies.”
You check
• Feature flags?
• Health checks?
• Rollback path?
• Metrics exist?
🚨 If rollback isn’t obvious → you’re not done.
________________________________________
8️⃣ End-of-Day Senior Reflection (5 min)
This compounds faster than tutorials.
AI Prompt
“What risks did I reduce today?
What risks did I introduce?
What should I watch tomorrow?”
This trains judgment, not syntax.
________________________________________
📆 WEEKLY SENIOR ROUTINES (Non-Negotiable)
🧩 Architecture Drift Check
“What design decisions are becoming brittle or overcomplicated?”
🧹 Tech Debt Audit
“What shortcuts are now production risks?”
📈 Skill Feedback Loop
“What did I debug this week that reveals a knowledge gap?”`,
          },
          "Refine AI output through iterative prompting": {
            title: "LLM Fundamentals",
            description:
              "Deep dive into how Large Language Models work, tokenization, and their probabilistic nature.",
          },
          "Build a library of effective developer prompts": {
            title: "LLM Fundamentals",
            description: "all good.",
          },
        },
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "1-4",
        title: "AI Tools For Software Development",
        duration: "20 min",
        content: "",
        objectives: ["Learning the core capabilities of each AI Tool", "Terminology Accuracy"],
        objectiveDetails: {
          "Learning the core capabilities of each AI Tool": {
            title: "LLM Fundamentals",
            description: `Google Antigravity
Product Overview: Google Antigravity is an "agent-first" integrated development environment (IDE) built on an open-source VS Code foundation. Launched on November 18, 2025, it is designed as a "Mission Control" for managing autonomous AI agents that plan, code, and test software with minimal human intervention.

Key Strengths:
• Massive Context Window: Uses Gemini 3.0 Pro with a 2-million-token context window, allowing it to process large enterprise codebases.
• Autonomous Multi-Agent Workflows: Multiple agents can be launched simultaneously to handle different tasks like building features while others write tests.
• Integrated Browser Control: Built-in Chrome-based browser allows agents to navigate pages and check visual UI changes in real-time.
• High-Level Verification (Artifacts): Provides implementation plans, walkthroughs, and screen recordings to prove code works.
• Human-in-the-Loop Feedback: Users can comment directly on artifacts or screenshots to refine agent plans.

Current Weaknesses & Risks:
• Critical Security Vulnerabilities: Documented "indirect prompt injection" flaws can lead to unauthorized commands or data theft.
• Reliability & "Task Looping": Agents can get stuck in repetitive loops or incorrectly delete critical code.
• Extension & Plugin Gaps: Lacks compatibility with some official Microsoft extensions due to licensing restrictions.
• Resource Throttling: Strict rate limits ("Out of Quota" walls) can force shifts to standard tools.
• Black Box Logic: Deep refactors can produce "logic compression," resulting in code that is hard for humans to debug.
• UI/UX Instability: Occasional flickers or freezing in browser integration.

Claude (Anthropic)
• Strengths: Highly consistent, follows constraints exceptionally well, excellent for complex coding and reduced review overhead.
• Weaknesses: Higher cost per task (though offset by reduced dev time), less extensive multimodal features than Gemini.
• Best For: Reliable, production-ready code, debugging, and complex refactoring.

Gemini (Google)
• Strengths: Powerful multimodal understanding, large context windows for deep codebase understanding, and features like Antigravity.
• Weaknesses: Can sometimes introduce unintended features or modify extra files; requires Google Cloud knowledge.
• Best For: Multimodal tasks (analyzing screenshots), deep codebase understanding, and Google ecosystem development.

OpenAI (GPT)
• Strengths: Broad integration (GitHub Copilot), large developer community, fast iteration, and good for general productivity.
• Weaknesses: Higher hallucination rates and can be less precise in complex coding scenarios.
• Best For: General coding assistance, creative tasks, and UI prototyping.`,
          },
        },
        activities: ["activity goes here"],
        completed: false,
      },

      {
        id: "1-4-1",
        title: "esa",
        duration: "10 min",
        content: "there is only one AI",
        objectives: ["learning the core capabilities of each AI Tool", "Terminology Accuracy"],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id:"1-5",
        title: "N/A",
        duration: "20 min",
        content:"N/A",
        objectives: ["N/A", "N/A"],
        activities: ["activity goes here"],
        completed: false
      },
      {
        id:"1-6",
        title: "Enter course module here!!!",
        duration: "20 min",
        content:"N/A",
        objectives: ["N/A", "N/A"],
        activities: ["activity goes here"],
        completed: false
      }
    ],
  },
];

type View = "dashboard" | "course" | "lesson" | "schedule" | "objective";

export default function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedObjective, setSelectedObjective] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const selectedLesson = selectedCourse?.lessons.find(
    (l) => l.id === selectedLessonId,
  );

  // Calculate progress for each course
  const getProgress = (course: Course) => {
    const completedLessons = course.lessons.filter((l) => l.completed).length;
    return Math.round((completedLessons / course.lessons.length) * 100);
  };

  // Calculate overall stats
  const totalLessons = courses.reduce(
    (acc, course) => acc + course.lessons.length,
    0,
  );
  const completedLessons = courses.reduce(
    (acc, course) => acc + course.lessons.filter((l) => l.completed).length,
    0,
  );
  const coursesInProgress = courses.filter((course) => {
    const progress = getProgress(course);
    return progress > 0 && progress < 100;
  }).length;
  const completedCourses = courses.filter(
    (course) => getProgress(course) === 100,
  ).length;
  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "in-progress") {
      const progress = getProgress(course);
      return matchesSearch && progress > 0 && progress < 100;
    }
    if (activeTab === "completed") {
      return matchesSearch && getProgress(course) === 100;
    }
    return matchesSearch;
  });

  const handleCourseClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView("course");
  };

  const handleLessonClick = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentView("lesson");
    setSelectedObjective(null);
  };

  const handleObjectiveClick = (objective: string) => {
    setSelectedObjective(objective);
    setCurrentView("objective");
  };

  const handleLessonComplete = () => {
    if (!selectedCourseId || !selectedLessonId) return;

    setCourses((prev) =>
      prev.map((course) =>
        course.id === selectedCourseId
          ? {
              ...course,
              lessons: course.lessons.map((lesson) =>
                lesson.id === selectedLessonId
                  ? { ...lesson, completed: !lesson.completed }
                  : lesson,
              ),
            }
          : course,
      ),
    );
  };

  const handleNextLesson = () => {
    if (!selectedCourse || !selectedLessonId) return;
    const currentIndex = selectedCourse.lessons.findIndex(
      (l) => l.id === selectedLessonId,
    );
    if (currentIndex < selectedCourse.lessons.length - 1) {
      setSelectedLessonId(selectedCourse.lessons[currentIndex + 1].id);
    }
  };

  const handlePreviousLesson = () => {
    if (!selectedCourse || !selectedLessonId) return;
    const currentIndex = selectedCourse.lessons.findIndex(
      (l) => l.id === selectedLessonId,
    );
    if (currentIndex > 0) {
      setSelectedLessonId(selectedCourse.lessons[currentIndex - 1].id);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedCourseId(null);
    setSelectedLessonId(null);
  };

  const handleBackToCourse = () => {
    setCurrentView("course");
    setSelectedLessonId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">LearnHub</h1>
                <p className="text-xs text-muted-foreground">
                  Your Learning Journey
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={currentView === "dashboard" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setCurrentView("dashboard")}
                title="Dashboard"
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
              <Button
                variant={currentView === "schedule" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setCurrentView("schedule")}
                title="Schedule"
              >
                <CalendarIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                {/* <User className="h-5 w-5" /> */}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard View */}
        {currentView === "dashboard" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
              <p className="text-muted-foreground">
                Continue your learning journey and track your progress
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                icon="trending"
                title="Overall Progress"
                value={`${overallProgress}%`}
                subtitle={`${completedLessons} of ${totalLessons} lessons completed`}
              />
              <StatsCard
                icon="book"
                title="Courses In Progress"
                value={coursesInProgress}
                subtitle={`${completedCourses} courses completed`}
              />
              <StatsCard
                icon="target"
                title="Active Courses"
                value={courses.length}
                subtitle="Available to learn"
              />
              <StatsCard
                icon="award"
                title="Achievements"
                value={completedCourses}
                subtitle="Courses completed"
              />
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  category={course.category}
                  duration={course.duration}
                  lessonsCount={course.lessons.length}
                  progress={getProgress(course)}
                  onClick={() => handleCourseClick(course.id)}
                />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No courses found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Schedule View */}
        {currentView === "schedule" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Learning Schedule</h2>
                <p className="text-muted-foreground">
                  Plan and track your study sessions.
                </p>
              </div>
              <Button onClick={() => setCurrentView("dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-card p-6 rounded-xl border shadow-sm">
                  <h3 className="font-semibold mb-4">Select Date</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow mx-auto"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-card p-6 rounded-xl border shadow-sm">
                  <h3 className="font-semibold mb-4">
                    Events for {date?.toLocaleDateString()}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">AI Foundational Skills</p>
                        <p className="text-sm text-muted-foreground">
                          10:00 AM - 11:30 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="bg-secondary text-secondary-foreground p-2 rounded-lg">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">React Hooks Deep Dive</p>
                        <p className="text-sm text-muted-foreground">
                          2:00 PM - 3:30 PM
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic text-center py-4">
                      No more events scheduled for this day.
                    </p>
                  </div>
                  <Button className="w-full mt-6" variant="outline">
                    Add New Study Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course View */}
        {currentView === "course" && selectedCourse && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={handleBackToDashboard}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {selectedCourse.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {selectedCourse.title}
                </h2>
                <p className="text-muted-foreground">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{selectedCourse.lessons.length} Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedCourse.duration}</span>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Course Progress</span>
                  <span className="text-2xl font-bold">
                    {getProgress(selectedCourse)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress(selectedCourse)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedCourse.lessons.filter((l) => l.completed).length} of{" "}
                  {selectedCourse.lessons.length} modules completed
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Course Modules</h3>
              {selectedCourse.lessons
                .filter(
                  (lesson) =>
                    lesson.id === "1-1" ||
                    lesson.id === "1-2" ||
                    lesson.id === "1-3" ||
                    lesson.id === "1-4" ||
                    lesson.id === "1-5" ||
                    lesson.id === "1-6" ||
                    (selectedCourse.id !== "1" &&
                      lesson.id.split("-").length === 2),
                )
                .filter((lesson) => lesson.id === "1-1" || lesson.id === "1-2" || lesson.id === "1-3" || lesson.id ==="1-4" || lesson.id === "1-5" || lesson.id ==="1-6" ||(selectedCourse.id !== "1" && lesson.id.split("-").length === 2))
                .filter(
                  (lesson) =>
                    lesson.id === "1-1" ||
                    lesson.id === "1-2" ||
                    lesson.id === "1-3" ||
                    lesson.id === "1-4" ||
                    lesson.id === "1-5" ||
                    lesson.id === "1-6" ||
                    (selectedCourse.id !== "1" &&
                      lesson.id.split("-").length === 2),
                )
                .map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    title={lesson.title}
                    duration={lesson.duration}
                    completed={lesson.completed}
                    isActive={lesson.id === selectedLessonId}
                    onClick={() => handleLessonClick(lesson.id)}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Lesson View */}
        {currentView === "lesson" && selectedLesson && selectedCourse && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={handleBackToCourse}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>

            <LessonContent
              title={selectedLesson.title}
              content={selectedLesson.content}
              objectives={selectedLesson.objectives}
              activities={selectedLesson.activities}
              completed={selectedLesson.completed}
              ShowCarPromptExample={selectedLesson.id === "1-3"}
              hasNext={
                selectedCourse.lessons.findIndex(
                  (l) => l.id === selectedLessonId,
                ) <
                selectedCourse.lessons.length - 1
              }
              hasPrevious={
                selectedCourse.lessons.findIndex(
                  (l) => l.id === selectedLessonId,
                ) > 0
              }
              onComplete={handleLessonComplete}
              onNext={handleNextLesson}
              onPrevious={handlePreviousLesson}
              onObjectiveClick={handleObjectiveClick}
            />
          </div>
        )}

        {/* Objective View */}
        {currentView === "objective" && selectedObjective && selectedLesson && (
          <div className="space-y-6">
            <ObjectiveView
              objective={selectedObjective}
              description={
                selectedLesson.objectiveDetails?.[selectedObjective]
                  ?.description ||
                "No description available for this objective."
              }
              lessonTitle={selectedLesson.title}
              onBack={() => setCurrentView("lesson")}
            />
          </div>
        )}
      </main>
    </div>
  );
}

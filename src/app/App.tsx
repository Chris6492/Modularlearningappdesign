import React, { useState } from "react";
import {
  ArrowLeft,
  GraduationCap,
  LayoutDashboard,
  Search,
  User,
  BookOpen,
  Clock,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { CourseCard } from "./components/CourseCard";
import { LessonItem } from "./components/LessonItem";
import { LessonContent } from "./components/LessonContent";
import { StatsCard } from "./components/StatsCard";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  objectives: string[];
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
    title: "Introduction to AI Software Development",
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
        completed: false,
      },
      
      {
        id: "1-1-3",
        title: "Learn core AI interaction patterns",
        duration: "25 min",
        content:
          "Effective interaction with AI requires moving beyond simple questions to structured interaction patterns. Patterns like 'Chain of Thought' prompting, where you ask the AI to explain its reasoning step-by-step, can lead to much more reliable complex code outputs. Another powerful pattern is the 'Flipped Interaction', where you ask the AI to interview you about your requirements before it generates any code.\n\nUnderstanding these interaction patterns allows developers to treat the AI as a junior partner rather than just a search engine. By providing clear constraints and using iterative refinement, you can guide the AI to produce production-ready code that adheres to your specific design patterns and architectural standards.",
        objectives: ["Chain of Thought Prompting", "Iterative Refinement"],
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
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "1-2-1",
        title: "Identify AI-generated code smells",
        duration: "15 min",
        content:
          "AI-generated code often exhibits specific 'smells' that differ from human-written errors. These include overly verbose logic, the use of deprecated library patterns, or perfectly syntactical code that is logically detached from the rest of the application. Developers must learn to recognize these patterns to prevent 'code bloat' and maintain a clean, readable codebase while leveraging AI assistance.\n\nCommon signs of AI-generated smells include repetitive variable naming and the inclusion of unnecessary utility functions that already exist in the project's standard library. By developing an eye for these specific issues, you can quickly filter out low-quality AI suggestions and focus on refining the outputs that actually add value to your project.",
        objectives: ["Redundancy Detection", "Pattern Consistency"],
        completed: false,
      },
      {
        id: "1-2-2",
        title: "Understand security risks in AI suggestions",
        duration: "20 min",
        content:
          "AI models can inadvertently suggest code that contains well-known security vulnerabilities, such as SQL injection points, insecure cryptographic defaults, or hardcoded secrets. Because the AI doesn't 'understand' security in the same way a human expert does, it might provide a solution that works but leaves the application exposed to attacks.\n\nIt is the developer's responsibility to perform a security audit on every piece of AI-suggested code before it is merged. This involves using automated linting tools and manual reviews focused on data validation and sanitization. Understanding these risks ensures that you use AI as a productivity booster without compromising the safety and integrity of your user data.",
        objectives: ["Vulnerability Auditing", "Secure Coding Standards"],
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
          "Write precise technical prompts",
          "Refine AI output through iterative prompting",
          "Build a library of effective developer prompts",
        ],
        completed: false,
      },
      {
        id: "1-3-1",
        title: "Master the Context-Action-Result structure",
        duration: "20 min",
        content:
          "The C.A.R. framework is designed to provide the AI with the three essential components it needs for high-quality output. 'Context' sets the stage by explaining the project environment and constraints; 'Action' defines exactly what the AI should do (e.g., 'Refactor this function'); and 'Result' specifies the desired format and characteristics of the final output.\n\nBy consistently using this structure, developers can eliminate the ambiguity that leads to poor AI performance. This systematic approach transforms prompting from a trial-and-error process into a predictable engineering discipline, ensuring that the AI understands not just 'what' to build, but 'how' it fits into your broader technical goals.",
        objectives: ["Component Breakdown", "Framework Application"],
        completed: false,
      },
      {
        id: "1-3-2",
        title: "Write precise technical prompts",
        duration: "15 min",
        content:
          "Precision in technical prompting is about using specific terminology and providing clear constraints. Instead of asking for 'a list', specify 'a React component that renders a virtualized list of items with search functionality'. Providing examples of desired inputs and outputs within the prompt can also significantly improve the AI's accuracy.\n\nTechnical precision also includes specifying the libraries and versions you are using, as well as any specific coding standards or design patterns required. This level of detail prevents the AI from making incorrect assumptions and ensures that the generated code is immediately compatible with your existing project structure.",
        objectives: ["Constraint Specification", "Terminology Accuracy"],
        activities: ["activity goes here"],
        completed: false,
      },
    ],
  },
  {
    id: "2",
    title: "React for Beginners",
    description:
      "Master the popular React library and build dynamic, interactive user interfaces.",
    category: "Frontend Framework",
    duration: "8 hours",
    lessons: [
      {
        id: "2-1",
        title: "Introduction to React",
        duration: "40 min",
        content:
          "React is a powerful JavaScript library for building user interfaces. Created by Facebook, it has become one of the most popular tools for frontend development.\n\nIn this introduction, you'll learn:\n- What is React and why use it?\n- Component-based architecture\n- Virtual DOM concepts\n- JSX syntax\n- Setting up your development environment\n\nReact revolutionized how we build web applications by introducing a component-based approach that makes code more reusable and maintainable.",
        objectives: [
          "Understand React's core concepts",
          "Set up a React development environment",
          "Learn JSX syntax and its benefits",
          "Create your first React component",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "2-2",
        title: "Components and Props",
        duration: "60 min",
        content:
          "Components are the building blocks of React applications. Learn how to create reusable components and pass data between them using props.\n\nTopics covered:\n- Function vs Class components\n- Props and prop validation\n- Component composition\n- Children props\n- Conditional rendering\n\nUnderstanding components and props is fundamental to building React applications. You'll learn how to break down complex UIs into manageable, reusable pieces.",
        objectives: [
          "Create functional and class components",
          "Pass and validate props",
          "Compose components effectively",
          "Implement conditional rendering",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "2-3",
        title: "State and Lifecycle",
        duration: "75 min",
        content:
          "State management is crucial for building interactive applications. Learn how to manage component state and understand the React lifecycle.\n\nKey concepts:\n- useState Hook\n- State vs Props\n- Lifting state up\n- useEffect Hook\n- Component lifecycle methods\n- Side effects and cleanup\n\nMastering state and lifecycle will enable you to build truly interactive and dynamic applications that respond to user input and external data.",
        objectives: [
          "Manage component state with hooks",
          "Understand state vs props",
          "Use useEffect for side effects",
          "Handle component lifecycle properly",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "2-4",
        title: "Handling Events",
        duration: "45 min",
        content:
          "Learn how to handle user interactions in React applications, from simple clicks to complex form submissions.\n\nWhat you'll learn:\n- Event handling in React\n- Synthetic events\n- Event binding\n- Form handling\n- Controlled components\n- Event pooling\n\nEvent handling in React is slightly different from vanilla JavaScript, but more consistent and powerful once you understand the patterns.",
        objectives: [
          "Handle various user events",
          "Create controlled form components",
          "Manage form state effectively",
          "Implement event handlers properly",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "2-5",
        title: "Building a React App",
        duration: "120 min",
        content:
          "Apply everything you've learned to build a complete React application. This project will incorporate components, state, props, and event handling.\n\nProject features:\n- Multi-component architecture\n- State management\n- User interactions\n- Data flow patterns\n- Styling React components\n- Deployment basics\n\nThis comprehensive project will tie together all the concepts you've learned and give you practical experience building a real-world React application.",
        objectives: [
          "Build a complete React application",
          "Implement proper component architecture",
          "Manage application state",
          "Style and deploy a React app",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
    ],
  },
  {
    id: "3",
    title: "Python Programming Essentials",
    description:
      "Learn Python from scratch and understand programming fundamentals with hands-on projects.",
    category: "Programming",
    duration: "10 hours",
    lessons: [
      {
        id: "3-1",
        title: "Python Basics",
        duration: "50 min",
        content:
          "Python is one of the most popular programming languages, known for its simplicity and versatility. It's used in web development, data science, automation, and more.\n\nIn this lesson:\n- Installing Python and setting up your environment\n- Python syntax and basic operations\n- Variables and data types\n- Input and output\n- Basic operators\n\nPython's clear syntax makes it an excellent first programming language, while its powerful libraries make it a tool that professionals use every day.",
        objectives: [
          "Set up Python development environment",
          "Understand Python syntax",
          "Work with variables and data types",
          "Write your first Python programs",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "3-2",
        title: "Control Flow and Logic",
        duration: "60 min",
        content:
          "Learn to control the flow of your programs using conditionals and loops, essential skills for any programmer.\n\nTopics:\n- If/elif/else statements\n- Boolean logic\n- For loops\n- While loops\n- Break and continue\n- List comprehensions\n\nControl flow allows your programs to make decisions and repeat tasks, making them dynamic and powerful.",
        objectives: [
          "Use conditional statements effectively",
          "Implement different types of loops",
          "Apply boolean logic",
          "Write efficient list comprehensions",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "3-3",
        title: "Functions and Modules",
        duration: "70 min",
        content:
          "Functions are reusable blocks of code that make your programs more organized and efficient. Learn to write functions and use Python's extensive module system.\n\nWhat you'll learn:\n- Defining functions\n- Parameters and arguments\n- Return values\n- Scope and namespaces\n- Built-in functions\n- Importing modules\n- Creating your own modules\n\nFunctions are fundamental to writing clean, maintainable code. Modules help you organize and reuse code across projects.",
        objectives: [
          "Write and call functions",
          "Use function parameters and returns",
          "Import and use modules",
          "Create custom modules",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "3-4",
        title: "Data Structures",
        duration: "80 min",
        content:
          "Master Python's powerful built-in data structures: lists, tuples, dictionaries, and sets.\n\nCoverage includes:\n- Lists and list methods\n- Tuples and their uses\n- Dictionaries for key-value storage\n- Sets for unique collections\n- Choosing the right data structure\n- Common operations and patterns\n\nUnderstanding data structures is crucial for solving programming problems efficiently and writing performant code.",
        objectives: [
          "Work with lists, tuples, and dictionaries",
          "Understand when to use each structure",
          "Perform common data operations",
          "Solve problems with appropriate structures",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "3-5",
        title: "Python Project: Data Analysis",
        duration: "150 min",
        content:
          "Build a complete Python project that analyzes data, creates visualizations, and generates reports.\n\nProject scope:\n- Reading data from files\n- Processing and analyzing data\n- Using libraries like pandas\n- Creating visualizations\n- Generating reports\n- Best practices and code organization\n\nThis hands-on project will give you practical experience and demonstrate how Python is used in real-world data analysis scenarios.",
        objectives: [
          "Build a complete Python application",
          "Work with external libraries",
          "Process and analyze data",
          "Create meaningful visualizations",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
    ],
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    description:
      "Discover the fundamentals of user interface and experience design to create beautiful, intuitive products.",
    category: "Design",
    duration: "5 hours",
    lessons: [
      {
        id: "4-1",
        title: "Introduction to UI/UX",
        duration: "40 min",
        content:
          "User Interface (UI) and User Experience (UX) design are crucial for creating products that people love to use. Learn the difference and why both matter.\n\nFoundational concepts:\n- What is UI vs UX?\n- The design thinking process\n- Understanding user needs\n- Design principles overview\n- Tools of the trade\n\nGood design is invisible - it makes complex tasks feel simple and intuitive. Learn how to create experiences that delight users.",
        objectives: [
          "Understand UI and UX fundamentals",
          "Learn the design thinking process",
          "Identify user needs",
          "Recognize good design principles",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "4-2",
        title: "Color Theory and Typography",
        duration: "55 min",
        content:
          "Master the visual fundamentals of design: color and typography. These elements create the mood, hierarchy, and personality of your designs.\n\nLearn about:\n- Color psychology\n- Color schemes and palettes\n- Typography basics\n- Font pairing\n- Visual hierarchy\n- Accessibility considerations\n\nThe right colors and fonts can make or break a design. Learn to choose and combine them effectively.",
        objectives: [
          "Apply color theory principles",
          "Create effective color schemes",
          "Choose appropriate typography",
          "Ensure accessibility",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "4-3",
        title: "Layout and Composition",
        duration: "60 min",
        content:
          "Learn to arrange elements effectively using proven layout principles and composition techniques.\n\nKey topics:\n- Grid systems\n- White space and balance\n- Visual weight and emphasis\n- Alignment and proximity\n- Responsive design principles\n- Mobile-first approach\n\nLayout determines how users navigate and understand your design. Master these principles to create clear, usable interfaces.",
        objectives: [
          "Use grid systems effectively",
          "Apply composition principles",
          "Create responsive layouts",
          "Balance visual elements",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "4-4",
        title: "User Research and Testing",
        duration: "50 min",
        content:
          "Great design is based on understanding real users. Learn research methods and testing techniques to validate your designs.\n\nMethods covered:\n- User interviews\n- Surveys and questionnaires\n- Usability testing\n- A/B testing\n- Analytics and metrics\n- Iterative design process\n\nUser research removes guesswork from design decisions and ensures you're building something people actually need and want.",
        objectives: [
          "Conduct user research",
          "Perform usability testing",
          "Analyze user feedback",
          "Iterate based on data",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
      {
        id: "4-5",
        title: "Design Project: Mobile App",
        duration: "120 min",
        content:
          "Apply all your UI/UX knowledge to design a complete mobile app from concept to high-fidelity mockups.\n\nProject phases:\n- User research and personas\n- Information architecture\n- Wireframing\n- Visual design\n- Prototyping\n- Presentation and documentation\n\nThis comprehensive project will give you a portfolio-ready case study demonstrating your UI/UX design skills.",
        objectives: [
          "Complete a full design project",
          "Apply research methods",
          "Create wireframes and mockups",
          "Build an interactive prototype",
        ],
        activities: ["activity goes here"],
        completed: false,
      },
    ],
  },
];

type View = "dashboard" | "course" | "lesson";

export default function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
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
                .filter((lesson) => lesson.id === "1-1" || lesson.id === "1-2" || lesson.id === "1-3" || (selectedCourse.id !== "1" && lesson.id.split("-").length === 2))
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
              onObjectiveClick={(objective) => {
                // Find a lesson that matches the objective
                const targetLesson = selectedCourse.lessons.find(
                  (l) => l.title.toLowerCase() === objective.toLowerCase(),
                );
                
                if (targetLesson) {
                  setSelectedLessonId(targetLesson.id);
                  setCurrentView("lesson");
                } else {
                  // Fallback to partial match if exact match not found
                  const partialMatch = selectedCourse.lessons.find(
                    (l) => l.title.toLowerCase().includes(objective.toLowerCase())
                  );
                  if (partialMatch) {
                    setSelectedLessonId(partialMatch.id);
                    setCurrentView("lesson");
                  }
                }
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}

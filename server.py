import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from app.backend.llm import get_llm_response

app = Flask(__name__)
CORS(app)

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email}


with app.app_context():
    db.create_all()


@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    try:
        new_user = User()
        new_user.username = data['username']
        new_user.email = data['email']
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        # Log the error for debugging
        print(f"Error creating user: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


# Existing course data
initial_courses = [
    {
        "id":
        "1",
        "title":
        "Software Development",
        "description":
        "Master the essentials of AI-assisted development, from foundational skills to advanced prompting frameworks and identifying bad practices.",
        "category":
        "AI Development",
        "duration":
        "4 hours",
        "lessons": [
            {
                "id":
                "1-1",
                "title":
                "AI Foundational Skills",
                "duration":
                "60 min",
                "content":
                "Explore the core concepts of AI in software development. Understand how Large Language Models work, their capabilities, and how to integrate them into your development workflow effectively.",
                "objectives": [
                    "Understand LLM basics for developers",
                    "Set up AI development tools",
                    "Learn core AI interaction patterns",
                    "Identify best use cases for AI assistance",
                ],
                "objectiveDetails": {
                    "Understand LLM basics for developers": {
                        "title":
                        "LLM Fundamentals",
                        "description":
                        "Deep dive into how Large Language Models work, tokenization, and their probabilistic nature.",
                    },
                    "Set up AI development tools": {
                        "title":
                        "Toolchain Configuration",
                        "description":
                        "Properly configuring your IDE and CLI tools to leverage AI assistance effectively.",
                    },
                    "Learn core AI interaction patterns": {
                        "title":
                        "Interaction Design",
                        "description":
                        "Mastering zero-shot, few-shot, and chain-of-thought prompting for better code generation.",
                    },
                    "Identify best use cases for AI assistance": {
                        "title":
                        "Value Recognition",
                        "description":
                        "Learning where AI excels and where human intervention is critical in the dev lifecycle.",
                    },
                },
                "activities": ["activity goes here"],
                "activityDescriptions": {
                    "activity goes here":
                    "This activity involves identifying specific code smells and vulnerabilities in AI-generated code. You will be presented with several snippets and must flag issues related to security, efficiency, and logical correctness."
                },
                "completed":
                False,
            },
            {
                "id":
                "1-1-1",
                "title":
                "Understand LLM basics for developers",
                "duration":
                "15 min",
                "content":
                "Large Language Models (LLMs) are a type of artificial intelligence trained on vast amounts of text data. For developers, understanding LLMs means recognizing they are probabilistic next-token predictors, not reasoning engines with consciousness. This fundamental distinction is crucial for setting realistic expectations and designing effective AI-integrated systems.\n\nWhen working with LLMs, developers should focus on their ability to handle unstructured data, perform translation tasks, and assist in code generation while being mindful of their limitations, such as hallucinations and context window constraints. Mastering the interface between deterministic code and probabilistic AI outputs is the key to building robust AI-enhanced applications.",
                "objectives": [
                    "Neural Network Foundations",
                    "Tokenization and Embeddings",
                ],
                "activities": ["activity goes here"],
                "completed":
                False,
            },
            {
                "id":
                "1-1-3",
                "title":
                "Learn core AI interaction patterns",
                "duration":
                "25 min",
                "content":
                "Effective interaction with AI requires moving beyond simple questions to structured interaction patterns. Patterns like 'Chain of Thought' prompting, where you ask the AI to explain its reasoning step-by-step, can lead to much more reliable complex code outputs. Another powerful pattern is the 'Flipped Interaction', where you ask the AI to interview you about your requirements before it generates any code.\n\nUnderstanding these interaction patterns allows developers to treat the AI as a junior partner rather than just a search engine. By providing clear constraints and using iterative refinement, you can guide the AI to produce production-ready code that adheres to your specific design patterns and architectural standards.",
                "objectives":
                ["Chain of Thought Prompting", "Iterative Refinement"],
                "activities": ["activity goes here"],
                "completed":
                False,
            },
            {
                "id":
                "1-2",
                "title":
                "AI Bad Coding Practices",
                "duration":
                "45 min",
                "content":
                "Learn to identify and avoid common pitfalls when using AI for coding. We'll cover over-reliance, hallucination checks, legal risks, and maintaining code quality.",
                "objectives": [
                    "Blindly trusting AI-generated code",
                    "Bad Prompting and Lack of Context",
                    "Over-Reliance",
                    "Licensing & ip risk",
                ],
                "objectiveDetails": {
                    "Blindly trusting AI-generated code": {
                        "title":
                        "",
                        "description":
                        "     Blindly trusting AI generated code can create subtle but serious problems, especially for new developers who may not yet recognize warning signs. AI models do not truly understand programming concepts, business logic, or project context; they generate code by predicting what looks correct based on patterns in data. Because of this, AI can confidently suggest deprecated functions, outdated syntax, or approaches that were once common but are no longer considered secure or efficient. The code may compile and even pass simple tests, giving a false sense of correctness while hiding deeper issues.                                                                                                                                                                                              These risks become more dangerous in real-world scenarios and edge cases. AI-generated code may fail under unusual inputs, ignore performance or security concerns, or reference libraries, methods, or APIs that don’t exist. New developers might assume the AI’s output is authoritative and skip documentation checks or testing, allowing bugs or vulnerabilities to slip into production. Treating AI as a helpful assistant rather than a trusted source of truth and validating its output through testing, reviews, and official documentation is essential for writing reliable, maintainable software.",
                    },
                    "Bad Prompting and Lack of Context": {
                        "title":
                        "",
                        "description":
                        "     Bad prompting and lack of context can significantly reduce the effectiveness of AI assisted coding and introduce new risks into the development process. When prompts are vague, incomplete, or poorly structured, AI tools may generate incorrect, insecure, or inefficient code that does not align with the intended requirements. Similarly, without sufficient context about the system architecture, dependencies, or constraints, the AI may make faulty assumptions that lead to integration issues or subtle bug.                                                                                                                                                                                       These problems are important because AI generated output is often trusted at face value, especially under time pressure. Code produced from weak prompts or limited context may pass initial review but fail in edge cases or conflict with existing design patterns. To mitigate this risk, developers should provide clear, detailed prompts and treat AI output as a starting point rather than a final solution, applying the same level of review, testing, and validation as they would for manually written code.",
                    },
                    "Over-Reliance": {
                        "title":
                        "",
                        "description":
                        "     Overreliance on AI occurs when individuals or organizations depend too heavily on AI tools without sufficient validation or critical oversight. In a software development context, this can lead developers to accept AI-generated code, designs, or explanations at face value, even when they are incomplete, inefficient, or subtly incorrect. Over time, this reduces active engagement in independent problem-solving and weakens core skills such as debugging, system design, and reasoning through edge cases. When developers stop questioning outputs, AI shifts from being an assistive tool to an unquestioned authority, increasing the risk of technical debt and hidden defects.                                                                                                                               Another major drawback of AI overreliance is the erosion of contextual and domain understanding. AI tools generate output based on patterns in data, not on a true understanding of a project’s unique constraints, business goals, or long-term architecture. Developers who rely too heavily on AI may miss important trade-offs related to performance, security, scalability, or maintainability. This is especially risky in complex systems, where blindly integrating AI-generated solutions can introduce vulnerabilities or misalignments that only surface in production. Without human judgment and review, small mistakes can scale into costly failures.                                                                                                                                                                                  Finally, excessive dependence on AI can limit professional growth and adaptability. Learning in software development comes from struggling with problems, making mistakes, and refining mental models over time. If AI is always used as the first and final step, developers may progress faster in the short term but plateau in the long term. This creates teams that can assemble solutions quickly but lack the deep expertise needed to innovate, troubleshoot novel issues, or operate effectively when AI tools are unavailable or incorrect. Used thoughtfully, AI should amplify human capability—not replace critical thinking, accountability, or learning.",
                    },
                    "Licensing & ip risk": {
                        "title":
                        "",
                        "description":
                        "     Using AI tools for coding introduces intellectual property (IP) risks, particularly when proprietary or sensitive code is shared with external AI systems. A real world example occurred when Samsung engineers unintentionally exposed confidential source code by submitting it to ChatGPT for assistance, raising concerns that such information could be retained or later surfaced through future queries. This highlights the risk of data leakage and the importance of clear internal policies around what code can be shared with AI tools, especially when those tools are hosted by third parties.                                                                                                                                                                                               There are also licensing and copyright considerations around AI generated code itself. In some cases, generated code may be considered derivative of copyrighted material used during an AI model’s training, which can create legal ambiguity around ownership and usage rights. Developers and organizations must be cautious to ensure that AI assisted outputs comply with open source licenses, fair use principles, and internal compliance standards to avoid unintended copyright violations or legal exposure.",
                    },
                },
                "activities": ["activity goes here"],
                "activityDescriptions": {
                    "activity goes here":
                    "This activity involves identifying specific code smells and vulnerabilities in AI-generated code. You will be presented with several snippets and must flag issues related to security, efficiency, and logical correctness."
                },
                "completed":
                False,
            },
            {
                "id":
                "1-3",
                "title":
                "AI C.A.R. Prompting Framework",
                "duration":
                "75 min",
                "content":
                "Master the C.A.R. (Context, Action, Result) prompting framework to get high-quality, relevant code from AI. Learn how to structure your requests for maximum efficiency and accuracy.",
                "objectives": [
                    "Master the Context-Action-Result structure",
                    "Senior Level Prompts Workflow",
                    "Refine AI output through iterative prompting",
                    "Build a library of effective developer prompts",
                ],
                "objectiveDetails": {
                    "Master the Context-Action-Result structure": {
                        "title":
                        "LLM Fundamentals",
                        "description":
                        """The C.A.R. Prompting Method (Context → Action → Result) is a practical framework developers use directly when talking to an LLM to unlock senior-level thinking while still producing junior-friendly execution. The core idea is simple: think like a senior engineer, execute like a junior, and let AI act as the multiplier. Instead of vague, low‑leverage prompts such as “fix this code” or “make this better,” C.A.R. forces structure, intent, and professional standards into the prompt itself. This structure mirrors how experienced developers naturally think about problems and how they communicate expectations during real code reviews.

The first part, Context, represents how senior developers frame problems before touching the keyboard. A developer with several years of experience understands where the code lives, why it exists, and what constraints it must operate under. Context includes the programming language, framework, and the purpose of the code, as well as non‑negotiable constraints such as readability, security, performance, and maintainability. It also defines the skill level of the original author, which is critical for shaping explanations. By explicitly stating that the AI should act as a senior engineer mentoring a junior developer, the model is guided to respond with clearer explanations, better judgment, and realistic trade‑offs instead of generic advice.

The second part, Action, reflects how senior engineers give instructions. Rather than asking only for an answer, seniors ask for process and reasoning. In C.A.R., the Action section tells the AI exactly how to approach the task: review the code, identify code smells, explain why each issue is a problem in simple terms, refactor step‑by‑step, and follow industry best practices. This mimics a real-world code review, where the goal is not just to fix the problem but to teach the developer how to think better next time. By breaking the work into explicit steps, the output becomes educational, structured, and easier for a junior developer to follow.

The final part, Result, captures what experienced developers actually care about once the code works. While juniors often focus on whether the code runs, seniors focus on maintainability, scalability, readability, and risk. The Result section instructs the AI to output clean, production‑ready code with comments that explain key decisions, describe how the solution would scale, and call out potential risks or edge cases. This ensures the response goes beyond surface‑level fixes and instead reflects how software is evaluated in professional environments.

When combined, Context, Action, and Result form a reusable prompt template that developers can apply to almost any task. A full C.A.R. prompt clearly defines the role of the AI as a senior mentor, specifies the technical environment, outlines the review and refactor process, and sets expectations for production‑quality output and learning outcomes. This makes the prompt itself a tool for skill development, not just a way to get an answer.

Without C.A.R., a junior developer might ask something like, “Can you fix this React code?” which typically results in shallow fixes, limited reasoning, and little long‑term learning. Using the C.A.R. method, the same developer instead provides structured context about the component’s purpose, constraints such as handling loading and error states, and explicit actions like identifying issues and explaining trade‑offs. The result is a higher‑leverage interaction where the AI delivers senior‑level insights, clearer code, and concrete lessons the junior can apply in future work. In practice, C.A.R. is not hidden logic or backend magic—it is simply a disciplined way of writing prompts that turns AI into a realistic senior engineer sitting next to you during a code review.""",
                    },
                    "Senior Level Prompts Workflow": {
                        "title":
                        "LLM Fundamentals",
                        "description":
                        """DAILY WORKFLOW (REALISTIC & HIGH-IMPACT)
1️⃣ Context Sync (5–10 min)
Why seniors do this: avoid thrash & rework.
What YOU do
• Skim commits, issues, failing tests, logs
AI Prompt
“Given this repo state, recent commits, and open issues:
summarize current risks, technical debt, and the most impactful next action.”
Outcome
• You work on risk, not random tasks
• AI surfaces hidden dependencies
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
• Write one paragraph explaining why you chose that option
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
• Tight coupling (what things would break if this changed?)
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
“What did I debug this week that reveals a knowledge gap?”""",
                    },
                    "Refine AI output through iterative prompting": {
                        "title":
                        "LLM Fundamentals",
                        "description":
                        "Deep dive into how Large Language Models work, tokenization, and their probabilistic nature.",
                    },
                    "Build a library of effective developer prompts": {
                        "title": "LLM Fundamentals",
                        "description": "all good.",
                    },
                },
                "exampleType":
                "carPrompt",
                "activities": [],
                "completed":
                False,
            },
            {
                "id":
                "1-4",
                "title":
                "AI Tools For Software Development",
                "duration":
                "20 min",
                "content":
                "",
                "objectives": [
                    "Learning the core capabilities of each AI Tool",
                    "Terminology Accuracy",
                ],
                "objectiveDetails": {
                    "Learning the core capabilities of each AI Tool": {
                        "title":
                        "LLM Fundamentals",
                        "description":
                        """Google Antigravity
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
• Best For: General coding assistance, creative tasks, and UI prototyping.""",
                    },
                },
                "activities": ["activity goes here"],
                "completed":
                False,
            },
            {
                "id":
                "1-5",
                "title":
                "AI Generated Testing",
                "duration":
                "20 min",
                "content":
                "N/A",
                "objectives":
                ["Unit Testing", "Integration Testing", "Generating Test"],
                "objectiveDetails": {
                    "Unit Testing": {
                        "title":
                        "Unit Testing",
                        "description":
                        "     Unit testing is a software development practice where individual pieces of code usually small functions or methods are tested in isolation to make sure they work as intended. Each unit test focuses on a single behavior, providing specific inputs and checking that the output matches expectations. This isolation is crucial because it helps developers find and fix bugs quickly, without having to worry about how other parts of the system might be interfering. For juniors, writing unit tests is one of the best ways to learn how to write better, more modular code, as it forces them to think about edge cases and clear interfaces. Beyond finding bugs, unit tests also serve as a form of living documentation, showing how code is supposed to behave, which makes the codebase easier to understand and maintain over time.",
                    }
                },
                "activities": ["activity goes here"],
                "completed":
                False,
            },
            {
                "id": "1-6",
                "title": "AI VS Automation VS Search",
                "duration": "15 min",
                "content": "N/A",
                "objectives": ["N/A", "N/A"],
                "activities": ["activity goes here"],
                "completed": False,
            },
        ],
    },
]


@app.route('/api/courses', methods=['GET'])
def get_courses():
    return jsonify(initial_courses)


@app.route('/api/courses/<course_id>', methods=['GET'])
def get_course(course_id):
    course = next((c for c in initial_courses if c['id'] == course_id), None)
    if course:
        return jsonify(course)
    return jsonify({"error": "Course not found"}), 404


@app.route("/api/generate", methods=["POST"])
def generate_code():
    try:
        data = request.json
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400
        
        response = get_llm_response(prompt)
        return jsonify({'response': response}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

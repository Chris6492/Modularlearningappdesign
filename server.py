from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

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
courses = [{
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
    "lessons": [{
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
            "Identify best use cases for AI assistance"
        ],
        "objectiveDetails": {
            "Understand LLM basics for developers": {
                "title":
                "LLM Fundamentals",
                "description":
                "Deep dive into how Large Language Models work, tokenization, and their probabilistic nature."
            },
            "Set up AI development tools": {
                "title":
                "Toolchain Configuration",
                "description":
                "Properly configuring your IDE and CLI tools to leverage AI assistance effectively."
            },
            "Learn core AI interaction patterns": {
                "title":
                "Interaction Design",
                "description":
                "Mastering zero-shot, few-shot, and chain-of-thought prompting for better code generation."
            },
            "Identify best use cases for AI assistance": {
                "title":
                "Value Recognition",
                "description":
                "Learning where AI excels and where human intervention is critical in the dev lifecycle."
            }
        },
        "activities": ["Experiment with LLM APIs", "Configure IDE extensions"],
        "completed":
        False
    }, {
        "id":
        "1-1-1",
        "title":
        "Understand LLM basics for developers",
        "duration":
        "15 min",
        "content":
        "Large Language Models (LLMs) are a type of artificial intelligence trained on vast amounts of text data. For developers, understanding LLMs means recognizing they are probabilistic next-token predictors, not reasoning engines with consciousness. This fundamental distinction is crucial for setting realistic expectations and designing effective AI-integrated systems.\n\nWhen working with LLMs, developers should focus on their ability to handle unstructured data, perform translation tasks, and assist in code generation while being mindful of their limitations, such as hallucinations and context window constraints. Mastering the interface between deterministic code and probabilistic AI outputs is the key to building robust AI-enhanced applications.",
        "objectives":
        ["Neural Network Foundations", "Tokenization and Embeddings"],
        "activities":
        ["Analyze tokenization outputs", "Compare embedding distances"],
        "completed":
        False
    }, {
        "id":
        "1-1-3",
        "title":
        "Learn core AI interaction patterns",
        "duration":
        "25 min",
        "content":
        "Effective interaction with AI requires moving beyond simple questions to structured interaction patterns. Patterns like 'Chain of Thought' prompting, where you ask the AI to explain its reasoning step-by-step, can lead to much more reliable complex code outputs. Another powerful pattern is the 'Flipped Interaction', where you ask the AI to interview you about your requirements before it generates any code.\n\nUnderstanding these interaction patterns allows developers to treat the AI as a junior partner rather than just a search engine. By providing clear constraints and using iterative refinement, you can guide the AI to produce production-ready code that adheres to your specific design patterns and architectural standards.",
        "objectives": ["Chain of Thought Prompting", "Iterative Refinement"],
        "activities":
        ["Practice CoT prompts", "Implement flipped interactions"],
        "completed":
        False
    }, {
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
            "Bad Prompting and Lack of Context", "Over-Reliance",
            "Licensing & ip risk"
        ],
        "objectiveDetails": {
            "Blindly trusting AI-generated code": {
                "title":
                "Validation Necessity",
                "description":
                "Blindly trusting AI generated code can create subtle but serious problems, especially for new developers who may not yet recognize warning signs. AI models do not truly understand programming concepts, business logic, or project context; they generate code by predicting what looks correct based on patterns in training data. Treating AI as a helpful assistant rather than a trusted source of truth is essential."
            },
            "Bad Prompting and Lack of Context": {
                "title":
                "Contextual Integrity",
                "description":
                "Bad prompting and lack of context can significantly reduce the effectiveness of AI assisted coding. When prompts are vague or incomplete, AI tools may generate incorrect or inefficient code. Providing clear, detailed prompts is critical for aligning AI output with requirements."
            },
            "Over-Reliance": {
                "title":
                "Skill Erosion Risks",
                "description":
                "Overreliance occurs when developers depend too heavily on AI without critical oversight. This can lead to accepting inefficient code and weakening core skills like debugging and system design. Maintaining human judgment is vital for long-term project health."
            },
            "Licensing & ip risk": {
                "title":
                "Legal Compliance",
                "description":
                "Using AI tools introduces intellectual property risks. Proprietary code shared with external AI systems can lead to data leakage. Organizations must ensure AI outputs comply with open source licenses and internal standards."
            }
        },
        "activities": [
            "Review AI code for hallucinations",
            "Identify missing context in prompts"
        ],
        "completed":
        False
    }, {
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
            "Build a library of effective developer prompts"
        ],
        "objectiveDetails": {
            "Master the Context-Action-Result structure": {
                "title":
                "C.A.R. Framework",
                "description":
                "The C.A.R. Prompting Method (Context → Action → Result) is a practical framework developers use to unlock senior-level thinking. Context frames the problem and constraints. Action specifies the exact steps for the AI. Result defines the expected quality and educational outcomes."
            },
            "Senior Level Prompts Workflow": {
                "title":
                "Developer Workflow",
                "description":
                "Daily routines like Context Sync, Requirement Clarification, and Failure-First Testing ensure AI is used strategically. This includes using AI for self-code review to level up skills and identifying technical debt early."
            }
        },
        "exampleType":
        "carPrompt",
        "activities":
        ["Create a C.A.R. prompt", "Perform an AI-assisted code review"],
        "completed":
        False
    }, {
        "id":
        "1-4",
        "title":
        "AI Tools For Software Development",
        "duration":
        "20 min",
        "content":
        "Overview of major AI tools and IDEs.",
        "objectives": [
            "Learning the core capabilities of each AI Tool",
            "Terminology Accuracy"
        ],
        "objectiveDetails": {
            "Learning the core capabilities of each AI Tool": {
                "title":
                "Tool Landscape",
                "description":
                "Exploration of Google Antigravity (agent-first IDE), Anthropic Claude (reliable production code), Google Gemini (multimodal understanding), and OpenAI GPT (broad integration)."
            }
        },
        "activities":
        ["Compare Claude vs GPT outputs", "Test Gemini's context window"],
        "completed":
        False
    }]
}]


@app.route('/api/courses')
def get_courses():
    return jsonify(courses)


if __name__ == '__main__':
    app.run(host='localhost', port=8000)

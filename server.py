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
courses = [
    {
        "id": "1",
        "title": "Software Development",
        "description": "Master the essentials of AI-assisted development, from foundational skills to advanced prompting frameworks and identifying bad practices.",
        "category": "AI Development",
        "duration": "4 hours",
        "lessons": [
            {
                "id": "1-1",
                "title": "AI Foundational Skills",
                "duration": "60 min",
                "content": "Explore the core concepts of AI in software development. Understand how Large Language Models work, their capabilities, and how to integrate them into your development workflow effectively.",
                "objectives": [
                    "Understand LLM basics for developers",
                    "Set up AI development tools",
                    "Learn core AI interaction patterns",
                    "Identify best use cases for AI assistance"
                ],
                "objectiveDetails": {
                    "Understand LLM basics for developers": {
                        "title": "LLM Fundamentals",
                        "description": "Deep dive into how Large Language Models work, tokenization, and their probabilistic nature."
                    }
                },
                "activities": ["Read about Transformers", "Experiment with tokenizers"],
                "completed": False
            }
        ]
    }
]

@app.route('/api/courses')
def get_courses():
    return jsonify(courses)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)

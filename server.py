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
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

# Existing course data
courses = [
    {
        "id": "1",
        "title": "Software Development (via Python)",
        "description": "Master the essentials of AI-assisted development...",
        "category": "AI Development",
        "duration": "4 hours",
        "lessons": []
    }
]

@app.route('/api/courses')
def get_courses():
    return jsonify(courses)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)

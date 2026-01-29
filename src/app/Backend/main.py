import os
from openai import OpenAI

# This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
# the newest OpenAI model is "gpt-5" which was released August 7, 2025.
# do not change this unless explicitly requested by the user
client = OpenAI(
    api_key=os.environ.get("AI_INTEGRATIONS_OPENAI_API_KEY"),
    base_url=os.environ.get("AI_INTEGRATIONS_OPENAI_BASE_URL")
)

def get_llm_response(prompt_text):
    response = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "system", "content": "Instruction: I need you to generate a block of bad code in Python that contains at least one security vulnerability. The code should be functional but intentionally flawed for educational purposes."},
            {"role": "user", "content": prompt_text}
        ],
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    res = get_llm_response("Generate bad Python code with a security vulnerability.")
    print(res)

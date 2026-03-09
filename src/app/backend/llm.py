import os
import json
from openai import OpenAI

api_key = os.environ.get("AI_INTEGRATIONS_OPENAI_API_KEY")
base_url = os.environ.get("AI_INTEGRATIONS_OPENAI_BASE_URL")

if not api_key:
    raise ValueError("AI_INTEGRATIONS_OPENAI_API_KEY not found in environment variables")

client = OpenAI(api_key=api_key, base_url=base_url)

def get_llm_response(prompt_text):
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You generate secure coding exercises. "
                        "Return ONLY valid JSON. No explanations outside JSON."
                    ),
                },
                {
                    "role": "user",
                    "content": f"""
            Generate:
            1. Vulnerable Python code with a security issue.
            2. Four fix options.
            3. Exactly one must be correct.
            4. Return ONLY valid JSON in this format:

            {{
            "vulnerableCode": "string",
            "options": [
            {{
            "id": "1",
            "code": "string",
            "isCorrect": false,
            "explanation": "string"
            }}
            ]
            }}

            User instruction:
            {prompt_text}
            """,
                },
            ],
            response_format={ "type": "json_object" }
        )

        content = response.choices[0].message.content

        if content is None:
            raise ValueError("LLM returned empty content")
        
        parsed = json.loads(content)

        return parsed
        
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        raise

if __name__ == "__main__":
    res = get_llm_response("Generate bad Python code with a security vulnerability.")
    print(res)

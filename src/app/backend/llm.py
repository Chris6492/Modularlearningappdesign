import os
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
                {"role": "system", "content": "Instruction: I need you to generate a block of bad code in Python that contains at least one security vulnerability. The code should be functional but intentionally flawed for educational purposes."},
                {"role": "user", "content": prompt_text}
            ],
        )
        print("OpenAI API Response:", response)
        return response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        raise

if __name__ == "__main__":
    res = get_llm_response("Generate bad Python code with a security vulnerability.")
    print(res)

import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

client = OpenAI(api_key=api_key)

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

from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

client = OpenAI()

def get_llm_response(prompt_text):
    response = client.chat.completions.create(
        model="gpt-4.1-nano",
        messages=[
            {"role": "system", "content": "Instruction: I need you to generate a block of bad code in Python that contains at least one security vulnerability. The code should be functional but intentionally flawed for educational purposes."},
            {"role": "user", "content": prompt_text}
        ],
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    res = get_llm_response("Generate bad Python code with a security vulnerability.")
    print(res)

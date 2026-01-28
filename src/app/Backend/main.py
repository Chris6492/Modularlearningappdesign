from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import os

api_key = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(model="gpt-4.1-nano")

prompt = ChatPromptTemplate.from_messages([
    ("system", "Instruction: I need you to generate a block of bad code in Python that contains at least one security vulnerability. The code should be functional but intentionally flawed for educational purposes."),
    ("user", "{input}")
])

chain = prompt | llm
res = chain.invoke({"input": "Generate bad Python code with a security vulnerability."})
print(api_key)
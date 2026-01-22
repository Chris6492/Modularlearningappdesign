export function CarPromptExample() {
  const carPrompt = {
    context: `You are a senior React engineer mentoring a junior developer.

Language: JavaScript
Framework: React
Purpose: This component fetches data from an API and renders a list.
Constraints:
- Must be readable and maintainable
- Must handle loading and error states
- Must follow React best practices
- Code was written by a junior developer`,

    action: `1. Review the component and identify code smells
2. Explain each issue in simple terms
3. Refactor the component step-by-step
4. Follow industry best practices
5. Explain trade-offs made during refactoring`,

    result: `- Provide clean, production-ready React code
- Include comments explaining key decisions
- Explain why the refactored version is better
- Describe how this approach scales
- List lessons a junior developer should learn`
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Senior-Level C.A.R. Prompt Example</h2>

      {Object.entries(carPrompt).map(([section, content]) => (
        <div key={section} className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium capitalize mb-2">{section}</h3>
          <pre className="whitespace-pre-wrap text-sm">{content}</pre>
        </div>
      ))}
    </div>
  );
}

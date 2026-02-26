import { useState } from "react";

export function CustomPromptActivity() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await res.json();
      setOutput(data.content);

    } catch (error) {
      console.error(error);
      setOutput("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Custom Prompt Code Generator</h2>

      <textarea
        rows={5}
        style={{ width: "100%", marginBottom: "1rem" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter any prompt to generate code..."
      />

      <button onClick={generateCode} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <pre
        style={{
          marginTop: "1rem",
          background: "#111",
          color: "#0f0",
          padding: "1rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {output}
      </pre>
    </div>
  );
}
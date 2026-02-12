import { useState } from "react";

export function LLMCodeGenerator({ onCodeGenerated }: { onCodeGenerated: (code: string) => void }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    setLoading(true);
    const res = await fetch("/api/generate_v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt:input }),
    });

    const data = await res.json();
    const generatedCode = data.response || data.content;
    setOutput(generatedCode);
    onCodeGenerated(generatedCode);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>LLM Code Generator</h2>

      <textarea
        rows={4}
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt..."
      />

      <button onClick={generateCode} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <pre style={{ marginTop: "1rem", background: "#111", color: "#0f0", padding: "1rem" }}>
        {output}
      </pre>
    </div>
  );
}
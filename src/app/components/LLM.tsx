import { useState } from "react";

export interface Option {
  id: string;
  code: string;
  isCorrect: boolean;
  explanation: string;
}

interface LLMResponse {
  vulnerableCode: string;
  options: Option[];
}

interface LLMCodeGeneratorProps {
  prompt: string;
  onCodeGenerated: (data: { code: string; options: Option[] }) => void;
}

export function LLMCodeGenerator({ 
  onCodeGenerated,
  prompt,
}: LLMCodeGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCode = async () => {
    setLoading(true);
    setError(null);

    
    const res = await fetch("/api/generate_v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt}),
    });

    const data: LLMResponse = await res.json();
   
    onCodeGenerated({
      code:data.vulnerableCode,
      options: data.options
    });
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>LLM Code Generator</h2>

      <button onClick={generateCode} disabled={loading} className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 disabled:opacity-50">
        {loading ? "Generating..." : "Generate"}
      </button>

    </div>
  );
}
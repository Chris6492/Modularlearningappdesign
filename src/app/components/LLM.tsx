import { useState } from "react";

export interface Option {
  id: string;
  code: string;
  isCorrect: boolean;
  explanation: string;
}

interface LLMResponse {
  vulnerableCode?: string;
  options?: Option[];
  response?: {
    vulnerableCode: string;
    options: Option[];
  };
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

    try {
      const res = await fetch("/api/generate_v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data: LLMResponse = await res.json();
      console.log("LLM Response:", data);
      
      const parsedData = data.response ? data.response : data;
      
      if (!parsedData.vulnerableCode || !Array.isArray(parsedData.options)) {
        console.error("Structure check failed:", parsedData);
        throw new Error("Invalid AI response structure");
      }

      onCodeGenerated({
        code: parsedData.vulnerableCode,
        options: parsedData.options,
      });
    } catch (err) {
      console.error("LLM Error:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
    };

    return (
    <div className="space-y-4">
      <button
        onClick={generateCode}
        disabled={loading}
        className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Code"}
      </button>

      {error && (
        <div className="text-red-600 text-sm">
          Error generating activity: {error}
        </div>
      )}
    </div>
    );

}
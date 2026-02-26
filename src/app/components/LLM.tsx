import { useState } from "react";

interface LLMCodeGeneratorProps {
  onGenerate: () => Promise<void> | void;
  canGenerate: boolean;
}

export function LLMCodeGenerator({
  onGenerate,
  canGenerate,
}: LLMCodeGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);

    try {
      await onGenerate(); // Parent controls API logic
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={handleClick}
        disabled={!canGenerate || loading}
        className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? "Generating..." : "Generate Code"}
      </button>

      {error && (
        <div className="text-red-600 text-sm text-center">
          Error generating activity: {error}
        </div>
      )}
    </div>
  );
}

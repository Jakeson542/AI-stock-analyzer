import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: input })
      });

      const data = await response.json();
      setResult(data.content || "No response from AI.");
    } catch (error) {
      setResult("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 600, margin: "3rem auto", padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>📈 Stock Analyzer AI</h1>

      <form onSubmit={handleAnalyze}>
        <input
          type="text"
          placeholder="Enter stock ticker (e.g., AAP)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
        <button
          type="submit"
          disabled={loading || !input}
          style={{
            padding: "0.6rem 1.5rem",
            fontSize: "1rem",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "1rem", borderRadius: "5px" }}>
          {result}
        </div>
      )}
    </main>
  );
}

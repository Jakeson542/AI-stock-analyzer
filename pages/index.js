import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setResult(data.content || "No result");
    } catch (error) {
      setResult("Error: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Stock Analyzer AI</h1>
      <form onSubmit={handleAnalyze}>
        <input
          type="text"
          placeholder="Enter stock ticker or name (e.g., AAP)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          required
        />
        <button type="submit" disabled={loading} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>{result}</div>
    </div>
  );
}

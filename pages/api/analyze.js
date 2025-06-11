export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    // Example: simple echo response
    const result = `Analyzing stock ticker: ${prompt}`;

    res.status(200).json({ content: result });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

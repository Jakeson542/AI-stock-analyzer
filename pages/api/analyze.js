export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Analyze stock ticker: ${prompt}`,
            },
          ],
        }),
      });

      const data = await openaiRes.json();

      if (openaiRes.ok) {
        const aiMessage = data.choices?.[0]?.message?.content || "No response from OpenAI.";
        res.status(200).json({ content: aiMessage });
      } else {
        res.status(500).json({ error: data.error?.message || "OpenAI API error" });
      }

    } catch (err) {
      res.status(500).json({ error: err.message || "Request failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

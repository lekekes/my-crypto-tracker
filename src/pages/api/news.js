export default async function handler(req, res) {
  try {
    const { searchQuery = "cryptocurrency", language = "de" } = req.query;

    const apiKey = process.env.NEWSAPI_API_KEY;
    if (!apiKey) {
      console.error("Fehler: API-Schlüssel fehlt.");
      res.status(500).json({ error: "API-Schlüssel fehlt." });
      return;
    }

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        searchQuery
      )}&sortBy=popularity&pageSize=10&language=${language}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Fehler beim Abrufen der Nachrichten:", errorData);
      res.status(500).json({ error: "Fehler beim Abrufen der Nachrichten." });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Interner Serverfehler:", error.message);
    res.status(500).json({ error: error.message || "Unbekannter Fehler." });
  }
}

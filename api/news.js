export default async function handler(req, res) {
  // 1. Configure CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // 2. Extraia parâmetros da query
  const { q } = req.query;

  try {
    // 3. Faça a requisição para a NewsAPI
    const apiResponse = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${process.env.VITE_NEWS_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.VITE_NEWS_API_KEY
        }
      }
    );

    // 4. Trate erros da API
    if (!apiResponse.ok) {
      throw new Error(`NewsAPI error: ${apiResponse.statusText}`);
    }

    // 5. Retorne os dados para o frontend
    const data = await apiResponse.json();
    res.status(200).json(data);

  } catch (error) {
    // 6. Trate erros globais
    res.status(500).json({
      error: "Erro ao buscar notícias",
      details: error.message
    });
  }
}
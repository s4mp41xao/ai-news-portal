useEffect(() => {
  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=artificial+intelligence&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': import.meta.env.VITE_NEWS_API_KEY
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`)
      }

      const data = await response.json()
      setNews(data.articles)
    } catch (error) {
      console.error('Erro na requisição:', error)
      setError(error.message)
    }
  }

  fetchNews()
}, [])

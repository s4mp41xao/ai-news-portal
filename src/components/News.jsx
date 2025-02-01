import { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert
} from '@mui/material'

export default function News() {
  // <- Exportação default corrigida
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

        if (data.status !== 'ok') {
          throw new Error('Resposta inválida da API')
        }

        setNews(data.articles)
      } catch (error) {
        console.error('Erro na requisição:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <CircularProgress
        sx={{
          display: 'block',
          margin: '40px auto'
        }}
      />
    )
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          maxWidth: 500,
          margin: '40px auto'
        }}
      >
        Erro ao carregar notícias: {error}
      </Alert>
    )
  }

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {news.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component="img"
              height="200"
              image={article.urlToImage || '/placeholder.jpg'}
              alt={article.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {article.description?.substring(0, 150)}...
              </Typography>
              <Button
                href={article.url}
                target="_blank"
                rel="noopener"
                variant="contained"
                sx={{ mt: 'auto' }}
              >
                Ler Completo
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

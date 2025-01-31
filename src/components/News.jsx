import { useEffect, useState } from 'react'
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=artificial+intelligence&apiKey=${
            import.meta.env.VITE_NEWS_API_KEY
          }`
        )
        const data = await response.json()
        setNews(data.articles)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) return <Typography>Loading news...</Typography>

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {news.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={article.urlToImage || '/placeholder.jpg'}
              alt={article.title}
            />
            <CardContent>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {article.description}
              </Typography>
              <Button
                href={article.url}
                target="_blank"
                rel="noopener"
                sx={{ mt: 2 }}
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

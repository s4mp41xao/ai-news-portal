import { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar
} from '@mui/material'
import { auth } from '../firebase'

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news?q=artificial+intelligence`)

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
    return <CircularProgress sx={{ mt: 4, mx: 'auto', display: 'block' }} />
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4, maxWidth: 500, mx: 'auto' }}>
        {error}
      </Alert>
    )
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          mb: 4,
          width: '100vw',
          left: 0,
          right: 0
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bem-vindo, {auth.currentUser?.email}
          </Typography>
          <Button
            color="inherit"
            onClick={() => auth.signOut()}
            sx={{ textTransform: 'none' }}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Grid
        container
        spacing={3}
        sx={{
          p: 3,
          maxWidth: 1200,
          mx: 'auto',
          justifyContent: 'center'
        }}
      >
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
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    zIndex: 1
                  }}
                >
                  Ler Completo
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

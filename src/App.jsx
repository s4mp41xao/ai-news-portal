import { CssBaseline, Container, CircularProgress } from '@mui/material'
import Auth from './components/Auth'
import News from './components/News'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import { DarkMode } from '@mui/icons-material'

export default function App() {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress size={60} />
      </Container>
    )
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <CssBaseline />
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        AI News Portal
        <DarkMode />
      </h1>
      {!user ? <Auth /> : <News />}
    </Container>
  )
}

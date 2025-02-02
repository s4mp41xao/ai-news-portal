import { CssBaseline, Container, CircularProgress } from '@mui/material'
import Auth from './components/Auth'
import News from './components/News'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'

export default function App() {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
      >
        <CircularProgress size={60} />
      </Container>
    )
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">{!user ? <Auth /> : <News />}</Container>
    </>
  )
}

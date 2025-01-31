import { CssBaseline, Container } from '@mui/material'
import Auth from './components/Auth'
import News from './components/News'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'

export default function App() {
  const [user] = useAuthState(auth)

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <h1>AI News Portal</h1>
        <Auth />
        {user && <News />}
      </Container>
    </>
  )
}

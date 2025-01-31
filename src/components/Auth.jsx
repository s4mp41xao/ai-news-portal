import { useState } from 'react'
import {
  useAuthState,
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword
} from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { Button, TextField, Box, Typography } from '@mui/material'

export default function Auth() {
  const [user] = useAuthState(auth)
  const [signInWithGoogle] = useSignInWithGoogle(auth)
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async e => {
    e.preventDefault()
    await createUserWithEmailAndPassword(email, password)
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      {!user ? (
        <>
          <Button
            variant="contained"
            onClick={() => signInWithGoogle()}
            fullWidth
          >
            Sign in with Google
          </Button>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Or register with email
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
              Register
            </Button>
          </form>
        </>
      ) : (
        <Button variant="contained" onClick={() => auth.signOut()} fullWidth>
          Sign Out
        </Button>
      )}
    </Box>
  )
}

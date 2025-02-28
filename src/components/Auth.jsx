import React from 'react'
import { Button } from '@mui/material'
import DarkMode from './DarkMode'

import { useState } from 'react'

import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle
} from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import {
  TextField,
  Box,
  Typography,
  Divider,
  Alert,
  Collapse,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth)

  const [signInWithGoogle] = useSignInWithGoogle(auth)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      return setError('Preencha todos os campos')
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(email, password)
      } else {
        await createUserWithEmailAndPassword(email, password)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h5" gutterBottom>
        {isLogin ? 'Acesse sua conta' : 'Crie uma conta'}
      </Typography>

      <DarkMode />
      <Collapse in={!!error}>
        <Alert
          severity="error"
          action={
            <IconButton size="small" onClick={() => setError('')}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit}>
        <TextField
          label="E-mail"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          inputProps={{ minLength: 6 }}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </Button>
      </form>

      <Divider sx={{ my: 3 }}>OU</Divider>

      <Button
        variant="outlined"
        onClick={handleGoogleSignIn}
        fullWidth
        sx={{ mb: 2 }}
      >
        Continue com Google
      </Button>

      <Typography variant="body2" textAlign="center">
        {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
        <Button
          size="small"
          onClick={() => setIsLogin(!isLogin)}
          sx={{ textTransform: 'none' }}
        >
          {isLogin ? 'Criar conta' : 'Fazer login'}
        </Button>
      </Typography>
    </Box>
  )
}

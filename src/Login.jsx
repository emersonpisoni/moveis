import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { http } from './api/api';
import { toast, Toaster } from "react-hot-toast";
import Logo from './assets/images/mobdonate.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Mobdonate © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export function Login() {
  const { login } = http()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await login(data.get('email'), data.get('password'))
      localStorage.setItem('userId', response.data.id)
      navigate('/')
    } catch (error) {
      toast.error('Email ou Senha inválidos!')
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img src={Logo} alt='logo login' style={{ width: '400px', marginBottom: '20px' }} />
          {/* <Typography component="h1" variant="h5">
            Área de acesso móveis dus guri
          </Typography> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logar
            </Button>
            <Box>
              Se ainda não possui uma conta <Link preventScrollReset to='/register'>Registre-se</Link>
            </Box>
            <Link to='/'>
              Continuar sem login
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
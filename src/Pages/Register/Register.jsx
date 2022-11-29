import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import { Copyright } from "@mui/icons-material";
import { useState } from "react";
import { http } from "../../api/api";
import { toast, Toaster } from "react-hot-toast";

export function Register() {
  const [user, setUser] = useState({})
  const { createUser } = http()
  const navigate = useNavigate()

  function handleChange({ target }) {
    let value = target.value

    if (target.name === 'telefone') {
      value = value.replace(/\D/g, '')
      value = value.replace(/(\d{2})(\d)/, "($1) $2")
      value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    }

    setUser({ ...user, [target.name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await createUser(user)
      localStorage.setItem('userId', response.data.id)

      toast.success('Usuário Criado!')
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error('Algo deu Errado!')
    }
  }

  return <Container component="main" maxWidth="xs">
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Criar Usuário
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          value={user.nome}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="nome"
          autoFocus
        />
        <TextField
          value={user.email}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
        />
        <TextField
          value={user.telefone}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          id="telefone"
          label="Telefone"
          name="telefone"
          autoComplete="telefone"
          inputProps={{ maxLength: 15 }}
        />
        <TextField
          value={user.senha}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          name="senha"
          label="Senha"
          type="password"
          id="senha"
          autoComplete="current-password"
        />
        {/* <Link to={'/app'}> */}
        <Button
          type="submit"
          fullWidth
          onClick={handleSubmit}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Criar Usuário
        </Button>
        {/* </Link> */}
      </Box>
    </Box>
  </Container>
}
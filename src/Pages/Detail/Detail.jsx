import { AppBar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import { AccountCircle } from "@mui/icons-material";
import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from "react";
import { http } from "../../api/api";
import { Loader } from "../../components/Loader/Loader";
import { useLoading } from "../../components/Loader/LoadingContext";
import { toast, Toaster } from "react-hot-toast";
import Logo from '../../assets/images/mobdonate.png'

const drawerWidth = 240;

export function Detail() {
  const { postRequisicao } = http()
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate()

  const location = useLocation()
  const { props: { titulo, descricao, imagens, id, cidade, estado } } = location.state
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: 'Olá, tenho interesse no móvel. Por favor entre em contato.'
  })

  async function fetchRequisicao() {
    setLoading(true)
    try {
      const bodyRequisicao = {
        "doacaoId": id,
        "nomeRequisitante": form.nome,
        "emailRequisitante": form.email,
        "telefoneRequisitante": form.telefone,
        mensagem: form.mensagem
      }
      await postRequisicao(bodyRequisicao)
    } catch (error) {

    }
    setLoading(false)
    setForm({
      nome: '',
      email: '',
      telefone: '',
      mensagem: 'Olá, tenho interesse no móvel. Por favor entre em contato.'
    })
    toast.success('Requisição enviada, Aguarde contato do doador, Obrigado!')
  }

  function handleFormChange({ target: { value, name } }) {
    let newValue = value

    if (name === 'telefone') {
      newValue = newValue.replace(/\D/g, '')
      newValue = newValue.replace(/(\d{2})(\d)/, "($1) $2")
      newValue = newValue.replace(/(\d)(\d{4})$/, "$1-$2")
    }

    setForm({ ...form, [name]: newValue })
  }
  function logout() {
    localStorage.removeItem('userId')
    navigate('login')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {loading && <Loader />}
      <Toaster />
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            <img src={Logo} alt='logo detail' style={{ width: '200px' }} />
          </Link>
          {localStorage.getItem('userId') && <> <Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton
              color="inherit"
              edge="end"
              size='large'
            >
              <AccountCircle />
            </IconButton>
          </Link>
            <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
              <IconButton
                color="inherit"
                edge="end"
                size='large'
                onClick={logout}
              >
                <LogoutIcon />
              </IconButton>
            </Link>
          </>}
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: '#f3f3f3', height: '100vh' }}
      >
        <Toolbar />
        <div style={{ display: 'flex' }}>
          <Card sx={{ width: '100%', margin: 2 }}>
            <Carousel sx={{ margin: 5 }} navButtonsAlwaysVisible animation="slide">
              {imagens.map(image => <CardMedia
                component="img"
                height="250"
                src={`data:image/jpeg;base64,${image.binario}`}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '70%',
                  objectFit: 'contain',
                }}
              />)}

            </Carousel>
            <Divider />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {descricao}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Chip sx={{ mt: 1, ml: 'auto' }} label={
                  <Typography variant="body2" color="text.secondary" align="right" sx={{ fontWeight: 'bold' }} >
                    {`${cidade} - ${estado}`}
                  </Typography>
                } />
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ width: '50%', margin: 2, padding: 2, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              Entre em contato com o doador!
            </Typography>
            <TextField label="Nome" name='nome' value={form.nome} onChange={handleFormChange} variant="outlined" sx={{ width: '100%' }} />
            <TextField label="email" name='email' value={form.email} onChange={handleFormChange} variant="outlined" sx={{ width: '100%' }} />
            <TextField label="telefone" name='telefone' value={form.telefone} onChange={handleFormChange} variant="outlined" sx={{ width: '100%' }} inputProps={{ maxLength: 15 }} />
            <TextField label="Mensagem" name='mensagem' value={form.mensagem} onChange={handleFormChange} variant="outlined" multiline rows={4} sx={{ width: '100%' }} />
            <Button onClick={fetchRequisicao} variant="contained" sx={{ width: '100%' }}>
              Enviar Mensagem
            </Button>
          </Card>
        </div>
      </Box>
    </Box>
  )
}


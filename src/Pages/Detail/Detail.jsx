import { AppBar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import { AccountCircle } from "@mui/icons-material";
import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from "react";
import { http } from "../../api/api";

const drawerWidth = 240;

export function Detail() {
  const { postRequisicao } = http()
  const location = useLocation()
  const { props: { titulo, descricao } } = location.state
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: 'Olá, tenho interesse no móvel. Por favor entre em contato.'
  })

  // useEffect(() => {
  //   fetchRequisicao()
  // }, [])

  async function fetchRequisicao() {
    try {
      const bodyRequisicao = {
        "doacaoId": "ac1e4d43-f247-463a-a091-e1fb4330b439",
        "status": 1,
        "nomeRequisitante": "Alfredo",
        "emailRequisitante": "alfredo@gmail.com.br",
        "telefoneRequisitante": "392849349"
      }
      const response = await postRequisicao(bodyRequisicao)
      console.log(response)
    } catch (error) {

    }
  }


  function handleFormChange({ target: { value, name } }) {
    setForm({ ...form, [name]: value })
  }

  return (
    <Box sx={{ display: 'flex' }}>
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
          <Link to={'/app'} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" noWrap component="div" sx={{ overflow: 'unset' }} >
              Móveis dus guri
            </Typography>
          </Link>
          <Link to={'/profile'} style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton
              color="inherit"
              edge="end"
              size='large'
            >
              <AccountCircle />
            </IconButton>
          </Link>
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
              {[].map(image => <CardMedia
                component="img"
                height="250"
                src={image}
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
                    {`${'city'} - ${'uf'}`}
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
            <TextField label="telefone" name='telefone' value={form.telefone} onChange={handleFormChange} variant="outlined" sx={{ width: '100%' }} />
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


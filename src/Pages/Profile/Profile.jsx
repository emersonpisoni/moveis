import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import cadeira from '../../images/cadeira.webp'
import mesa from '../../images/mesa.jpg'
import Paper from '@mui/material/Paper';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MovelCard } from '../../components/MovelCard/MovelCard';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { http } from '../../api/api';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Profile() {
  const { getUserById, getDonationByUser, postDonation, getCategories, getStatus, getConservations, getItens } = http()

  const [movel, setMovel] = useState({})
  const [showCreateDonation, setShowCreateDonation] = useState(false)
  const [images, setImages] = useState([])
  const [user, setUser] = useState({})
  const [donations, setDonations] = useState([])
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState([])
  const [conservations, setConservations] = useState([])
  const [categoryItens, setCategoryItens] = useState([])

  useEffect(() => {
    fetchUser()
    fetchDonation()
    fetchCategories()
    fetchStatus()
    fetchConvervations()
    fetchCategoryItens()
  }, [])

  async function fetchUser() {
    try {
      const response = await getUserById()
      console.log(response)
      setUser(response.data)
    } catch (error) {

    }
  }

  async function fetchDonation() {
    try {
      const response = await getDonationByUser()
      console.log(response)
      setDonations(response.data)
    } catch (error) {

    }
  }

  async function fetchCategories() {
    try {
      const response = await getCategories()
      setCategories(response.data)
    } catch (error) { }
  }

  async function fetchStatus() {
    try {
      const response = await getStatus()
      setStatus(response.data)
    } catch (error) { }
  }

  async function fetchConvervations() {
    try {
      const response = await getConservations()
      setConservations(response.data)
    } catch (error) { }
  }

  async function fetchCategoryItens() {
    try {
      const response = await getItens()
      setCategoryItens(response.data)
    } catch (error) { }
  }

  async function fetchPostDonation() {
    try {
      await postDonation({
        ...movel,
        categoriaId: JSON.parse(movel.categoria).categoriaId,
        status: JSON.parse(movel.status).statusId,
        conservacaoId: JSON.parse(movel.conservacao).conservacaoId,
        itemId: JSON.parse(movel.item).itemId,
      })
      setShowCreateDonation(false)
      fetchDonation()
    } catch (error) {

    }
  }

  const onImageChange = (event) => {
    if (event.target.files.length > 0) {
      const formData = new FormData()
      const images = Object.values(event.target.files).map(file => {
        formData.append('image', file)

        return formData
      })
      setImages(formData.getAll('image'));
    }
  }

  function handleChange({ target }) {
    setMovel({ ...movel, [target.name]: target.value })
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Link to={'/app'} style={{ textDecoration: 'none', color: 'white' }}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Perfil
              </Typography>
            </Link>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Box sx={{ mt: 4, mb: 4, ml: 4, display: 'flex' }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                mr: 4,
                width: '100%',
                height: 'calc(100vh - 130px)',
                overflow: 'auto',
                position: 'relative'
              }}
            >
              <Typography variant="h6" noWrap component="div" >
                Meus anúncios
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {donations.map(item => <MovelCard item={item} />)}
              </Box>
              <Button onClick={() => setShowCreateDonation(true)} variant='contained' sx={{ position: 'absolute', top: 10, right: 10 }}>
                + Criar Anúncio
              </Button>
            </Paper>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minWidth: '400px',
                mr: 4
              }}
            >
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', m: 1 }}>
                Nome: {user.nome}
              </Typography>
              <Typography variant="body2" noWrap component="div" sx={{ fontWeight: 'bold', m: 1 }}>
                Email: {user.email}
              </Typography>
              <Typography variant="body2" noWrap component="div" sx={{ fontWeight: 'bold', m: 1 }}>
                Telefone: {user.telefone}
              </Typography>
              <Typography variant="body2" noWrap component="div" sx={{ fontWeight: 'bold', m: 1 }}>
                {/* {`${user.city} - ${user.uf}`} */}
              </Typography>
            </Paper>
          </Box>
        </Box>
        {showCreateDonation &&
          <Box sx={{ position: 'fixed', width: '100%', height: '100vh', backgroundColor: '#00000085', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ padding: '20px', position: 'relative' }}>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', m: 1 }}>
                Criar Doação
              </Typography>
              <TextField
                value={movel.titulo}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="movel-titulo"
                label="Título"
                name="titulo"
                autoComplete="titulo"
                autoFocus
              />
              <TextField
                multiline
                minRows={3}
                value={movel.descricao}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="movel-descricao"
                label="Descrição"
                name="descricao"
                autoComplete="descricao"
              />
              <TextField
                select
                sx={{ width: '100%' }}
                labelId="categoria"
                id="categoria"
                value={movel.categoria || ''}
                label="Categoria"
                name='categoria'
                onChange={handleChange}
                required
              >
                {categories.map(category => <MenuItem key={category.nome} value={JSON.stringify(category)}>{category.nome}</MenuItem>)}
              </TextField>
              <TextField
                select
                sx={{ width: '100%', mt: 1 }}
                id="item"
                value={movel.categoria || ''}
                label="Item"
                name='item'
                onChange={handleChange}
                required
              >
                {categoryItens.map(item => <MenuItem key={item.nome} value={JSON.stringify(item)}>{item.nome}</MenuItem>)}
              </TextField>
              <TextField
                select
                sx={{ width: '100%', mt: 1 }}
                labelId="status"
                id="status"
                value={movel.status || ''}
                label="Status"
                name='status'
                onChange={handleChange}
                required
              >
                {status.map(status => <MenuItem key={status.nome} value={JSON.stringify(status)}>{status.nome}</MenuItem>)}
              </TextField>
              <TextField
                select
                sx={{ width: '100%', mt: 1 }}
                labelId="conservacao"
                id="conservacao"
                value={movel.conservacao || ''}
                label="Conservação"
                name='conservacao'
                onChange={handleChange}
                required
              >
                {conservations.map(conservation => <MenuItem key={conservation.nome} value={JSON.stringify(conservation)}>{conservation.nome}</MenuItem>)}
              </TextField>
              <Box>
                <div>
                  <input type="file" onChange={onImageChange} className="filetype" multiple='multiple' />
                  {images.map(image => {
                    return (
                      <img style={{ width: '100px', height: '100px' }} src={URL.createObjectURL(image)} alt="preview" />
                    )
                  })}
                </div>
              </Box>
              <Button onClick={() => setShowCreateDonation(false)} variant='contained' sx={{ position: 'absolute', top: -10, right: -10, minWidth: 20, height: 20, padding: 2, backgroundColor: 'red' }}>
                X
              </Button>
              <Button onClick={fetchPostDonation} variant='contained' sx={{ width: '100%', mt: '10px' }}>
                Criar
              </Button>
            </Paper>
          </Box>}
      </Box>
    </ThemeProvider>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100%)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

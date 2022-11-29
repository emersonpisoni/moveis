import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { AccountCircle } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import cadeira from '../../images/cadeira.webp'
import mesa from '../../images/mesa.jpg'
import Paper from '@mui/material/Paper';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MovelCard } from '../../components/MovelCard/MovelCard';
import { Button, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { cities, http } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Loader } from '../../components/Loader/Loader';
import { useLoading } from '../../components/Loader/LoadingContext';

export function Profile() {
  const { getUserById, getDonationByUser, postDonation, getCategories, getStatus, getConservations, getItens, getDonationById, getRequisicao } = http()
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate()

  const [movel, setMovel] = useState({})
  const [showCreateDonation, setShowCreateDonation] = useState(false)
  const [images, setImages] = useState()
  const [image, setImage] = useState()
  const [user, setUser] = useState({})
  const [donations, setDonations] = useState([])
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState([])
  const [conservations, setConservations] = useState([])
  const [categoryItens, setCategoryItens] = useState([])
  const [requisitions, setRequisitions] = useState([])
  const [openRequisitions, setOpenRequisitions] = useState(false)
  const [pagination, setPagination] = useState();

  useEffect(() => {
    fetchUser()
    fetchDonation()
    fetchCategories()
    fetchStatus()
    fetchConvervations()
    fetchCategoryItens()
  }, [])


  async function fetchUser() {
    setLoading(true)
    try {
      const response = await getUserById()
      setUser(response.data)
    } catch (error) {

    }
    setLoading(false)
  }

  async function fetchDonation(page) {
    setLoading(true)
    try {
      await getRequisicao()
      const { data } = await getDonationByUser(page)
      setDonations(data.content.map(item => ({ ...item.doacao, imagens: item.imagens, requisicoes: item.requisicoes })))
      setPagination({
        pages: data.totalPages,
        size: data.size,
        currentPage: page
      })
    } catch (error) {

    }
    setLoading(false)
  }

  async function fetchCategories() {
    setLoading(true)
    try {
      const response = await getCategories()
      setCategories(response.data)
    } catch (error) { }
    setLoading(false)
  }

  async function fetchStatus() {
    setLoading(true)
    try {
      const response = await getStatus()
      setStatus(response.data)
    } catch (error) { }
    setLoading(false)
  }

  async function fetchConvervations() {
    setLoading(true)
    try {
      const response = await getConservations()
      setConservations(response.data)
    } catch (error) { }
    setLoading(false)
  }

  async function fetchCategoryItens() {
    setLoading(true)
    try {
      const response = await getItens()
      setCategoryItens(response.data)
    } catch (error) { }
    setLoading(false)
  }

  async function fetchPostDonation() {
    setLoading(true)
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append(`files`, images[i])
    }

    try {
      await postDonation({
        ...movel,
        categoriaId: JSON.parse(movel.categoria).categoriaId,
        status: JSON.parse(movel.status).statusId,
        conservacaoId: JSON.parse(movel.conservacao).conservacaoId,
        itemId: JSON.parse(movel.item).itemId,
        formData: formData
      })
      setShowCreateDonation(false)
      fetchDonation()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const onImageChange = (event) => {
    setImages(event.target.files)
  }

  function handleChange({ target }) {
    setMovel({ ...movel, [target.name]: target.value })
  }

  function requisitionsCallback(requisitions) {
    setRequisitions(requisitions)
    setOpenRequisitions(true)
  }

  function logout() {
    localStorage.removeItem('userId')
    navigate('login')
  }

  function onHandlePagination(e, page) {
    fetchDonation(page)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      {loading && <Loader />}

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
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
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
            {localStorage.getItem('userId') && <>
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
                {donations.map(item => <MovelCard item={item} requisitionsCallback={requisitionsCallback} />)}
                {/* <MovelCard item={{ titulo: 'fe', descricao: 'fef', images: [image] }} /> */}
              </Box>
              <Button onClick={() => setShowCreateDonation(true)} variant='contained' sx={{ position: 'absolute', top: 10, right: 10 }}>
                + Criar Anúncio
              </Button>
              <Box sx={{ width: 'calc(100%)', display: 'flex', justifyContent: 'center', padding: '20px 0', backgroundColor: '#1976d2', position: 'fixed', bottom: 0, left: 0 }}>
                <Pagination count={pagination?.pages} variant="outlined" onChange={onHandlePagination} />
              </Box>
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
        {openRequisitions &&
          <Box sx={{ position: 'fixed', width: '100%', height: '100vh', backgroundColor: '#00000085', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ padding: '20px', position: 'relative' }}>
              <Button onClick={() => setOpenRequisitions(false)} variant='contained' sx={{ position: 'absolute', top: -10, right: -10, minWidth: 20, height: 20, padding: 2, backgroundColor: 'red' }}>
                X
              </Button>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', m: 1 }}>
                Requisições
              </Typography>
              <Box sx={{ display: 'flex', position: 'relative', width: '800px', padding: '10px', margin: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Carousel sx={{ margin: 1, width: '100%' }} height='500px' navButtonsAlwaysVisible autoPlay={false} animation="slide">
                  {[...requisitions, ...requisitions].map(req => {
                    return (
                      <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 70px' }}>
                        <TextField
                          sx={{ mt: 1 }}
                          disabled
                          value={req.nomeRequisitante}
                          fullWidth
                          label="Nome do requisitante"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          sx={{ mt: 1 }}
                          disabled
                          value={req.emailRequisitante}
                          fullWidth
                          label="Email do requisitante"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          sx={{ mt: 1 }}
                          disabled
                          value={req.telefoneRequisitante}
                          fullWidth
                          label="Telefone do requisitante"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          sx={{ mt: 1 }}
                          disabled
                          value={req.mensagem}
                          fullWidth
                          multiline
                          label="Mensagem do requisitante"
                          rows={10}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Paper>
                    )
                  })}
                </Carousel>
              </Box>
            </Paper>
          </Box>
        }

        {showCreateDonation &&
          <Box sx={{ position: 'fixed', width: '100%', height: '100vh', backgroundColor: '#00000085', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ padding: '20px', position: 'relative' }}>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', m: 1 }}>
                Criar Doação
              </Typography>
              <Box sx={{ display: 'flex', width: '800px' }}>
                <Box sx={{ m: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                  <TextField
                    value={movel.titulo}
                    onChange={handleChange}
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
                    minRows={4}
                    value={movel.descricao}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ width: '100%', mt: 1 }}

                    id="movel-descricao"
                    label="Descrição"
                    name="descricao"
                    autoComplete="descricao"
                  />
                  <TextField
                    select
                    sx={{ width: '100%', mt: 1 }}
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
                    value={movel.item || ''}
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
                    {status.map(status => <MenuItem key={status.descricao} value={JSON.stringify(status)}>{status.descricao}</MenuItem>)}
                  </TextField>
                </Box>
                <Box sx={{ m: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                  <TextField
                    select
                    sx={{ width: '100%' }}
                    labelId="conservacao"
                    id="conservacao"
                    value={movel.conservacao || ''}
                    label="Conservação"
                    name='conservacao'
                    onChange={handleChange}
                    required
                  >
                    {conservations.map(conservation => <MenuItem key={conservation.descricao} value={JSON.stringify(conservation)}>{conservation.descricao}</MenuItem>)}
                  </TextField>
                  <TextField
                    select
                    sx={{ width: '100%', mt: 1 }}
                    labelId="estado"
                    id="estado"
                    value={movel.estado || ''}
                    label="Estado"
                    name='estado'
                    onChange={handleChange}
                    required
                  >
                    {cities.estados.map(state => state.nome).map(state => <MenuItem key={state} value={state}>{state}</MenuItem>)}
                  </TextField>
                  <TextField
                    select
                    sx={{ width: '100%', mt: 1 }}
                    labelId="cidade"
                    id="cidade"
                    value={movel.cidade || ''}
                    label="Cidade"
                    name='cidade'
                    onChange={handleChange}
                    required
                  >
                    {cities?.estados.find(state => state.nome === movel.estado)?.cidades.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
                  </TextField>
                  <TextField
                    value={movel.endereco}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="endereco"
                    label="Endereço"
                    name="endereco"
                    autoFocus
                  />
                  <TextField
                    value={movel.bairro}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="movel-bairro"
                    label="Bairro"
                    name="bairro"
                    autoFocus
                  />
                  <Box sx={{ width: '100%', mt: '40px' }}>
                    <div>
                      <input type="file" name='file' onChange={onImageChange} className="filetype" multiple='multiple' />

                      {/* {images?.length > 0 && images.map(image => <img style={{ width: '100px', height: '100px' }} src={URL.createObjectURL(image)} alt="preview" />)} */}

                    </div>
                  </Box>
                </Box>
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

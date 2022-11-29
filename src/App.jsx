import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha, InputBase, Select, OutlinedInput, MenuItem, Checkbox, Chip } from '@mui/material';
import cadeira from './images/cadeira.webp'
import mesa from './images/mesa.jpg'
import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { MovelCard } from './components/MovelCard/MovelCard';
import './App.css'
import { http } from './api/api';
import { Toaster } from 'react-hot-toast';
import { useLoading } from './components/Loader/LoadingContext';
import { Loader } from './components/Loader/Loader';
import Logo from './assets/images/mobdonate.png'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    // width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function Filters({ cityFilter, setCityFilter, allCities }) {
  const handleChangeCity = (event) => {
    const {
      target: { value },
    } = event;
    setCityFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <List>
        <ListItem>
          <Box sx={{ height: '40px' }}>
            <Typography variant="h6" noWrap component="div" sx={{ overflow: 'unset' }} >
              Filtros
            </Typography>
          </Box>
        </ListItem>
        <Divider />
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="subtitle2" noWrap component="div" sx={{ overflow: 'unset', mb: 1 }} >
            Cidade
          </Typography>
          <Select
            sx={{ m: 0, width: '100%' }}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={cityFilter}
            onChange={handleChangeCity}
            input={<OutlinedInput className='filter-city' label="Tag" sx={{ display: 'flex', '.filter-city > .MuiSelect-select': { display: 'flex' } }} />}
            renderValue={(selected) => {
              return selected.map(city => <Box>
                <Chip sx={{ mt: 1 }} label={
                  <Typography variant="body2" color="text.secondary" align="right" sx={{ fontWeight: 'bold' }} >
                    {city}
                  </Typography>
                } />
              </Box>)
            }}
          >
            {allCities.map((city, index) => (
              <MenuItem key={`${city}${index}`} value={city}>
                <Checkbox checked={cityFilter.indexOf(city) > -1} />
                <ListItemText primary={city} />
              </MenuItem>
            ))}
          </Select>
        </ListItem>
      </List>
      <Divider />
    </div>
  )
}


const drawerWidth = 300;

function App(props) {
  const { window } = props;
  const { getDonations } = http()
  const navigate = useNavigate()
  const { loading, setLoading } = useLoading();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetchDonations()
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function logout() {
    localStorage.removeItem('userId')
    navigate('login')
  }

  async function fetchDonations() {
    setLoading(true)
    const response = await getDonations()

    setItems(response.data.content.map(item => ({ ...item.doacao, imagens: item.imagens })))
    setAllCities([...new Set(response.data.content.map(item => item.doacao.cidade))])
    setCityFilter([...new Set(response.data.content.map(item => item.doacao.cidade))])
    setLoading(false)
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {loading && <Loader />}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div" sx={{ overflow: 'unset' }} >
              Móveis dus guri
            </Typography> */}
            <img src={Logo} alt='logo app' style={{ width: '200px' }} />

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            {localStorage.getItem('userId') && <>
              <Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>
                <IconButton
                  color="inherit"
                  edge="end"
                  size='large'
                  onClick={handleDrawerToggle}
                >
                  <AccountCircle />
                </IconButton>
              </Link>
            </>}
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
          </Toolbar>
        </AppBar>
        <Box
          flex
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Filters cityFilter={cityFilter} setCityFilter={setCityFilter} allCities={allCities} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <Filters cityFilter={cityFilter} setCityFilter={setCityFilter} allCities={allCities} />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: '100vh', backgroundColor: '#f3f3f3' }}
        >
          <Toolbar />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {items.filter(item => {
              console.log(item);
              return item?.titulo?.toLowerCase().includes(search) && cityFilter.includes(item.cidade)
              // && cityFilter.includes(item.city)
            }).map(item => <MovelCard item={item} withAction />)}
          </div>
        </Box>
      </Box>
    </>
  );
}



export default App;

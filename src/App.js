import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, alpha, InputBase, Select, OutlinedInput, MenuItem, Checkbox } from '@mui/material';
import cadeira from './images/cadeira.webp'
import mesa from './images/mesa.jpg'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MovelCard } from './components/MovelCard/MovelCard';
import './App.css'

const itemsArray = [
  {
    name: 'Cadeira',
    images: [cadeira, cadeira, cadeira],
    city: 'Canoas',
    uf: 'RS',
    description: 'Móvel bem conservado, disponível para retirada em Canoas, pretendo doar o imóvel o mais rápido possível'
  },
  {
    name: 'Mesa',
    images: [mesa, mesa, mesa],
    city: 'Canoas',
    uf: 'RS',
    description: 'Móvel bem conservado, disponível para retirada em Canoas, pretendo doar o imóvel o mais rápido possível'
  },
  {
    name: 'Cadeira',
    images: [cadeira, cadeira, cadeira],
    city: 'Canoas',
    uf: 'RS',
    description: 'Móvel bem conservado, disponível para retirada em Canoas, pretendo doar o imóvel o mais rápido possível'
  },
  {
    name: 'Mesa',
    images: [mesa, mesa, mesa],
    city: 'Canoas',
    uf: 'RS',
    description: 'Móvel bem conservado, disponível para retirada em Canoas, pretendo doar o imóvel o mais rápido possível'
  },
  {
    name: 'Cadeira',
    images: [cadeira, cadeira, cadeira],
    city: 'Canoas',
    uf: 'RS',
    description: 'Móvel bem conservado, disponível para retirada em Canoas, pretendo doar o imóvel o mais rápido possível'
  },
  {
    name: 'Mesa',
    images: [mesa, mesa, mesa],
    city: 'Canoas',
    uf: 'RS',
    description: 'Móvel bem conservado, disponível para retirada em Canoas, pretendo doar o imóvel o mais rápido possível'
  },
  {
    name: 'Cadeira',
    images: [cadeira, cadeira, cadeira],
    city: 'Canoas',
    uf: 'RS',
    description: 'Móvel bem conservado, disponível para retirada em Canoas, pretendo doar o imóvel o mais rápido possível'
  },
  {
    name: 'Mesa',
    images: [mesa, mesa, mesa],
    city: 'Canoas',
    uf: 'RS',
    description: 'Móvel bem conservado, disponível para retirada em Canoas, pretendo doar o imóvel o mais rápido possível'
  },

]

const RSCityList = [
  'Canoas',
  'Porto Alegre',
  'Gravataí'
]


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

function Filters({ cityFilter, setCityFilter }) {
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
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="h6" noWrap component="div" sx={{ overflow: 'unset' }} >
            Cidade
          </Typography>
          <Select
            sx={{ m: 0, width: '100%' }}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={cityFilter}
            onChange={handleChangeCity}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          // MenuProps={MenuProps}
          >
            {RSCityList.map((city) => (
              <MenuItem key={city} value={city}>
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState(RSCityList);
  console.log(cityFilter)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
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
          <Typography variant="h6" noWrap component="div" sx={{ overflow: 'unset' }} >
            Móveis dus guri
          </Typography>
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
          <Link to={'/profile'} style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton
              color="inherit"
              edge="end"
              size='large'
              onClick={handleDrawerToggle}
            >
              <AccountCircle />
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
          <Filters cityFilter={cityFilter} setCityFilter={setCityFilter} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Filters cityFilter={cityFilter} setCityFilter={setCityFilter} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: '#f3f3f3' }}
      >
        <Toolbar />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {itemsArray.filter(item => {
            console.log(cityFilter)
            console.log(item.name)
            return item.name.toLowerCase().includes(search) && cityFilter.includes(item.city)
          }).map(item => <MovelCard item={item} />)}
        </div>
      </Box>
    </Box>
  );
}



export default App;

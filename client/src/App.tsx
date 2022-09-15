import { FC, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import NewStory from "./pages/NewStory";
import Dashboard from "./pages/Dashboard";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage, useNetwork } from 'wagmi'
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import DashboardIcon from "@mui/icons-material/Dashboard";
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MediumLogo from "./assets/logo.svg";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const App: FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const handleDrawerOpen = () => {
    setOpen((o) => !o);
  };

  const handleAuth = async () => {
    const { data } = await axios.post('http://localhost:8000/requestAuth',
      { address }
      , {
        headers: {
          'content-type': 'application/json',
        },
      });

    console.log(data);

    const message = data?.message;

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    // const verify = await axios.post('http://localhost:8000/requestAuth',
    //   { message, signature }
    //   , {
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //   });
  };

  useEffect(() => {
    if (isConnected) {
      handleAuth()
    }
  }, [isConnected]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} elevation={1}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 3 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <img src={MediumLogo} alt="logo" width="40px" height="auto" />
            <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
              Web3 Medium
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <ConnectButton />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader />
          <Divider />
          <List>
            {[
              { title: "Dashboard", icon: DashboardIcon, link: "/" },
              { title: "New Story", icon: EditIcon, link: "write" }
            ].map(({ title, icon: Icon, link }, index) => (
              <ListItem key={title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => navigate(link)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/write" element={<NewStory />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default App;

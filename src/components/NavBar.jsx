/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
// UI
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Link, withRouter, Route, Switch,
} from 'react-router-dom';
import pages from '../routes/index';
import escudoUNMSM from '../assets/escudo.svg';
import cone from '../assets/cone.svg';
import Footer from './Footer';
// eslint-disable-next-line import/no-unresolved
import './NavBar.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    height: '90px',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      height: '140px',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  divider: {
    height: '5px',
    background: '#FFAA05',
  },
  toolbarImg: {
    height: '100px',
    [theme.breakpoints.up('sm')]: {
      height: '140px',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    height: '100px',
    [theme.breakpoints.up('sm')]: {
      height: '140px',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#071725',
  },
  list: {
    marginTop: '0',
    fontFamily: 'Bebas Neue',
    fontSize: '25px',
    paddingLeft: '15px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '38px',
    },
  },
  subtittle: {
    fontSize: '15px',
    marginTop: '0px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '25px',
    },
  },
  typography: {
    paddingTop: '40px',
    width: '75%',
    fontFamily: 'Bebas Neue',
    fontSize: '21px',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: '239.5%',
      paddingTop: '5px',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%', // general
      fontSize: '47px',
    },
  },
  img: {
    width: '70px', // pequeño
    [theme.breakpoints.up('sm')]: {
      width: '0px', // medio
    },
    [theme.breakpoints.up('md')]: {
      width: '140px', // general
    },
  },
  escudo: {
    width: '55px',
    [theme.breakpoints.up('sm')]: {
      width: '95px',
    },
  },
  main: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const NavigationBar = (prop) => {
  const { window } = prop;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const close = () => {
    setMobileOpen(false);
  };
  const styleToolbar = {
    background: '#03315C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const drawer = (
    <div>
      <div className={classes.toolbarImg} style={styleToolbar}>
        <img src={escudoUNMSM} alt="escudo" className={classes.escudo} />
      </div>
      <Divider classes={{ root: classes.divider }} />
      <List>
        {pages.map((page) => (
          <Link to={page.path} style={{ textDecoration: 'none', color: 'white' }}>
            <ListItem button key={page.sidebarName} onClick={close}>
              <Typography variant="h1" className={classes.list}>
                { page.sidebarName }
              </Typography>
              {/* <ListItemText primary={page.sidebarName} /> */}
            </ListItem>
            <Divider classes={{ root: classes.divider }} />
          </Link>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar style={styleToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className="toolbar">
            <Typography variant="h1" className={classes.typography}>
              I CONGRESO INTERNACIONAL DE ÁLGEBRA Y SISTEMAS DINÁMICOS
              <br />
              <p className={classes.subtittle}>EDICIÓN ONLINE, FEBRERO 23-26, 2021</p>
            </Typography>
            <img src={cone} alt="escudex" className={classes.img} />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.main}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {pages.map((page) => (
              <Route exact path={page.path} key={page.path}>
                <page.component />
              </Route>
            ))}
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
};
NavigationBar.propTypes = {
  window: PropTypes.func,
};

export default withRouter(NavigationBar);

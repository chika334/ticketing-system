import React, {useState} from 'react';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Link, withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper'
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import {Switch, Route} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// core pages
import Home from '../core/Home'

// private
import PrivateRoute from '../auth/PrivateRoute'

// pages
import User from '../user/Users';
import Signup from '../user/Signup'
import Signin from '../auth/Signin'
import Profile from '../user/Profile'
import EditProfile from '../user/EditProfile'
import DeleteUser from '../user/DeleteUser'
import Createevent from '../user/Createevent'
import ListEvents from '../user/ListEvents'
import SingleEvent from '../user/SingleEvent'

const drawerWidth = 260;

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#ff4081'}
  else
    return {color: '#ffffff'}
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  hide: {
    display: 'none',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Menus = withRouter(({history}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/">
        <IconButton color="inherit">
          <Badge color="secondary">
            <HomeIcon/>
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      
      <MenuItem component={Link} to="/signup">
        <IconButton color="inherit">
          <Badge color="secondary">
            <ExitToAppOutlinedIcon />
          </Badge>
        </IconButton>
        <p>sign up</p>
      </MenuItem>
      <MenuItem component={Link} to="/signin">
        <IconButton color="inherit">
          <Badge color="secondary">
            <ExitToAppOutlinedIcon />
          </Badge>
        </IconButton>
        <p>sign in</p>
      </MenuItem>
      <MenuItem component={Link} to="/users">
        <IconButton color="inherit">
          <Badge color="secondary">
            <Avatar>
                <Person/>
            </Avatar>
          </Badge>
        </IconButton>
        <p>Users</p>
      </MenuItem>
    </Menu>
  );
  
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={clsx(classes.grow, classes.appBar, {
          [classes.appBarShift]: open,
        })}>
      <AppBar position="static">
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
            </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Tickecting-System
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/">
              <Button style={isActive(history, "/")}>Home</Button>
            </Link>
            {
                !auth.isAuthenticated() && (<span>
                  <Link to="/signup">
                    <Button style={isActive(history, "/signup")}>Sign up</Button>
                  </Link>
                  <Link to="/signin">
                    <Button style={isActive(history, "/signin")}>Sign In</Button>
                  </Link>
                </span>)
              }
              {
                auth.isAuthenticated() && (<span>
                  <Link to="/users">
                     <Button style={isActive(history, "/users")}>Users</Button>
                  </Link>
                  <Link to={"/user/" + auth.isAuthenticated().user._id}>
                    <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
                  </Link>
                  <Button color="inherit" onClick={() => {
                      auth.signout(() => history.push('/'))
                    }}>Sign out</Button>
                </span>)
              }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {
        open === true && (<>
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
                
                <Divider />
                <Link to="/users">
                    <Button style={isActive(history, "/users")}>Users</Button>
                </Link>
                <Link to="/users">
                    <Button style={isActive(history, "/users")}>Users</Button>
                </Link>
                <Link to="/users">
                    <Button style={isActive(history, "/users")}>Users</Button>
                </Link>
              </Drawer>
        </>)
        }
      <main>
        
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={User} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
            <PrivateRoute path="/user/delete/:userId" component={DeleteUser}/>
            <Route exact path="/createevent" component={Createevent} />
            <Route exact path="/getevents" component={ListEvents} />
            <Route exact path="/event/:eventId" component={SingleEvent} />
            <Route path="/user/:userId" component={Profile}/>
        </Switch>
      </main>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
})

export default Menus

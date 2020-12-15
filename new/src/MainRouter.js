import React, { useEffect } from 'react'
import {Switch, Route} from 'react-router-dom';
import './App.css'

// core pages
import Home from './core/Home'
import Menu from './core/Menu'

// private
import PrivateRoute from './auth/PrivateRoute'

// pages
import User from './user/Users';
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import DeleteUser from './user/DeleteUser'

function MainRouter() {
  return (
    <div>
        <Menu />
    </div>
  );
}

export default MainRouter;

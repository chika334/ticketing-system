import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import { read } from './api-user'
import {Redirect, Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import DeleteUser from './DeleteUser';
import Edit from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle
  }
})

function Profile(props, match) {
    const [values, setValues] = useState({
        user: '',
        redirectToSignin: false
    })
    
    const { user, redirectToSignin } = values
    
    useEffect(() => {
        function init (userId) {
            const jwt = auth.isAuthenticated()
            read({
                userId: userId
            }, {t: jwt.token}).then((data) => {
                if(data.error) {
                    setValues({ ...values, redirectToSignin: true })
                } else {
                    setValues({ user: data })
                }
            })
        }
        init(props.match.params.userId)
    }, [])
    
    const  { classes } = props
    if(redirectToSignin) {
        return <Redirect to="/signin" />
    }
    
    return (
        <div>
          <Paper className={classes.root} elevation={4}>
            <Typography type="title" className={classes.title}>
              Profile
            </Typography>
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Person/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.email}/> {
                 auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id && 
                  (<ListItemSecondaryAction>
                    <Link to={"/user/edit/" + user._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                      </IconButton>
                    </Link>
                    <DeleteUser userId={user._id}/>
                  </ListItemSecondaryAction>)
                }
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText primary={"Joined: " + (
                  new Date(user.created)).toDateString()}/>
                  <ListItemSecondaryAction>
                    <Link color="primary" to="/createevent">Create Event</Link>
                  </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
       </div>
    )
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)

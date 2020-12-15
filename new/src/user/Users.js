import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { list } from './api-user';

const Users = (props) => {
    const [users, setUsers] = useState([])
    const classes = props
    
    useEffect(() => {
        getUsers()
    }, [])
    
    const getUsers = () => {
        list().then((data) => {
          if (data.error) {
            console.log(data.error)
          }
          else {
            setUsers(data)
          }
        })
    }

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography type='title' className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map(function(item, i) {
                    return <Link to={'/user/' + item._id} key={i}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name}/>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                })}
            </List>
        </Paper>
    )
}

export default Users

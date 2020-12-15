import React, { useState } from 'react'
import { update } from './api-user'
import auth from '../auth/auth-helper'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
})

function EditProfile (props) {
    const { classes } = props
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        redirectToProfile: false,
        error: ""
    })
    
    const { name, email, password, redirectToProfile, error } = values
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const clickSubmit = () => {
        const jwt = auth.isAuthenticated()
        const user = {
            name: name || undefined,
            email: email || undefined,
            password: password || undefined
        }
        
        update({
            userId: props.match.params.userId
        }, {
            t: jwt.token
        }, user).then((data) => {
            if(data.error) {
                setValues({ error: data.error })
            } else {
                setValues({ 'userId': data._id, 'redirectToProfile': true })
            }
        })
    }
    
    if (redirectToProfile) {
        return (<Redirect to={'/user/' + props.match.params.userId}/>)
    }
    
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" className={classes.title}>
                        Edit Profile
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField} value={name} onChange={handleChange('name')} margin="normal" /> <br />
                    <TextField id="email" label="Email" type="email" className={classes.textField} value={email} onChange={handleChange('email')} margin="normal" /> <br />
                    <TextField id="password" label="Password" type="password" className={classes.textField} value={password} onChange={handleChange('password')} margin="normal" /> <br />
                    {error && ( <Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {error}
                    </Typography>)}
                </CardContent>
                <CardActions>
                    <Button color="primary" raised="raised" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        </div>
    )
}

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile);

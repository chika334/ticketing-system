import React, { useState } from 'react'
import auth from './auth-helper'
import { signin } from './api-auth'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

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


function Signin(props) {
    const {classes} = props
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToReferrer: false
    })
    
    const { email, password, error, redirectToReferrer } = values
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const clickSubmit = (e) => {
        const user = {
            email: email || undefined, 
            password: password || undefined
        }
        
        signin(user).then((data) => {
            if(data.error) {
                console.log(data.error)
                setValues({error: data.error})
            } else {
                auth.authenticate(data, () => {
                    setValues({ redirectToReferrer: true })
                })
            }
        })
    }
    
    const {from} = props.location.state || {
        from: {pathname: '/'}
    }
    if(redirectToReferrer) {
        return (<Redirect to={from} />)
    }
    
    return (
        <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                Sign In
              </Typography>
              <TextField id="email" type="email" label="Email" className={classes.textField} value={email} onChange={handleChange('email')} margin="normal"/><br/>
              <TextField id="password" type="password" label="Password" className={classes.textField} value={password} onChange={handleChange('password')} margin="normal"/>
              <br/> {
                error && (<Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>error </Icon>
                  {error}
                </Typography>)
              }
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
      </Card>
    )
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signin);

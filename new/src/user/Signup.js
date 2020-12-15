import React, { useState } from 'react'
import { create } from './api-user'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

function Signup (props) {
    const { classes } = props
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        open: false,
        error: ""
    })
    
    const { name, email, password, open, error } = values
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const clickSubmit = () => {
        const user = {
            name: name || undefined,
            email: email || undefined,
            password: password || undefined
        }
        
        create(user).then((data) => {
            if(data.error) {
                setValues({error: data.error})
            }
            else {
                setValues({error: "", open: true })
            }
        })
    }
    
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" className={classes.title}>
                        Sign Up
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
                  <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
              </Card>
              <Dialog open={open} disableBackdropClick={true}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    New account successfully created.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to="/signin">
                    <Button color="primary" autoFocus="autoFocus" variant="contained">
                      Sign In
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
        </div>
    )
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);

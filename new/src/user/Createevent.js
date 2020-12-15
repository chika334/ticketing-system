import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createEvent } from './event-api'
import Alert from '@material-ui/lab/Alert';
import uuid from 'react-uuid'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    Colorbackground: {
        //backgroundColor: '#cfe8fc',
    },
    Colorbackgrounds: {
        //backgroundColor: 'red',
    },
    EventTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: theme.palette.text.secondary
    },
    textField: {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    Button: {
        marginBottom: 20,
        margin: '30px'
    }
})

function Createevent(props) {
    const { classes } = props;
    const [values, setValues] = useState({
        numberOfTickets: "",
        description: "",
        imageUpload: "",
        error: "",
        success: "",
        redirectToNextPage: false
    })
    
    const {numberOfTickets, description, imageUpload, success, error, redirectToNextPage} = values
    
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }
    
    const handleImageChange = name => e => {
        const value = e.target.files[0]
        setValues({ ...values, imageUpload: value })
    }
    
    useEffect(() => {
       return props.getEvent
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        const imageId = uuid();
        
        formData.append('imageUpload', values.imageUpload);
        formData.append('description', values.description);
        formData.append('number', values.numberOfTickets);
        formData.append('uuid', imageId);
        
        createEvent(formData).then((data) => {
            if(data.error) {
                setValues({ error: data.error })
            }
            else {
                setValues({ success: "Event successfully created", redirectToNextPage: true })
            }
        })
    }
    
    const {from} = props.location.state || {
        from: {pathname: '/getevents'}
    }
    if(redirectToNextPage) {
        return (<Redirect to={from} />)
    }
    
    const form = (
        <form className="createUserform">
            {success ? <Alert severity="success">{success}</Alert> : null}
            <div className="new">
                <p>Number of Tickets: </p>
                <TextField onChange={handleChange('numberOfTickets')} value={numberOfTickets} id="standard-basic" label="Number" margin="normal" />
             </div>
            <div className="new">
                <label>Description: </label>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={5}
                  variant="outlined"
                  value={description}
                  onChange={handleChange('description')}
                  className={classes.textField}
                  margin="normal"
                />
             </div>
             <div className={classes.Button}>
                <label>Upload Image</label><br />
                <Button
                  variant="outlined"
                  component="label"
                  color="primary"
                >
                  Upload File
                  <input
                    type="file"
                    onChange={handleImageChange('photo')}
                    name="file"
                    hidden
                  />
                </Button>
            </div>
            <Button className={classes.Button} onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </form>
    )
    return (
        <div>
            <div className={classes.EventTitle}>
                <Container maxWidth="sm">
                    <Typography type="headline" component="h3" className={classes.EventTitle}>
                        Create Events
                    </Typography>
                    {form}
                </Container>
            </div>
            
        </div>
    )
}

Createevent.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Createevent)

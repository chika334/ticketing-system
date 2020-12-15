import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvent } from './event-api';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    card: {
        maxWidth: 260,
        margin: '2.35rem',
        marginTop: theme.spacing(5),
        float: "left"
    },
    title: {
        margin: 'auto',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '130px',
        color: theme.palette.text.secondary
    },
    EventTitle: {
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 330
    },
    button: {
       margin: 'auto',
       marginBottom: theme.spacing(2)
    }
})

const ListEvents = (props) => {
    const [events, setEvents] = useState([])
    const { classes } = props
    
    useEffect(() => {
        getUsers()
    }, [])
    
    const getUsers = () => {
        getEvent().then((data) => {
          if (data.error) {
            console.log(data.error)
          }
          else {
            setEvents(data)
          }
        })
    }
    
    const handleClick = (props) => {
        console.log(props)
    }

    return (
        <div>
            <Typography type="headline" variant="h2" className={classes.EventTitle}>
                Events
            </Typography>
            {
                events.map((allImages, index) => {
                    return (
                        <div key={index}>
                            <Card className={classes.card}>
                                <CardMedia className={classes.media} component="img" src={`http://localhost:5000/${allImages.path}`} title={allImages.description} />
                                <CardContent>
                                    <Typography type="body1" component="p">
                                        {allImages.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" onClick={() => handleClick({image: allImages.img, type: allImages.description })} className={classes.button} color="primary">view details</Button>
                                </CardActions>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}

ListEvents.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ListEvents)

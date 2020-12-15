import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import newImage from '../assets/images/newImage.jpg'
import { Link } from 'react-router-dom'

const Cardimages = [
    {
        name: 'first Image',
        img: newImage,
        alt: "first image",
        description: "Only the first image is allowed here."
    },
    {
        name: 'Second Image',
        img: newImage,
        alt: "Second image",
        description: "Only the second image is allowed here."
    },
    {
        name: 'Third Image',
        img: newImage,
        alt: "Third image",
        description: "Only the third image is allowed here."
    },
    {
        name: 'Fourth Image',
        img: newImage,
        alt: "Fourth image",
        description: "Only the fourth image is allowed here."
    },
    {
        name: 'Fifth Image',
        img: newImage,
        alt: "Fifth image",
        description: "Only the fifth image is allowed here."
    },
    {
        name: 'Sixth Image',
        img: newImage,
        alt: "Sixth image",
        description: "Only the sixth image is allowed here."
    },
    {
        name: 'Seventh Image',
        img: newImage,
        alt: "Seventh image",
        description: "Only the Seventh image is allowed here."
    },
    {
        name: 'Eight Image',
        img: newImage,
        alt: "Eight image",
        description: "Only the Eight image is allowed here."
    }
]

const styles = theme => ({
    card: {
        maxWidth: 260,
        margin: '2.35rem',
        marginTop: theme.spacing(5),
        float: "left",
    },
    backgroundHero: {
        backgroundImage: `url(${newImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: `calc(100vw+ 48px)`,
        height: 400,
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
        //margin: 'auto',
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

function Home(props) {
    const { classes } = props;
    
    const handleClick = (props) => {
        console.log(props)
    }
    return (
        <div>
            <div className={classes.backgroundHero}>
                <Typography type="headline" variant="h2" className={classes.title}>
                    Ticketing system
                </Typography>
            </div>
            <div>
                <Typography type="headline" variant="h2" className={classes.EventTitle}>
                    Events
                </Typography>
                {
                    Cardimages.map((allImages, index) => {
                        return (
                            <div key={index}>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.media} component="img" image={`${allImages.img}`} title={allImages.description} />
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
        </div>
    )
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home);

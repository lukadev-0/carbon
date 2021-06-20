import React from 'react'
import Layout from '../src/Layout'
import { Typography, makeStyles, Button, Container, Grid } from '@material-ui/core'
const useStyles = makeStyles({
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
})


export default function Index(): JSX.Element {
    const classes = useStyles()
    return (
        <Grid item xs className={classes.flex}>
            <Container maxWidth="lg" >
                <Typography variant="h3" component="h2">
                    Carbon
                </Typography>
                <Typography paragraph>
                    Carbon is a discord bot, with many features like moderation, trust issues, and robuks.
                </Typography>
                <Button variant="contained" color="primary" href="/dashboard">
                    Get started
                </Button>
            </Container>
        </Grid>
    )
}

Index.layout = Layout.layout
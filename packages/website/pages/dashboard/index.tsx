import React from 'react'
import useSWR from 'swr'
import { Grid, Paper, CircularProgress, makeStyles, Button, Typography, Divider, List, ListItem } from '@material-ui/core'
import Layout from '../../src/Layout'
const useStyles = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        minWidth: '50%',
        minHeight: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
    },
    content: {
        width: '80%',
    },
    cancel: {
        position: 'absolute',
        bottom: '10px',
        right: '15px',
    },
    select: {
        position: 'absolute',
        top: '20px',
        left: '30px',
    },
}))

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Guild {
    permissions: number
    name: string
}

export default function Dashboard(): JSX.Element {
    const classes = useStyles()
    const { data }: { data?: Guild[] } = useSWR('/api/guilds', fetcher)
    const toReturn = data ?
        <Paper className={classes.paper}>
            <Typography className={classes.select}>
            Select server
            </Typography>
            <List className={classes.content}>
                {data?.filter((v) => (v.permissions & 1 << 5) === 1 << 5).map((v) => <ListItem>
                    <Typography>
                        {v.name}
                    </Typography>
                    <Button variant="contained" color="primary">Add bot</Button>
                </ListItem>)}
            </List>
            <Button color="primary" className={classes.cancel} href="/">Cancel</Button>
        </Paper>
        : <CircularProgress />
    return (
        <Grid item xs className={classes.flex}>
            {toReturn}
        </Grid>
    )
}

Dashboard.layout = Layout.layout
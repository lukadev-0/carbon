import React from 'react'
import useSWR from 'swr'
import { Grid, Paper, CircularProgress, makeStyles, Button, Typography, List, ListItem, Avatar } from '@material-ui/core'
import Layout from '../../src/Layout'
import { fetcher, options } from '../../src/swrSettings'
const flex = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
const useStyles = makeStyles((theme) => ({
    flex,
    paper: {
        minWidth: theme.spacing(100),
        minHeight: theme.spacing(50),
        flexDirection: 'column',
        position: 'relative',
        ...flex,
    },
    content: {
        width: theme.spacing(85),
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
    rightButton: {
        marginLeft: 'auto',
    },
    avatar: {
        marginRight: theme.spacing(1),
    },
    displayAvatar: {
        background: '#36393f',
        color: '#dcddde',
        fontSize: theme.spacing(2),
    },
}))

interface Guild {
    permissions: number
    name: string
    id: string
    icon?: string
}

export default function Dashboard(): JSX.Element {
    const classes = useStyles()
    const { data, error }: { data?: Guild[], error?: Error } = useSWR('/api/guilds', fetcher, options)
    const toReturn = (data && !error) ?
        <Paper className={classes.paper}>
            <Typography className={classes.select} variant="h5">
            Select server
            </Typography>
            <List className={classes.content}>
                {data?.filter((v) => (v.permissions & 1 << 5) === 1 << 5).map((v, i) => <ListItem key={i}>
                    <Avatar className={`${classes.avatar} ${v.icon ? '' : classes.displayAvatar}`} src={v.icon && `https://cdn.discordapp.com/icons/${v.id}/${v.icon}.${v.icon.startsWith('a_') ? 'gif' : 'png'}`} >{v.name.split(/ +/).map((v) => v.charAt(0))}</Avatar>
                    <Typography>
                        {v.name}
                    </Typography>
                    <Button className={classes.rightButton} color="primary" variant="outlined" href={`/dashboard/${v.id}`}>Manage</Button>
                </ListItem>,
                )}
            </List>
            <Button color="primary" className={classes.cancel} href="/">Cancel</Button>
        </Paper>
        : <CircularProgress />
    return (
        <Grid item xs className={classes.flex}>
            {error ? <Paper className={classes.paper}><Typography>An error has occured: <br /> <code>{error.message}</code></Typography></Paper> : toReturn}
        </Grid>
    )
}

Dashboard.layout = Layout.layout
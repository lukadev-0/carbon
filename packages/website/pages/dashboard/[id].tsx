import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import ErrorPage from 'next/error'
import Layout from '../../src/Layout'
import { makeStyles, Grid, CircularProgress, Collapse, List, ListItem, ListItemText, Typography, Button } from '@material-ui/core'
import { ExpandMoreRounded, ExpandLessRounded } from '@material-ui/icons'
import { fetcher, options } from '../../src/swrSettings'
const useStyles = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nested: {
        paddingLeft: theme.spacing(4),
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}))

interface Guild {
    permissions: number
    name: string
    id: string
    icon?: string
}

interface SettingsCollapseProps {
    text: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const SettingsCollapse: React.FC<SettingsCollapseProps> = (props) => {
    const [ open, setOpen ] = React.useState(true)
    const classes = useStyles()
    return <List>
        <ListItem button onClick={() => { setOpen(!open) }}>
            <ListItemText primary={props.text} />
            {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem className={classes.nested}>
                    {props.children}
                </ListItem>
            </List>
        </Collapse>
    </List>
}

export default function DashboardGuild(): JSX.Element {
    const classes = useStyles()
    let error: Error | null
    const { data, error: error1 }: { data?: Guild[], error?: Error } = useSWR('/api/guilds', fetcher, options)
    error = error1
    const router = useRouter()
    const { id } = router.query
    const { data: isInGuild, error: error2 }: { data?: boolean, error?: Error } = useSWR(`/api/isInGuild?guildId=${id}`, fetcher, options)
    console.log(isInGuild)
    error = error2


    return (
        <Grid item xs className={classes.flex}>
            <div>
                {isInGuild ? <Typography>Im in guild</Typography> : <Button color="primary" variant="contained" href={process.env.NEXT_PUBLIC_BOT_INVITE_URL}>Add bot</Button>}
            </div>
        </Grid>
    )
}

DashboardGuild.layout = Layout.layout
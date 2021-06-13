import { AppBar, makeStyles, Tabs, Toolbar, Typography, Tab, Avatar, Button, IconButton, Popover } from '@material-ui/core'
import React from 'react'
import CarbonLogo from './CarbonLogo'
import { useSession, signIn, signOut } from 'next-auth/client'
import Loading from './Loading'
const useStyles = makeStyles((theme) => ({
    logo: {
        marginRight: theme.spacing(1),
    },
    right: {
        flexGrow: 1,
    },
    spacing: {
        marginLeft: theme.spacing(5),
    },
}))

export default function Header(): JSX.Element {
    const classes = useStyles()
    const [ value, setValue ] = React.useState(0)
    const [ session, loading ] = useSession()
    const [ anchorEl, setAnchorEl ] = React.useState(null)
    if (loading) {
        return <Loading />
    }
    return (
        <AppBar color="default">
            <Toolbar variant="dense">
                <CarbonLogo className={classes.logo} />
                <Typography variant="h6">
                    Carbon
                </Typography>
                <div className={classes.right} />
                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)} indicatorColor="primary" textColor="primary">
                    <Tab label="Bot" />
                    <Tab label="Docs" />
                    <Tab label="Developer" />
                </Tabs>
                <div className={classes.spacing}>
                    {
                        session
                            ? <IconButton onClick={(e) => {setAnchorEl(e.currentTarget)}}><Avatar src={session.user.image} /></IconButton>
                            : <Button variant="outlined" onClick={() => {signIn()}}>Log in</Button>
                    }
                </div>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    onClose={() => {
                        setAnchorEl(null)
                    }}
                >
                    <Button onClick={() => {signOut()}}>Log out</Button>
                </Popover>
            </Toolbar>
        </AppBar>
    )
}
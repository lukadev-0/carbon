import { AppBar, makeStyles, Tabs, Toolbar, Typography, Tab, Avatar, Button, IconButton, Popover } from '@material-ui/core'
import React from 'react'
import CarbonLogo from './CarbonLogo'
import { useSession, signIn, signOut } from 'next-auth/client'
import router from 'next/router'

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
    avatar: {
        width: theme.spacing(4.4),
        height: theme.spacing(4.4),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header({ val, style }: { val?: number, style?: React.CSSProperties }): JSX.Element {
    const classes = useStyles()
    const [ value, setValue ] = React.useState(val ?? 0)
    const [ session ] = useSession()
    const [ anchorEl, setAnchorEl ] = React.useState(null)
    return (
        <AppBar color="default" className={classes.appBar} style={style}>
            <Toolbar variant="dense">
                <CarbonLogo className={classes.logo} />
                <Typography variant="h6">
                    Carbon
                </Typography>
                <div className={classes.right} />
                <Tabs value={value} onChange={(_, newValue) => {
                    setValue(newValue)
                    newValue === 0 ? router.push('/') : router.push(`/tab/${newValue}`)
                }} indicatorColor="primary" textColor="primary">
                    <Tab label="Bot" />
                    <Tab label="Docs" />
                    <Tab label="Developer" />
                </Tabs>
                <div className={classes.spacing}>
                    {
                        session
                            ? <IconButton onClick={(e) => {setAnchorEl(e.currentTarget)}} size="small"><Avatar className={classes.avatar} src={session.user.image} /></IconButton>
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
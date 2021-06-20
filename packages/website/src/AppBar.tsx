import {
    AppBar as MuiAppBar,
    makeStyles,
    Tabs,
    Toolbar,
    Typography,
    Tab,
    Avatar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
} from '@material-ui/core'

import { Skeleton } from '@material-ui/lab'
import React from 'react'
import CarbonLogo from './CarbonLogo'
import { useSession, signIn, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    logo: {
        marginRight: theme.spacing(1),
    },
    grow: {
        flexGrow: 1,
    },
    tabs: {
        marginRight: theme.spacing(1),
    },
    tabsContainer: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    menuAvatar: {
        marginLeft: theme.spacing(1),
    },
}))

function createEnum(keys: string[]): Record<string, string> {
    return keys.reduce((acc, v, i) => ({
        ...acc,
        [i]: v,
        [v]: i,
    }), {})
}

const tabs = createEnum([
    '',
    'docs',
    'developer',
])

export default function AppBar(): JSX.Element {
    const router = useRouter()
    const classes = useStyles()
    const [ value, setValue ] = React.useState(tabs[router.pathname.split('/')[1]] ?? 0)
    const [ anchorEl, setAnchorEl ] = React.useState(null)
    const [ session, loading ] = useSession()

    console.log({ tabs, pathname: router.pathname, split: router.pathname.split('/') })

    function handleChange(_, newValue) {
        setValue(newValue)

        const pathRoot = router.pathname.split('/')[1]

        if (newValue !== tabs[pathRoot] ?? 0) {
            router.push('/' + tabs[newValue] ?? '')
        }
    }

    function handleClick(e) {
        setAnchorEl(e.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    return (
        <>
            <MuiAppBar color="default" className={classes.appBar}>
                <Toolbar>
                    <CarbonLogo className={classes.logo} />
                    <Typography variant="h6">
                        Carbon
                    </Typography>

                    <div className={classes.grow} />

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        classes={{
                            flexContainer: classes.tabsContainer,
                        }}
                        className={classes.tabs}
                    >
                        <Tab label="Bot" />
                        <Tab label="Docs" />
                        <Tab label="Developer" />
                    </Tabs>

                    {loading ? (
                        <Skeleton variant="circle">
                            <Avatar className={classes.avatar} />
                        </Skeleton>
                    ) : session?.user ? (
                        <IconButton size="small" onClick={handleClick}>
                            <Avatar className={classes.avatar} src={session.user.image} />
                        </IconButton>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => signIn('discord')}
                            disableElevation
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </MuiAppBar>
            <Toolbar />
            {session?.user && (
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem button={false}>
                        <ListItemText
                            primary={session.user.name}
                            secondary={`#${session.user.discriminator}`}
                        />
                        <Avatar src={session.user.image} className={classes.menuAvatar} />
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}>
                        Logout
                    </MenuItem>
                </Menu>
            )}
        </>
    )
}
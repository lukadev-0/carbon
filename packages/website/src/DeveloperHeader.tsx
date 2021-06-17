import React from 'react'
import Header from './Header'
import { Drawer, makeStyles, Toolbar, List } from '@material-ui/core'
import DrawerButton from './DeveloperDrawerElement'
import FindDoc from './FindDoc'
import { allowedTypes } from './DocsTypes'
const width = 240
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width,
    },
    drawerPaper: {
        width,
    },
    appContent: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
    },
}))

// eslint-disable-next-line @typescript-eslint/naming-convention
const DeveloperHeader: React.FC = ({ children }) => {
    const classes = useStyles()
    const docs = FindDoc()
    if (!docs || docs.length <= 0) return <div>Couldn't fetch docs.</div>
    return (
        <div className={classes.root}>
            <Header val={2} />
            <Drawer
                variant="permanent"
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
            >
                <Toolbar variant="dense" />
                <List>
                    {
                        docs
                            .filter((v) => allowedTypes.includes(v.kindString.toLowerCase()))
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((rawData, i) =>
                                <DrawerButton name={rawData.name} key={i} />)
                    }
                </List>
            </Drawer>
            <main className={classes.appContent}>
                <Toolbar variant="dense" />
                {children}
            </main>
        </div>
    )
}

export default DeveloperHeader
import React from 'react'
import { List, ListItem, ListItemText, Collapse, makeStyles } from '@material-ui/core'
import { ExpandLessRounded, ExpandMoreRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}))

interface DeveloperCollapseProps {
    text: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const DeveloperCollapse: React.FC<DeveloperCollapseProps> = ({ text, children }) => {
    const classes = useStyles()
    const [ open, setOpen ] = React.useState(true)
    return (
        <div>
            <List>
                <ListItem button onClick={() => { setOpen(!open) }}>
                    <ListItemText primary={text} />
                    {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem className={classes.nested}>
                            {children}
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default DeveloperCollapse
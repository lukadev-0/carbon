import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
export type Tags = 'READ-ONLY' | 'PRIVATE' | 'DEPRECATED'

const useStyles = makeStyles({
    paper: {
        width: 'max-content',
        padding: '5px 10px',
        display: 'inline',
        marginRight: '5px',
    },
})

interface DeveloperBadgeProps {
    tag: Tags
}

export default function DeveloperBadge({ tag }: DeveloperBadgeProps): JSX.Element {
    const classes = useStyles()
    return (
        <Paper className={classes.paper}>
            {tag}
        </Paper>
    )
}
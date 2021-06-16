import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import DeveloperHeader from '../../../src/DeveloperHeader'
const useStyles = makeStyles({
    heading: {
        margin: '20px',
    },
})

export default function SecondTab(): JSX.Element {
    const classes = useStyles()
    return (
        <DeveloperHeader>
            <Typography className={classes.heading} variant="h2">Welcome to the API docs</Typography>
        </DeveloperHeader>
    )
}
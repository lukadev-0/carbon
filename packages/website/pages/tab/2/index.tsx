import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import DeveloperHeader from '../../../src/DeveloperHeader'
import Head from '../../../src/Head'
const useStyles = makeStyles({
    heading: {
        margin: '20px',
    },
})

export default function SecondTab(): JSX.Element {
    const classes = useStyles()
    return (
        <div>
            <Head title='Carbon API docs' name='Carbon API docs' description="Main page of Carbon API docs" />
            <DeveloperHeader>
                <Typography className={classes.heading} variant="h2">Welcome to the API docs</Typography>
                <Typography>Every class & enum are documented here.</Typography>
            </DeveloperHeader>
        </div>
    )
}
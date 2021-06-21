import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'

import AppBar from './AppBar'
const useStyles = makeStyles({
    grid: {
        minHeight: '100vh',
    },
})

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
    const classes = useStyles()
    return (
        <Grid container direction="column" className={classes.grid}>
            <AppBar />
            {children}
        </Grid>
    )
}

Layout.layout = (children) => (
    <Layout>
        {children}
    </Layout>
)
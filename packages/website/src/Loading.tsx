import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'

export default function Loading(): JSX.Element {
    return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    )
}
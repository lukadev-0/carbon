import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'

export default function DeveloperDrawerElement({ name }: { name: string }): JSX.Element {
    if (!name) return <div>Invalid name</div>
    return (
        <ListItem button component="a" href={`/tab/2/${name}`}>
            <ListItemText primary={name} / >
        </ListItem>
    )
}
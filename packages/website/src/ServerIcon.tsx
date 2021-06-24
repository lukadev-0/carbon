import { makeStyles, Avatar } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    displayAvatar: {
        background: '#36393f',
        color: '#dcddde',
        fontSize: theme.spacing(2),
    },
}))

export default function ServerIcon({ v }: { v: { icon?: string, id: string, name: string } }): JSX.Element {
    const classes = useStyles()
    return <Avatar className={v.icon ? '' : classes.displayAvatar} src={v.icon && `https://cdn.discordapp.com/icons/${v.id}/${v.icon}.${v.icon.startsWith('a_') ? 'gif' : 'png'}`} >{v.name.split(/ +/).map((v) => v.charAt(0))}</Avatar>
}
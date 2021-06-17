import React from 'react'
import { ListItemText, Typography } from '@material-ui/core'
import DeveloperBadge, { Tags } from './DeveloperBadge'
import CodeBlock from './CodeBlock'


interface DeveloperDocElementProps {
    isProperty?: boolean
    name: string
    description: string
    params?: string
    tags?: Tags[]
}

export default function DeveloperDocElement({ isProperty, name: rawName, description, params, tags }: DeveloperDocElementProps): JSX.Element {
    return (
        <div>
            <ListItemText disableTypography primary={
                <Typography component="span">{`.${rawName}${isProperty ? '' : '('}`}{params && <CodeBlock style={{ display: 'inline', background: 'inherit' }}>{params ?? ''}</CodeBlock>}{isProperty ? '' : ')'}{' '}
                    {tags?.map((v, i) =>
                        <DeveloperBadge tag={v} key={i} />,
                    )}
                </Typography>
            } />
            <ListItemText secondary={description} />
        </div>
    )
}
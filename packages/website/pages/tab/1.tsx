import React from 'react'
import Head from '../../src/Head'
import Header from '../../src/Header'
import { Link, makeStyles, Typography } from '@material-ui/core'
import CodeBlock from '../../src/CodeBlock'
const useStyles = makeStyles({
    heading: {
        margin: '10px',
    },
    api: {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        marginLeft: '5px',
        marginBottom: '5px',
    },
})

export default function FirstTab(): JSX.Element {
    const classes = useStyles()
    const codeString = `import { createClient } from '@carbon-js/core'
import { defaultCommands as commands } from '@carbon-js/interactions'
const client = createClient()
client
    .registerCommands(commands)
    .login('token')`
    return (
        <div>
            <Head title="Carbon Docs" name="Carbon Docs" description="Docs about creating a simple Carbon bot" />
            <Header val={1} style={{ position: 'initial' }} />
            <div>
                <Typography variant="h4">NOTE: THESE APIS AREN'T RELEASED/FINISHED. THEY ARE SUBJECT TO CHANGE AND, THIS GUIDE IS STILL A WORK IN PROGRESS</Typography>
                <Typography variant="h5" className={classes.heading}>
                    If you are looking to make your own Carbon bot here is the place where we explain the process!
                </Typography>
                <Typography>
                    <ol>
                        <li>Make sure you installed the core & interactions package. You can install them by doing <CodeBlock lang='shell'>npm i @carbon-js/core @carbon-js/interactions</CodeBlock></li>
                        <li>Now we will actually make a bot. <CodeBlock>{codeString}</CodeBlock></li>
                        <li>And now if you start up your Carbon it should function properly. There are also some recommended packages! These are:<br />
                            <Link href="https://npmjs.com/package/dotenv">dotenv</Link> - Load your .env files to store your secrets
                            <br />
                            <Link href="https://npmjs.com/package/chalk">chalk</Link> - Colour your console
                        </li>
                    </ol>
                </Typography>
                <Typography className={classes.api}>
                    <strong>If you're looking for the API refrence look in <Link href="/tab/2">here</Link> instead</strong>
                </Typography>
            </div>
        </div>
    )
}
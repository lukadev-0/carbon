import express from 'express'
import variables from '../variables'
const { SERVER_URL } = variables

const app = express()

app.all('*', (_, res) => {
    res.redirect(301, SERVER_URL)
})

app.listen(3000)

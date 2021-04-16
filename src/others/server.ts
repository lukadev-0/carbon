import express from 'express'

const app = express()

app.all('*', (_, res) => {
    res.redirect(301, 'https://www.daimond113.com/#/')
})

app.listen(3000)

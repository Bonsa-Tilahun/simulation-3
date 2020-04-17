const express = require('express')
const massive = require('massive')
const session = require('express-session')

require('dotenv').config()

const ctrl = require('./controllers/controller')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log("DB connected")
    app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}`))
})

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)


app.get('/api/posts/:userId', ctrl.getAllpost)
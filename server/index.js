require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    auth_ctrl = require('./controllers/authController')
const app = express()
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))

massive(CONNECTION_STRING).then((database) => {
  app.set('db', database)
  console.log(database.listTables())
  console.log('database set!')
  app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT} ✌️`))
})

app.post('/auth/register', auth_ctrl.register)




// // practice short cut by putting 
// // comma after so you don't need to type out const so much

// require(`dotenv`).config()
// const express = require('express')
// const session = require('express-session')
// const massive = require('massive')
// const auth_ctrl = require('./controllers/authController')
// const app = express() //don't use short cut for this line
// const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env //don't use short cut for this line

// app.use(express.json())
// app.use(session({
//     secret: SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60
//     }
// }))

// massive(CONNECTION_STRING).then((database) => {
//     app.set('db', database)
//     console.log('database set!')
//     app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
// })

// app.post('/auth/register', auth_ctrl.register) //auth is authorization route, as opposed to api which is for getting data
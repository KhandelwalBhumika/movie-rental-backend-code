require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const morgan = require('morgan')

const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')
// app.use('/images', express.static('images'));

mongoose.connect(process.env.MONDODB_URL, {
    useNewUrlParser: true
})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected..')
})

app.use(morgan('dev'))

app.use(express.json())

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started! on ${process.env.PORT}`)
})
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require("cookie-session");
// const passport = require("passport");
// const authRoute = require("./routes/auth");
const path = require('path');
// const passport = require("..//");

const app = express()

const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')

// const authRouter = require('./routes/auth');
// app.use('/images', express.static('images'));


mongoose.connect(process.env.MONDODB_URL, {
    useNewUrlParser: true
})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected..')
})

app.use(
    cookieSession({
        name: "session",
        keys: process.env.KEY,
        maxAge: 24 * 60 * 60 * 100 
    })
  );
  
//   app.use(passport.initialize());
//   app.use(passport.session());



app.use(cors())
/*
{
    origin: `http://localhost:${process.env.PORT}`,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}
*/

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use("/auth", authRoute);
// app.use('/api/auth/', authRouter);

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started! on ${process.env.PORT}`)
})
console.log('hello')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const axios = require('axios')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

const promise = mongoose.connect(
  'mongodb://localhost/test',
  {
    useMongoClient: true
  }
)
mongoose.Promise = global.Promise
const User = require('../models/user')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ 'username': username }, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  }
))

app.post('/register', (req, res) => {
  // res.send({
  //   message: `Hello ${req.body.username}! user was registered! Have fun!`
  // })
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  user.save(function(err) {
    // if (err && err.code === 11000) {
    //   //console.log('user save error ' + err.errmsg)
    //   res.redirect('http://162.221.207.113:3000')
    //   return
    // } else 
    if (err) {
      console.log('user could not be saved')
      console.log(err)
    }
    res.send(user)
  })
})

app.get('/testing', (req, res) => {
  res.send('test worked!')
})

app.get('/users', (req, res) => {
  User.find(function (err, users) {
    if (err) {
      console.log('get error ' + err)
      //return res.sendStatus(500)
    }
    res.send({
      userList: users
    })
  })
})

app.get('/user/:email', (req, res) => {
  console.log(`Finding number of users with email: "${req.params.email}"`)
  //console.log(`req.params = "${req.params}"`)
  User.count({'email': req.params.email}, function(err, user) {
    if (err) {
      res.send({error: err})
    }
    res.send({count: user})
  })
})

app.get('/user/:username', (req, res) => {
  console.log(`Finding number of users with username: "${req.params.username}"`)
  //console.log(`req.params = "${req.params}"`)
  User.count({'username': req.params.username}, function(err, user) {
    if (err) {
      res.send({error: err})
    }
    res.send({count: user})
  })
})

app.delete('/user/:email', (req, res) => {
  console.log(`Attempting to delete user with email: "${req.params.email}"`)
  User.remove({'email': req.params.email}, function(err, user) {
    if (err) {
      res.send({error: err})
    }
    res.send({removed: user})
  })
})

app.patch('/user/:email', (req, res) => {
  console.log(`Attempting to patch user "${req.params.email}"`)
  console.log(req.body)
  User.update({'email': req.params.email}, {'username': req.body.newUsername}, function(err, user) {
    if (err) {
      res.send({error: err})
    }
    res.send({updated: user})
  })
})

app.post(
  '/login',
  passport.authenticate(
    'local',
    {
      successRedirect: 'http://google.com',
      failureRedirect: 'http://yahoo.com'
    }
  )
)

app.listen(3001)

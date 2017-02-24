var express = require('express')
var router = express.Router()
const modelUser = require('../models/model.user.js')
var passwordHash = require('password-hash')
var passport = require('passport')
const jwt = require('jsonwebtoken')

/* login */
router.post('/login', function (req, res, next) {
  passport.authenticate('test-login', function (err, user, info) {
    if (err) {return res.json({err: err})}
    if (!user) {return res.json({usernotfound: 'not found'}) }
    if (user) {
      var token = jwt.sign({ username: req.body.username }, 'lol')
      res.json({ token: token,
      username: req.body.username })
    }
  })(req, res)
  // user.username neh dapet dari app.js neh yang serializeUser
  // console.log(req.body.username)

})

/* localhost:3000/users/register | register new user */
router.post('/register', function (req, res, next) {
  var newUser = modelUser({
    username: req.body.registerusername,
    password: passwordHash.generate(req.body.registerpassword)
  })

  console.log(newUser)
  newUser.save(function (err, data) {
    if (err) console.log(err)

    res.json(data)
  })
})

module.exports = router

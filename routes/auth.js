const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const debug = require('debug')('app:auth');

const Users = require('../models/User');

const router = express.Router();

module.exports = () => {
  router.route('/').get((req, res) => {
    res.json({ state: req.isAuthenticated() });
  });

  // Login
  router
    .route('/login')
    .get((req, res) => {
      // res.send(req.isAuthenticated());
      res.render('auth/login');
    })
    .post(passport.authenticate('local'), (req, res) => {
      // res.json(req.body);
      res.redirect('/');
    });

  // Sign up
  // router.route('/signup').post(async (req, res) => {
  //   const { username, password } = req.body;
  //   try {
  //     let user = await Users.findOne({ username });
  //     if (user) {
  //       return res.status(400).json({ error: 'user already exists' });
  //     }
  //     const saltRounds = Number(process.env.SALT_ROUNDS);
  //     const hash = bcrypt.hashSync(password, saltRounds);
  //     user = new Users({ username, hash });
  //     await user.save();
  //     req.logIn(username, (err) => {
  //       if (err) {
  //         debug(err);
  //         return res.status(500).send('login failed');
  //       }
  //       res.json({ user, state: req.isAuthenticated() });
  //     });
  //   } catch (error) {
  //     debug(error);
  //     res.status(404).json(error);
  //   }
  // });

  router.route('/logout').get((req, res) => {
    req.logOut();
    res.redirect('/auth/login');
  });

  return router;
};

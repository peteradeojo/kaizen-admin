const { Strategy: localStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:passport-config');
const Users = require('../models/User');

module.exports = (/**@type PassportStatic */ passport) => {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await Users.findOne({ username });
        if (user) {
          const saltRounds = Number(process.env.SALT_ROUNDS);
          const result = bcrypt.compareSync(password, user.hash);
          if (result) {
            return done(null, user);
          } else {
            return done('Invalid password', false);
          }
        }
        debug(username);
        return done('User not found', false);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id);
      if (user) {
        return done(null, user);
      } else {
        return done('user not found', false);
      }
    } catch (error) {
      return done(error, false);
    }
  });
};

import { PassportStatic } from 'passport';
import { Strategy as localStrategy } from 'passport-local';

module.exports = (passport: PassportStatic) => {
  passport.use(
    new localStrategy((username, password, done) => {
      if (username == 'kenny' && password == 'bojo') {
        return done(null, username);
      } else {
        return done('invalid user', false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });
};

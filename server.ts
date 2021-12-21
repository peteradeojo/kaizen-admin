import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const debug = require('debug')('server');

const app = express();

app.disable('x-powered-by');

require('./config/setup')(app);

app.get('/auth', (req, res) => {
  res.render('auth');
});
app.post(
  '/auth',
  passport.authenticate('local', { failureRedirect: '/auth' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  } else {
    return res.redirect('/auth');
  }
});

// Routes
app.use('/', require('./routes/index')());
app.use('/products', require('./routes/products')());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(500).send(err.stack);
  }
  return next();
});

app.use((req, res, next) => {
  res.status(404).send('404 - Not found.');
});

const PORT = process.env.PORT || 4041;
app.listen(PORT, () => debug('Server running on port ' + PORT));

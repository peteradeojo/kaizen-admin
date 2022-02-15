const app = require('./app');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const path = require('path');
const debug = require('debug')('app:index');

// Arch config
require('./config/passport')(passport);
app.use(passport.session());
app.use(passport.initialize());

(async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      connectTimeoutMS: 30000,
    });
    debug(`MongoDB Connected on ${connection.port}`);
  } catch (error) {
    debug(error);
    process.exit();
  }
})();

// Routing
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));

app.use((req, res, next) => {
  if (req.isAuthenticated()) res.locals.user = req.user;
  return next();
});

app.use('/auth', require('./routes/auth.js')());
app.use('/', require('./routes/index')());
app.use('/products', require('./routes/products')());
app.use('/api', require('./routes/api')());

const port = process.env.PORT || 4041;

app.listen(port, () => debug(`Server listening on port ${port}`));

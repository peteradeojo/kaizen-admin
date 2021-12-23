import express, { Express } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import fileUpload from 'express-fileupload';

const debug = require('debug')('server:setup');

module.exports = (app: Express) => {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    app.use(require('morgan')('dev'));
  }

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(express.static(path.resolve(__dirname, '../public')));
  app.set('view engine', 'pug');
  app.set('views', path.resolve(__dirname, '../views'));

  (async () => {
    try {
      const { connection } = await mongoose.connect(process.env.MONGO_URL!);
      debug(`MongoDB running on ${connection.host}:${connection.port}`);
    } catch (err) {
      console.error(err);
    }
  })();

  app.use(
    session({
      secret: process.env.SECRET!,
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URL! }),
    })
  );
  app.use(cookieParser());
  app.use(
    fileUpload({
      useTempFiles: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  require('../config/passport')(passport);
};

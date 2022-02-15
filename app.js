const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const debug = require('debug')('app');

const app = express();

if (app.get('env') !== 'production') {
  require('dotenv').config();
  app.use(require('morgan')('dev'));
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

module.exports = app;

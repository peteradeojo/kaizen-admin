import express, { Request, Response, NextFunction } from 'express';

const debug = require('debug')('server');

const app = express();

require('./config/setup')(app);

// Routes
app.use('/', require('./routes/index')());

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

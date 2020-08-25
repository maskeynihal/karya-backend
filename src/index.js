import './env';
import './config/db';

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import routes from './routes';
import json from './middlewares/json';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

// Parse incoming data
app.use(
  express.urlencoded({
    extended: true
  })
);

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '8000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

// app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);

// API Routes
app.use('/api', routes);

// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);
// app.use((err, req, res, next) => {
//   res.status(err.status || 400).json({
//     error: true,
//     message: err.msg || err.message || err.detail || err,
//     status: err.status || 400,
//     errors: err
//   });
// });

app.listen(app.get('port'), app.get('host'), () => {
  console.log(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err);
  process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err);
  process.exit(1);
});

export default app;

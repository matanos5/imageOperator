import express from 'express';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import compression from 'compression';
import { Request, Response, NextFunction } from 'express';
import MainRouter from './routes';

const isProduction = process.env.NODE_ENV || 'production';
const app = express();


app.use(bodyParser.raw({ limit: '10mb', type: ['image/*'] }));
app.use(bodyParser.text({ limit: '10mb' }));
app.use(compression());

if (!isProduction) {
  app.use(errorhandler());
}


app.use(MainRouter);
// Redirect 404's to err handler
app.use((_, __, next) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Dev err handler (With stack traces)
if (!isProduction) {
  app.use((err: any, __: Request, res: Response, _: NextFunction) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      'errors': {
        message: err.message,
        error: err,
      }
    });
  });
} else {
  // Production user err handler (No stack traces)
  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      'errors': {
        message: err.message,
        error: {},
      }
    });
  });
}
export default app;

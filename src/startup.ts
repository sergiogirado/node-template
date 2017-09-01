import * as logger from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';

import { appSettings } from './appsettings';
import { addInversify } from './app_start/inversify.config';
import { api } from './api';
import { setPreferredLanguage } from './domain/i18n/strings';

export class Startup {
  constructor(config?: (app: Express) => void) {
    let app: Express = express();
    if (config) { config(app); }

    this.configureServices();
    this.configure(app);
  }

  configureServices() {
    addInversify();
  }

  configure(app: Express) {
    //app.use(favicon(path.join(__dirname,'wwwroot','favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'wwwroot')));

    //Locale settings
    app.use((req, res, next) => {
      setPreferredLanguage(req.header('accept-language') || '');
      next();
    });

    //Custom Routes
    app.use(api());

    //catch 404 and forward to error handler
    app.use((req, res, next) => {
      let NOT_FOUND = 'Not Found'
      let err: any = new Error(NOT_FOUND);
      err.name = NOT_FOUND;
      err.status = 404;
      next(err);
    });

    //development error handler
    //will include stack as 'details' attribute
    if (!appSettings.production) {
      app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        let detailedErr: any = new Error(err.message);
        let stack: string = err.stack;
        detailedErr.details = stack.split(' at ').map(str => str.trim());
        detailedErr.name = err.name;
        delete detailedErr.stack;
        next(detailedErr);
      });
    }

    //general error handler
    app.use((err: Error | any, req: Request, res: Response, next: NextFunction) => {
      let status = err.status || 500;
      delete err.status;
      res.status(status).json(err);
    });
  }
}
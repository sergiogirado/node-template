import { IAppSettings } from './appsettings.model';

let port: string = process.env.PORT || '9000';

let result: IAppSettings = {
  production: false,
  port: +port
};

export = result;

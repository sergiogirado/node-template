import { IAppSettings } from './appsettings.model';

export const appSettings: IAppSettings = require(`./appsettings.${process.env.NODE_ENV || 'local'}`);

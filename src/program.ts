import { createServer, Server } from 'http';
import { IDebugger } from 'debug';
import * as debugModule from 'debug';

import { appSettings } from './appsettings';

import { Startup } from './startup';

class Program {
  static main() {
    let starturp = new Startup(app => {
      let server: Server;
      let debug: IDebugger = debugModule('express:server');
      app.set('port', appSettings.port);
      server = createServer(app);
      server
        .on('error', (error: any) => {
          if (error.syscall !== 'listen') {
            throw error;
          }

          var bind = (typeof appSettings.port === 'string' ? 'Pipe' : 'Port') + ' ' + appSettings.port;

          //handle specific listen errors with friendly messages
          switch (error.code) {
            case 'EACCES':
              console.error(bind + 'requires elevated privileges');
              process.exit(1);
              break;
            case 'EADDRINUSE':
              console.error(bind + 'is already in use');
              process.exit(1);
              break;
            default:
              throw error;
          }
        })
        .on('listening', () => {
          var addr = server.address();
          var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
          debug('Listening on ' + bind);
        })
        .listen(appSettings.port);
    });
  }
}

Program.main();

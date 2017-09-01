import { Router, Request, Response, NextFunction } from 'express';

const routeMetadataKey = Symbol('route');
const resourcePrefixMetadataKey = Symbol('resource');

export const apiControllers: any[] = [];

export enum Http {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export function Resource(prefix: string) {
  return function (target: any) {
    apiControllers.push(target);
    Reflect.metadata(resourcePrefixMetadataKey, prefix)(target);
  };
}

export function Route(verb: Http, route: string) {
  return Reflect.metadata(routeMetadataKey, { verb, route });
}

export function registerApi(apiRouter: Router, apiPrefix: string, controllerInstance: any) {
  let resourceRouter: any = Router();
  let resourcePrefix = Reflect.getMetadata(resourcePrefixMetadataKey, controllerInstance.constructor);

  for (var potentialEndpointMethodName in controllerInstance) {
    var potentialEndpointMethod: (queryParams: any, body: any) => Promise<any> = controllerInstance[potentialEndpointMethodName];

    let metadataRef: { route: string, verb: string } = Reflect.getMetadata(routeMetadataKey, controllerInstance, potentialEndpointMethodName);
    if (metadataRef) {
      resourceRouter[metadataRef.verb](metadataRef.route, (req: Request, res: Response, next: NextFunction) => {
        let apiMethod = potentialEndpointMethod.bind(controllerInstance);
        let routeParams = Object.assign({}, req.query, req.params);
        let body = req.query;

        apiMethod(routeParams, body)
          .then((result: any) => {
            if (result) {
              res.status(200).json(result);
            } else {
              res.status(200);
            }
          })
          .catch((err: any) => {
            next(err);
          });
      });
    }
  }
  
  apiRouter.use(apiPrefix + resourcePrefix, resourceRouter);
}

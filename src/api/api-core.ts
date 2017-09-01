import { Router, Request, Response, NextFunction } from 'express';

const methodMetadataKey = Symbol('method');
const routeMetadataKey = Symbol('route');

export interface IDependencyResolver {
  getService<T, Ti>(identifier: Ti): T;
}

export interface IApiConfig {
  dependencyResolver: IDependencyResolver;
  controllers: ObjectConstructor[];
}

export const ApiConfig: IApiConfig = {
  dependencyResolver: {
    getService(identifier: any): any {
      return null;
    }
  },
  controllers: []
};
export function Route(route: string) {
  return function (target: any) {
    ApiConfig.controllers.push(target);
    let decorator = Reflect.metadata(routeMetadataKey, route);
    decorator(target);
  };
}

export const Http = {
  Get: (route: string) => HttpGet(route),
  Post: (route: string) => HttpPost(route),
  Put: (route: string) => HttpPut(route),
  Delete: (route: string) => HttpDelete(route),
};

export function HttpGet(route: string) {
  return HttpMethod('get', route);
}
export function HttpPost(route: string) {
  return HttpMethod('post', route);
}
export function HttpPut(route: string) {
  return HttpMethod('put', route);
}
export function HttpDelete(route: string) {
  return HttpMethod('delete', route);
}
interface IMethodMetadataValue {
  verb: string;
  name: string;
}
export function HttpMethod(verb: 'get' | 'post' | 'put' | 'delete', name: string) {
  return Reflect.metadata(methodMetadataKey, <IMethodMetadataValue>{ verb, name })
}
export function registerApi(apiRouter: Router, apiPrefix: string, controllerInstance: any) {
  let resourceRouter: any = Router();
  let resourcePrefix = Reflect.getMetadata(routeMetadataKey, controllerInstance.constructor);

  for (let member in controllerInstance) {

    let metadataRef: IMethodMetadataValue = Reflect.getMetadata(methodMetadataKey, controllerInstance, member);
    if (metadataRef) {
      let potentialEndpointMethod: (queryParams: any, body: any) => Promise<any> = controllerInstance[member];
      resourceRouter[metadataRef.verb](metadataRef.name, (req: Request, res: Response, next: NextFunction) => {
        let apiMethod = potentialEndpointMethod.bind(controllerInstance);
        let routeParams = Object.assign({}, req.query, req.params);
        let body = req.body;

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

  apiRouter.use(apiPrefix + (resourcePrefix || ''), resourceRouter);
}

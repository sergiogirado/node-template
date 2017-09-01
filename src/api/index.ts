import 'reflect-metadata';
import { Router } from 'express';
import { registerApi, ApiConfig } from './api-core';

export function api() {
  let apiRouter = Router();

  let controllers = ApiConfig
    .controllers
    .map(apiClass => 
      ApiConfig
        .dependencyResolver
        .getService(Symbol.for(apiClass.name)));

  controllers.forEach(c => registerApi(apiRouter, '/api/', c));
  return apiRouter;
}

import 'reflect-metadata';
import { Router } from 'express';
import { registerApi } from './api-core';

export const controllers: any[] = [];

export function api() {
  let apiRouter = Router();
  controllers.forEach(c => registerApi(apiRouter, '/api/', c));
  return apiRouter;
}

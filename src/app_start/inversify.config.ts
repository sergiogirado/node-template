import 'reflect-metadata';
import { Container, decorate, injectable, inject } from 'inversify';

import { DemoService } from './../domain/demo/demo.service';
import { DemoMockRepository } from './../infrastructure/mocks/DemoMockRepository';
import { DemoController } from './../api/demo.controller';
import { apiControllers } from './../api/api-core';
import { controllers } from './../api';

export const TYPES = {
  IDemoRepositry: Symbol('IDemoRepositry'),
  DemoRepositry: Symbol('DemoRepositry'),
  DemoService: Symbol('DemoService')
};

let container: Container = new Container();

export function addInversify() {
  decorate(injectable(), DemoMockRepository);

  decorate(injectable(), DemoService);
  decorate(inject(TYPES.IDemoRepositry), DemoService, 0);

  decorate(injectable(), DemoController);
  decorate(inject(TYPES.DemoService), DemoController, 0);

  container.bind(TYPES.IDemoRepositry).to(DemoMockRepository);
  container.bind(TYPES.DemoService).to(DemoService);

  apiControllers.forEach(target => {
    container.bind(Symbol.for(target.constructor.name)).to(target);
    controllers.push(dependencies.get(Symbol.for(target.constructor.name)));
  });
}

export const dependencies = container;
import 'reflect-metadata';
import { Container, decorate, injectable, inject } from 'inversify';

import { DemoService } from './../domain/demo/demo.service';
import { DemoMockRepository } from './../infrastructure/mocks/DemoMockRepository';
import { DemoController } from './../api/demo.controller';
import { IDependencyResolver, ApiConfig } from './../api/api-core';

export const TYPES = {
  IDemoRepositry: Symbol('IDemoRepositry'),
  DemoRepositry: Symbol('DemoRepositry'),
  DemoService: Symbol('DemoService')
};

export function addInversify() {
  decorate(injectable(), DemoMockRepository);

  decorate(injectable(), DemoService);
  decorate(inject(TYPES.IDemoRepositry), DemoService, 0);

  decorate(injectable(), DemoController);
  decorate(inject(TYPES.DemoService), DemoController, 0);

  let container: Container = new Container();
  container.bind(TYPES.IDemoRepositry).to(DemoMockRepository);
  container.bind(TYPES.DemoService).to(DemoService);

  ApiConfig.controllers.forEach(target => {
    container.bind(Symbol.for(target.name)).to(target);
  });

  ApiConfig.dependencyResolver = new InversifyDependencyResolver(container);
}

class InversifyDependencyResolver implements IDependencyResolver {
  constructor(
    private container: Container
  ) { }
  getService<T, Ti>(identifier: Ti): T {
    return this.container.get<T>(<any>identifier)
  }
}

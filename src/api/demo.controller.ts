import { Resource, Route, Http } from './api-core';

import { DemoService } from './../domain/demo/demo.service';

@Resource('demo')
export class DemoController {
  constructor(
    private bcService: DemoService
  ) { }

  @Route(Http.GET, '/')
  getAll() {
    return this.bcService.getAll();
  }

  @Route(Http.POST, '/')
  post(routeParams: any, body: any) {
    return this.bcService.create(body);
  }
}

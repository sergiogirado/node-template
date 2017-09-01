import { Route, HttpGet, HttpPost } from './api-core';
import { DemoService } from './../domain/demo/demo.service';

@Route('demo')
export class DemoController {
  constructor(
    private demoService: DemoService
  ) { }

  @HttpGet('/')
  getAll() {
    return this.demoService.getAll();
  }

  @HttpPost('/')
  post(routeParams: any, body: any) {
    return this.demoService.create(body);
  }
}

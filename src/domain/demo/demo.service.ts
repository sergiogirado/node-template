import { IDemoRepositry } from './demo-repository';
import { IDemoEntity } from './demo.model';
import { getString } from './../i18n/strings';

export class DemoService {

  constructor(
    private repo: IDemoRepositry
  ) { }

  getAll() {
    return this.repo.get();
  }
  create(data: IDemoEntity) {
    let errors = {};
    if (data.id) {
      return Promise.reject(getString(s => s.generic.INVALID_PARAMETERS));
    }
    return this.repo.create(data);
  }
}

import { IQuerySettings, IQueryResult } from './../../domain/core/core.repository';
import { IDemoRepositry } from './../../domain/demo/demo-repository';
import { IDemoEntity } from './../../domain/demo/demo.model';

export class DemoMockRepository implements IDemoRepositry {
  create(data: IDemoEntity): Promise<IDemoEntity> {
    throw new Error('Method not implemented.');
  }
  update(data: IDemoEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  get(): Promise<IDemoEntity[]> {
    let result = [
      {
        id: '1',
        name: 'BC 1'
      },
      {
        id: '2',
        name: 'BC 2'
      },
      {
        id: '3',
        name: 'BC 3'
      }
    ];
    return Promise.resolve<IDemoEntity[]>(result);
  }

  getByQuery(settings: IQuerySettings, where?: IDemoEntity | undefined): Promise<IQueryResult<IDemoEntity>> {
    throw new Error('Method not implemented.');
  }

  getById(id: string): Promise<IDemoEntity> {
    throw new Error('Method not implemented.');
  }

}
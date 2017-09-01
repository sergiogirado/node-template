import { IDemoEntity } from './demo.model';
import { IReadRepository, IWriteRepository } from './../core/core.repository';

export interface IDemoRepositry extends IReadRepository<IDemoEntity>, IWriteRepository<IDemoEntity> {

}